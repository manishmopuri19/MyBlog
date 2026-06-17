from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine
from app.database.database import Base

from app import models

from app.routes.authRouter import router as auth_router
from app.routes.postRouter import router as post_router
from app.routes.commentRouter import router as comment_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
        "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    try:
        with engine.connect():
            pass
        return {
            "message": "database connected successfully"
        }

    except Exception:
        return {
            "error": "server error"
        }

app.include_router(auth_router)
app.include_router(post_router)
app.include_router(comment_router)