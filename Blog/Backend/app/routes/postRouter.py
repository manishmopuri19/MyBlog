from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database.database import get_db

from app.schemas.postSchema import PostCreate,PostUpdateRequest,PostResponse
from app.services.postService import create_post,get_post_by_id,get_posts,delete_post,get_post_by_slug,publish_post
from app.dependencies.permission import admin_required

router=APIRouter(prefix="/posts",tags=["posts"])

@router.post("/posts")
def create_post(request:PostCreate,db:Session=Depends(get_db),current_user=Depends(admin_required)):
    return create_post(db=db,request=request,user_id=current_user["sub"])

@router.get("/posts")
def get_all_posts(db:Session=Depends(get_db)):
    return get_posts(db)

@router.get("/{post_id}")
def get_post(
    post_id:int,
    db:Session=Depends(get_db)
):
    return get_post_by_id(db,post_id)

@router.put("/{post_id}")
def update_post(post_id:int,
                request:PostUpdateRequest,
                db:Session=Depends(get_db),
                current_user=Depends(admin_required)):
    return update_post(
        db,post_id,request
    )
    
@router.delete("/{post_id}")
def delete_post_endpoint(
    post_id:int,
    db:Session=Depends(get_db),
    current_user=Depends(admin_required)
):

    return delete_post(
        db,
        post_id
    )