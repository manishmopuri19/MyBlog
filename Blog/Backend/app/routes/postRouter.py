from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.postSchema import PostCreate, PostUpdateRequest
from app.services.postService import (
    create_post, get_post_by_id, get_post_by_slug,
    get_posts, get_all_posts_admin, delete_post,
    update_post, publish_post, unpublish_post
)
from app.dependencies.permission import admin_required

router = APIRouter(prefix="/posts", tags=["posts"])


@router.post("", status_code=201)
def create_post_endpoint(
    request: PostCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return create_post(db=db, request=request, user_id=current_user["sub"])


@router.get("")
def get_all_posts(db: Session = Depends(get_db)):
    return get_posts(db)


# Must be defined before /{post_id} so FastAPI doesn't treat "admin" as an id
@router.get("/admin/all")
def get_admin_all_posts(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return get_all_posts_admin(db)


@router.get("/slug/{slug}")
def get_post_by_slug_endpoint(slug: str, db: Session = Depends(get_db)):
    return get_post_by_slug(db, slug)


@router.get("/{post_id}")
def get_post(post_id: int, db: Session = Depends(get_db)):
    return get_post_by_id(db, post_id)


@router.put("/{post_id}")
def update_post_endpoint(
    post_id: int,
    request: PostUpdateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return update_post(db, post_id, request)


@router.patch("/{post_id}/publish")
def publish_post_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return publish_post(db, post_id)


@router.patch("/{post_id}/unpublish")
def unpublish_post_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return unpublish_post(db, post_id)


@router.delete("/{post_id}")
def delete_post_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return delete_post(db, post_id)
