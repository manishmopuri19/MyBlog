from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.postSchema import PostCreate, PostUpdateRequest, PostResponse
from app.services.postService import (
    create_post, get_post_by_id, get_post_by_slug,
    get_posts, get_all_posts_admin, delete_post,
    update_post, publish_post, unpublish_post
)
from app.dependencies.permission import admin_required
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/posts", tags=["posts"])


@router.post("", status_code=201, response_model=PostResponse)
def create_post_endpoint(
    request: PostCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return create_post(db=db, request=request, user_id=int(current_user["sub"]))


@router.get("", response_model=list[PostResponse])
def get_all_posts(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return get_posts(db)


# Must be defined before /{post_id} so FastAPI doesn't treat "admin" as an id
@router.get("/admin/all", response_model=list[PostResponse])
def get_admin_all_posts(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return get_all_posts_admin(db)


@router.get("/slug/{slug}", response_model=PostResponse)
def get_post_by_slug_endpoint(slug: str, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return get_post_by_slug(db, slug)


@router.get("/{post_id}", response_model=PostResponse)
def get_post(post_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return get_post_by_id(db, post_id)


@router.put("/{post_id}", response_model=PostResponse)
def update_post_endpoint(
    post_id: int,
    request: PostUpdateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return update_post(db, post_id, request)


@router.patch("/{post_id}/publish", response_model=PostResponse)
def publish_post_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return publish_post(db, post_id)


@router.patch("/{post_id}/unpublish", response_model=PostResponse)
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
