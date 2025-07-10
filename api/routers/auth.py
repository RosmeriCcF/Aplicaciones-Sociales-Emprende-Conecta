from fastapi import APIRouter, Body, Request, Response, Depends, Form, UploadFile, File
from schemas.auth import LoginData, LoginUser
from dependencies.auth import getcurrentuser
from enums import UserRole
from services import auth as auth_service
from typing import Optional
from pydantic import EmailStr
from session import get_db
from sqlalchemy import Connection

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login(logindata: LoginData, response: Response, db: Connection = Depends(get_db)):
    data = auth_service.login(logindata.email, logindata.password, db)
    if data["token"]:
        response.set_cookie(
            "accesstoken",
            data["token"],
            httponly=True,
            max_age=None
        )
    return data

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("accesstoken")
    return {"message": "Logged out successfully"}

@router.post("/register")
async def register(
    tipo: UserRole = Form(...),
    nombre: str = Form(...),
    correo: EmailStr = Form(...),
    contrasena: str = Form(...),
    nombre_emprendimiento: Optional[str] = Form(None),
    ubicacion: Optional[str] = Form(None),
    ruc: Optional[str] = Form(None),
    logo: Optional[UploadFile] = File(None),
    db: Connection = Depends(get_db)
):
    data = await auth_service.register(
        tipo=tipo,
        nombre=nombre,
        correo=correo,
        contrasena=contrasena,
        nombre_emprendimiento=nombre_emprendimiento,
        ubicacion=ubicacion,
        ruc=ruc,
        logo=logo,
        db=db
    )
    return data

@router.get("/me", response_model=LoginUser)
def get_me(loginuser: LoginUser = Depends(getcurrentuser())):
    return loginuser.model_dump()
