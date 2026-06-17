from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.commentSchema import CommentCreate, CommentResponse
from app.services.commentService import get_comments, create_comment, delete_comment
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/posts/{post_id}/comments", tags=["comments"])


@router.get("", response_model=list[CommentResponse])
def get_comments_endpoint(post_id: int, db: Session = Depends(get_db)):
    return get_comments(db, post_id)


@router.post("", status_code=201, response_model=CommentResponse)
def create_comment_endpoint(
    post_id: int,
    request: CommentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_comment(db, post_id, request.content, int(current_user["sub"]))


@router.delete("/{comment_id}")
def delete_comment_endpoint(
    post_id: int,
    comment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    is_admin = current_user.get("role") == "admin"
    return delete_comment(db, comment_id, int(current_user["sub"]), is_admin)
