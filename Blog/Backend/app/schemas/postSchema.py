from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from app.enums.categoryEnum import CategoryEnum
from app.schemas.tagSchema import TagResponse


class PostCreate(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    content: str = Field(min_length=10)
    category: CategoryEnum
    is_published: bool = False
    tag_ids: list[int] = []


class PostUpdateRequest(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[CategoryEnum] = None
    is_published: Optional[bool] = None
    tag_ids: Optional[list[int]] = None


class PostResponse(BaseModel):
    id: int
    title: str
    slug: str
    content: str
    category: CategoryEnum
    is_published: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    tags: list[TagResponse] = []

    class Config:
        from_attributes = True
