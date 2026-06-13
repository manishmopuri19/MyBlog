from pydantic import BaseModel, EmailStr, Field

class RegistrationRequest(BaseModel):

    username:str=Field(min_length=2,max_length=50)
    email:EmailStr
    password:str=Field(min_length=4)

class LoginRequest(BaseModel):
    email:EmailStr
    password:str

class TokenResponse(BaseModel):
    access_token:str
    token_type:str
    