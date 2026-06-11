from sqlalchemy import Table, Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey

from app.database.database import Base

post_tags = Table(
    "post_tags",
    Base.metadata,

    Column(
        "post_id",
        Integer,
        ForeignKey("posts.id", ondelete="CASCADE"),
        primary_key=True
    ),

    Column(
        "tag_id",
        Integer,
        ForeignKey("tags.id", ondelete="CASCADE"),
        primary_key=True
    )
)