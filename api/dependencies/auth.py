from fastapi import Cookie, HTTPException, status, Request, Header
from typing import Annotated
from jose import jwt
from schemas.auth import LoginUser
from config import settings

def getcurrentuser(required: bool = True):
    def _gettoken(accesstoken: Annotated[str, Cookie()] = None):
        if not required and not accesstoken:
            return None
        try:
            if not accesstoken:
                raise Exception("Login required")
            obj = jwt.decode(accesstoken, settings.JWT_SECRET)
            loginuser = LoginUser(
                id=obj["id"],
                email=obj["email"],
                name=obj["name"],
                rol=obj["rol"]
            )
            return loginuser
        except Exception as e:
            print(str(e))
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Login required"
            )
    return _gettoken

