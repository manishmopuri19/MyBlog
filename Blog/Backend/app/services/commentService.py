from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select
from fastapi import HTTPException, status
from app.models.commentsModel import Comment


def get_comments(db: Session, post_id: int):
    stmt = (
        select(Comment)
        .where(Comment.post_id == post_id)
        .options(joinedload(Comment.user))
        .order_by(Comment.created_at.asc())
    )
    return db.execute(stmt).unique().scalars().all()


def create_comment(db: Session, post_id: int, content: str, user_id: int):
    comment = Comment(content=content, post_id=post_id, user_id=user_id)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    db.execute(select(Comment).where(Comment.id == comment.id).options(joinedload(Comment.user)))
    return db.execute(
        select(Comment).where(Comment.id == comment.id).options(joinedload(Comment.user))
    ).unique().scalar_one()


def delete_comment(db: Session, comment_id: int, user_id: int, is_admin: bool = False):
    comment = db.execute(
        select(Comment).where(Comment.id == comment_id)
    ).scalar_one_or_none()

    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")

    if not is_admin and comment.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")

    db.delete(comment)
    db.commit()
    return {"message": "Comment deleted"}
