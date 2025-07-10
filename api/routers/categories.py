from fastapi import APIRouter, Body, Request, Response, Depends, Form, UploadFile, File
from dependencies.auth import getcurrentuser
from schemas.auth import LoginUser
from services import categories as categories_service
from typing import Optional
from session import get_db
from sqlalchemy import Connection

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/list")
def list_categories(
    loginuser: LoginUser = Depends(getcurrentuser(required=False)),
    db: Connection = Depends(get_db)
):
    """
    Retrieve a list of all categories.
    """
    data = categories_service.get_categories(db)
    return data

@router.post("/create")
def create_category(
    category_name: str = Body(embed=True),
    loginuser: LoginUser = Depends(getcurrentuser()),
    db: Connection = Depends(get_db)
):
    """
    Create a new category.
    """
    data = categories_service.create_category(category_name, db)
    return data
