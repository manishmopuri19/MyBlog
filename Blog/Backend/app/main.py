from fastapi import FastAPI
from app.database.database import engine
from app.database.database import Base

from app import models

from app.routes.authRouter import router as auth_router
from app.routes.postRouter import router as post_router
app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    try:
        connection = engine.connect()
        connection.close()

        return {
            "message": "database connected successfully"
        }

    except Exception as e:
        return {
            "error": str(e)
        }

app.include_router(auth_router)
app.include_router(post_router)