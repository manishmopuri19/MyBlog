from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.models.postModel import Post
from app.models.post_tagModel import post_tags
from app.models.TagModel import Tag

def _resolve_tags(db: Session, tag_ids: list[int]) -> list:
    if not tag_ids:
        return []
    stmt = select(Tag).where(Tag.id.in_(tag_ids))
    found = db.execute(stmt).scalars().all()
    if len(found) != len(tag_ids):
        found_ids = {t.id for t in found}
        missing = [i for i in tag_ids if i not in found_ids]
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tags not found: {missing}"
        )
    return found

def create_post(db:Session,request,user_id:int):
    slug = request.title.lower().replace(" ", "_")

    post=Post(
        title=request.title,
        content=request.content,
        slug=slug,
        category=request.category,
        user_id=user_id,
        is_published=request.is_published
    )

    if request.tag_ids:
        post.tags = _resolve_tags(db, request.tag_ids)

    db.add(post)
    try:
        db.commit()
        db.refresh(post)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A post with this title already exists"
        )

    return post

def get_all_posts_admin(db: Session):
    stmt = select(Post).order_by(Post.created_at.desc())
    return db.execute(stmt).unique().scalars().all()


def get_posts(db:Session):
    stmt=(
        select(Post).where(Post.is_published==True)
        .order_by(Post.created_at.desc())
    )

    posts=(
        db.execute(stmt)
        .unique()
        .scalars()
        .all()
    )

    return posts

def get_post_by_id(db:Session,post_id:int):
    stmt=(
        select(Post)
        .where(Post.id==post_id)
    )
    post=(
        db.execute(stmt)
        .unique()
        .scalar_one_or_none()
    )

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    return post


def get_post_by_slug(db:Session,slug:str):
    stmt=(
        select(Post)
        .where(Post.slug==slug)
    )

    post=(
        db.execute(stmt)
        .unique()
        .scalar_one_or_none()
    )

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    return post

def update_post(db:Session,post_id:int,request):
    post=get_post_by_id(db,post_id)

    if request.title:
        post.title=request.title
        post.slug=(request.title.lower().replace(" ","_"))

    if request.content:
        post.content=request.content

    if request.category:
        post.category=request.category

    if request.is_published is not None:
        post.is_published=request.is_published

    if request.tag_ids is not None:
        post.tags = _resolve_tags(db, request.tag_ids)

    db.commit()

    db.refresh(post)

    return post

def delete_post(db:Session,post_id:int):
    post=get_post_by_id(db,post_id)
    db.delete(post)
    db.commit()

    return {
        "message":"post deleted successfully"
    }

def publish_post(db:Session,post_id:int):
    post=get_post_by_id(db,post_id)

    post.is_published=True
    db.commit()

    db.refresh(post)

    return post

def unpublish_post(db:Session,post_id:int):
    post=get_post_by_id(db,post_id)

    post.is_published=False
    db.commit()
    db.refresh(post)

    return post