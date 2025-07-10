from fastapi import APIRouter, Body, Request, Response, Depends, Form, UploadFile, File
from dependencies.auth import getcurrentuser
from schemas.auth import LoginUser
from services import emprendimiento as emprendimiento_service
from typing import Optional
from session import get_db
from sqlalchemy import Connection

router = APIRouter(prefix="/emprendimiento", tags=["emprendimiento"])

@router.get("/list")
def list_emprendimientos(loginuser: LoginUser = Depends(getcurrentuser(required=False)), db: Connection = Depends(get_db)):
    data = emprendimiento_service.get_emprendimientos_list(db)
    return data

@router.get("/emprendimientos-favoritos")
def list_emprendimientos_favoritos(loginuser: LoginUser = Depends(getcurrentuser()), db: Connection = Depends(get_db)):
    data = emprendimiento_service.get_emprendimientos_favoritos_by_user(loginuser, db)
    return data

@router.post("/set-favorito")
def set_emprendimiento_favorito(
    id_emprendimiento: str = Body(embed=True),
    loginuser: LoginUser = Depends(getcurrentuser()),
    db: Connection = Depends(get_db)
):
    data = emprendimiento_service.set_emprendimiento_favorito(id_emprendimiento, loginuser, db)
    return data
