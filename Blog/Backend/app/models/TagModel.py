from sqlalchemy import Column,Integer,String
from sqlalchemy.orm import relationship
from app.models.post_tagModel import post_tags
from app.database.database import Base

class Tag(Base):
    __tablename__="tags"
    id=Column(Integer,primary_key=True)
    name=Column(String(100),unique=True)

    posts = relationship(
    "Post",
    secondary=post_tags,
    back_populates="tags"
    )