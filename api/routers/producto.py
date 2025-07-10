from fastapi import APIRouter, Body, Request, Response, Depends, Form, UploadFile, File
from dependencies.auth import getcurrentuser
from schemas.auth import LoginUser
from schemas.producto import Producto
from services import producto as producto_service
from typing import Optional
from session import get_db
from sqlalchemy import Connection

router = APIRouter(prefix="/producto", tags=["producto"])

@router.get("/list")
def list_productos(loginuser: LoginUser = Depends(getcurrentuser(required=False)), db: Connection = Depends(get_db)):
    data = producto_service.get_productos(db)
    return data

@router.post("/create")
async def create_producto(
    descripcion: str = Form(),
    precio: float = Form(),
    id_emprendimiento: int = Form(),
    id_categoria: int = Form(),
    file: Optional[UploadFile] = File(None),
    loginuser: LoginUser = Depends(getcurrentuser()), 
    db: Connection = Depends(get_db)
):
    # Crear el objeto Producto manualmente
    producto_data = Producto(
        descripcion=descripcion,
        precio=precio,
        id_emprendimiento=id_emprendimiento,
        id_categoria=id_categoria
    )
    data = await producto_service.create_producto(producto_data, file, db)
    return data
