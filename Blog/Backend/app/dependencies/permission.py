from fastapi import Depends
from app.dependencies.auth import get_current_user
from app.enums.roleEnums import RoleEnum
from fastapi import HTTPException


def admin_required(current_user=Depends(get_current_user)):
   if current_user.get("role")!=RoleEnum.ADMIN.value:
      raise HTTPException(
         status_code=403,
         detail="Not Authoriszed"
      )
   
   return current_user