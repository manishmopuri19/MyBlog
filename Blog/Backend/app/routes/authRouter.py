from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.authSchema import RegistrationRequest, LoginRequest
from app.services.authService import register_user, login_user
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", status_code=201)
def register(request: RegistrationRequest, db: Session = Depends(get_db)):
    return register_user(db, request)


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    return login_user(db, request)


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return current_user
