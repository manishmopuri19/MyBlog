from sqlalchemy import select
from sqlalchemy.orm import Session

from fastapi import HTTPException,status
from app.enums.roleEnums import RoleEnum
from app.models.userModel import User

from app.core.security import (create_access_token,hash_password,verify_password)

def register_user(db:Session,request):
    stmt=select(User).where(User.email==request.email)
    existing_user=(db.execute(stmt).scalar_one_or_none())


    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists"
        )
    
    user = User(
    username=request.username,
    email=request.email,
    password_hash=hash_password(request.password),
    role=RoleEnum.VISITOR
)

    db.add(user)

    db.commit()

    return user

def login_user(db:Session,request):
    stmt=select(User).where(User.email==request.email)

    user=(
        db.execute(stmt)
        .scalar_one_or_none()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="user not found"
        )
    
    if not verify_password(request.password,user.password_hash):
        raise HTTPException(status_code=401,
                            detail="Invaild credentials")
    
    token=create_access_token({"sub":str(user.id),
                               "role":user.role.value})

    return {
        "access_token":token,
        "token_type":"bearer"
    }

