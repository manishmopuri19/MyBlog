from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from dotenv import load_dotenv

import os
load_dotenv()

DATABASE_URL=os.getenv("DATABASE_URL")

engine=create_engine(
    DATABASE_URL,
    echo=True
)


SessionLocal = sessionmaker(
    bind=engine,
    class_=Session,
    expire_on_commit=False
)

Base=declarative_base()

def get_db():
    db=SessionLocal()

    try:
        yield db
    finally:
        db.close()
