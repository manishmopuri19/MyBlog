from sqlalchemy import Column,Integer,Text,ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base

class Comment(Base):
    __tablename__="comments"

    id=Column(Integer,primary_key=True,unique=True)
    user_id=Column(
        Integer,
        ForeignKey("users.id")
    )

    post_id=Column(
        Integer,
        ForeignKey("posts.id")
    )
    user=relationship(
        "User",
        back_populates="comments"
    )
    post=relationship(
        "Post",
        back_populates="comments"
    )