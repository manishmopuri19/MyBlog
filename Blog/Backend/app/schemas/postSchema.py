from pydantic import BaseModel
from pydantic import Field
from datetime import datetime
from typing import Optional
from app.enums.categoryEnum import CategoryEnum

class PostCreate(BaseModel):
    title:str=Field(min_length=3,max_length=25)

    content:str=Field(min_length=10)
    category_id:CategoryEnum
    is_published: bool = False
    category_id: Optional[int] = None
    tag_ids: list[int] = []

class PostResponse(BaseException):
    id:int
    title:str

    content:str
    category_id:Optional[CategoryEnum]=None

    created_at:datetime

    class config:
        from_attributes=True

class PostUpdateRequest(BaseModel):
    title:Optional[str]=None
    content:Optional[str]=None
    category_id:Optional[CategoryEnum]=None

    is_published:Optional[bool]=None

    tag_ids:Optional[list[int]]=None


