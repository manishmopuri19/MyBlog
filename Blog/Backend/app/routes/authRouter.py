from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import session
from app.database.database import get_db

from app.schemas.authSchema import RegistrationRequest,LoginRequest
from app.services.authService import register_user,login_user

router=APIRouter(prefix="/auth",tags=["Authentication"])

@router.post("/register")
def register(request:RegistrationRequest,db:session=Depends(get_db)):
    return register_user(db,request)

@router.post("/login")
def login(request:LoginRequest,db:session=Depends(get_db)):
    return login_user(db,request)
