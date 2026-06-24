from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.database.database import engine, Base
from app import models
from app.routes.authRouter import router as auth_router
from app.routes.postRouter import router as post_router
from app.routes.commentRouter import router as comment_router


# Maps PostgreSQL-stored uppercase member names → display values
_CATEGORY_MAPPING = {
    "PERSONAL":          "Personal",
    "TECHNOLOGY":        "Technology",
    "PHILOSOPHY":        "Philosophy",
    "CONCEPTS":          "Concepts",
    "FAKE_SIMULATIONS":  "Fake Simulations",
    "RESEARCH":          "Research",
    "LIFE_EXPERIMENTS":  "Life Experiments",
    "CASE_STUDIES":      "Case Studies",
    "CONFESSION":        "Confession",
}


def _migrate_category_column():
    """
    One-time idempotent migration:
      1. Add CONFESSION to the PostgreSQL enum (if still enum type).
      2. Rewrite stored uppercase names to display values.
      3. Convert the column from ENUM → VARCHAR so future categories
         never need another DB migration.
    Safe to run on every startup — skips if already migrated.
    """
    try:
        with engine.connect() as conn:
            row = conn.execute(text(
                "SELECT data_type FROM information_schema.columns "
                "WHERE table_name='posts' AND column_name='category'"
            )).fetchone()

        if not row or row[0] != "USER-DEFINED":
            return  # Already migrated to VARCHAR — nothing to do

        # ALTER TYPE ADD VALUE cannot run inside a transaction in PostgreSQL
        with engine.execution_options(isolation_level="AUTOCOMMIT").connect() as conn:
            conn.execute(text(
                "ALTER TYPE categoryenum ADD VALUE IF NOT EXISTS 'CONFESSION'"
            ))

        # Rewrite values + change column type in one transaction
        with engine.begin() as conn:
            for name, val in _CATEGORY_MAPPING.items():
                conn.execute(
                    text("UPDATE posts SET category = :val WHERE category = :name"),
                    {"val": val, "name": name},
                )
            conn.execute(text(
                "ALTER TABLE posts "
                "ALTER COLUMN category TYPE VARCHAR(50) USING category::varchar"
            ))

        print("[startup] category column migrated: ENUM → VARCHAR ✓")

    except Exception as exc:
        print(f"[startup] category migration skipped/failed (non-fatal): {exc}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    _migrate_category_column()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://myblog-69c.pages.dev",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    try:
        with engine.connect():
            pass
        return {"message": "database connected successfully"}
    except Exception:
        return {"error": "server error"}


app.include_router(auth_router)
app.include_router(post_router)
app.include_router(comment_router)
