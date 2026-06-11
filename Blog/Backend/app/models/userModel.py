from sqlalchemy import Column, DateTime,Integer,String
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base
from sqlalchemy import Enum as SQLEnum
from app.enums.roleEnums import RoleEnum

class User(Base):
    __tablename__="users"

    id=Column(Integer,primary_key=True,index=True)

    username=Column(String(50),unique=True,nullable=False)
    email=Column(String(50),unique=True,nullable=False)
    password_hash=Column(String(255),nullable=False)
    created_at=Column(DateTime,default=datetime.utcnow)

    posts=relationship(
        "Post",
        back_populates="author",
        cascade="all, delete-orphan"
    )
    comments=relationship(
        "Comment",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    role=Column(
        SQLEnum(RoleEnum),
        default=RoleEnum.VISITOR,
        nullable=False
    )
