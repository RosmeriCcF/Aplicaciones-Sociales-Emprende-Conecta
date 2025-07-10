from fastapi import HTTPException, status, UploadFile
from sqlalchemy import Connection, text
from schemas.auth import LoginUser
from typing import Optional

def get_categories(db: Connection):
    """
    Retrieve a list of all categories from the database.
    """
    try:
        query = """
            SELECT id, nombre AS nombre_categoria
            FROM public."Categories"
        """
        result = db.execute(text(query)).fetchall()
        categories = []
        for row in result:
            row_dict = dict(row._mapping)
            categories.append(row_dict)
        return categories
    except Exception as e:
        print(f"Error retrieving categories: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving categories"
        )

def create_category(category_name: str, db: Connection):
    """
    Create a new category in the database.
    """
    try:
        # Check if the category already exists
        existing_category = db.execute(
            text("SELECT * FROM public.\"Categories\" WHERE nombre = :nombre"),
            {"nombre": category_name}
        ).fetchone()

        if existing_category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category already exists"
            )

        # Insert the new category
        db.execute(
            text("INSERT INTO public.\"Categories\" (nombre) VALUES (:nombre)"),
            {"nombre": category_name}
        )
        db.commit()
        return {"message": "Category created successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating category: {str(e)}"
        )
