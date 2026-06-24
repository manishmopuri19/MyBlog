from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean
from app.database.database import Base
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.post_tagModel import post_tags
class Post(Base):
    __tablename__="posts"

    id=Column(Integer,primary_key=True)

    title=Column(String(255),nullable=False)

    description=Column(Text,nullable=True)

    content=Column(Text,nullable=False)

    slug=Column(String(255),unique=True,nullable=False)
    is_published = Column(
        Boolean,
        default=False
    )

    created_at=Column(
        DateTime,
        default=datetime.utcnow

    )

    updated_at=Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    user_id=Column(
        Integer,
        ForeignKey("users.id")

    )
    category = Column(String(50), nullable=False)

  

    author=relationship(
        "User",
        back_populates="posts"
    )


    comments=relationship(
        "Comment",
        back_populates="post",
        cascade="all, delete-orphan"
    )

    tags=relationship(
        "Tag",
        secondary=post_tags,
        lazy="joined",
        back_populates="posts"
    )
