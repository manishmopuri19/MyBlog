from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.database.database import engine, Base
from app import models
from app.routes.authRouter import router as auth_router
from app.routes.postRouter import router as post_router
from app.routes.commentRouter import router as comment_router


_CATEGORY_MAPPING = {
    "PERSONAL":         "Personal",
    "TECHNOLOGY":       "Technology",
    "PHILOSOPHY":       "Philosophy",
    "CONCEPTS":         "Concepts",
    "FAKE_SIMULATIONS": "Fake Simulations",
    "RESEARCH":         "Research",
    "LIFE_EXPERIMENTS": "Life Experiments",
    "CASE_STUDIES":     "Case Studies",
    "CONFESSION":       "Confession",
}


def _migrate_category_column():
    """
    Converts the `category` column from PostgreSQL ENUM → VARCHAR(50).
    Runs once on startup; skips automatically if already migrated.
    """
    try:
        # ── 1. Check whether migration is still needed ──────────────────
        with engine.connect() as conn:
            row = conn.execute(text(
                "SELECT data_type FROM information_schema.columns "
                "WHERE table_name='posts' AND column_name='category'"
            )).fetchone()

        if not row or row[0] != "USER-DEFINED":
            print("[startup] category column is already VARCHAR — skipping migration")
            return

        print("[startup] migrating category column ENUM → VARCHAR …")

        # ── 2. Add CONFESSION to the existing enum ───────────────────────
        # ALTER TYPE ADD VALUE must run outside a transaction (autocommit).
        # We use the raw psycopg2 connection to guarantee this.
        raw = engine.raw_connection()
        try:
            raw.autocommit = True
            cur = raw.cursor()
            cur.execute("ALTER TYPE categoryenum ADD VALUE IF NOT EXISTS 'CONFESSION'")
            cur.close()
        finally:
            raw.close()

        # ── 3. Rewrite stored uppercase names → display values ───────────
        # ── 4. Convert column type from ENUM → VARCHAR ───────────────────
        with engine.begin() as conn:
            for old, new in _CATEGORY_MAPPING.items():
                conn.execute(
                    text("UPDATE posts SET category = :new WHERE category = :old"),
                    {"new": new, "old": old},
                )
            conn.execute(text(
                "ALTER TABLE posts "
                "ALTER COLUMN category TYPE VARCHAR(50) USING category::varchar"
            ))

        print("[startup] category column migrated: ENUM → VARCHAR ✓")

    except Exception as exc:
        print(f"[startup] category migration error: {exc}")


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
