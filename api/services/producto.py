from fastapi import HTTPException, status, UploadFile
from sqlalchemy import Connection, text
from schemas.auth import LoginUser
from schemas.producto import Producto
from typing import Optional
from utils import save_file_image_to_storage

def get_productos(db: Connection):
    """
    Retrieve a list of all products from the database.
    """
    try:
        query = """
            SELECT 
                p.id AS id_producto,
                p.descripcion AS descripcion_producto,
                p.precio AS precio_producto,
                p.imagen_url AS imagen_producto_url,
                e.id AS id_emprendimiento,
                e.nombre AS nombre_emprendimiento,
                c.nombre AS nombre_categoria
            FROM public."Products" p
            JOIN public."Entrepreneurships" e ON p.id_emprendimiento = e.id
            JOIN public."Categories" c ON p.id_categoria = c.id
        """
        result = db.execute(text(query)).fetchall()
        productos = []
        for row in result:
            productos.append(dict(row._mapping))
        return productos
    except Exception as e:
        print(f"Error retrieving products: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving products"
        )

async def create_producto(productoData: Producto, file: Optional[UploadFile], db: Connection):
    """
    Create a new product in the database.
    """
    try:
        # Check if emprendimiento exists
        emprendimiento = db.execute(
            text("SELECT * FROM public.\"Entrepreneurships\" WHERE id = :id_emprendimiento"),
            {"id_emprendimiento": productoData.id_emprendimiento}
        ).fetchone()
        if not emprendimiento:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Entrepreneurship not found"
            )
            
        # Check if category exists
        categoria = db.execute(
            text("SELECT * FROM public.\"Categories\" WHERE id = :id_categoria"),
            {"id_categoria": productoData.id_categoria}
        ).fetchone()
        if not categoria:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found"
            )

        # First, we store the image if provided.
        if file:
            # Generate a unique filename for the image
            filename = file.filename
            # Read the file content
            file_content = await file.read()
            # Save the file to storage and get the public URL
            image_url = save_file_image_to_storage(filename, file_content, bucket="productos-imagen")
        else:
            image_url = None

        db.execute(
            text("""
                INSERT INTO public."Products" (descripcion, precio, imagen_url, id_emprendimiento, id_categoria)
                VALUES (:descripcion, :precio, :imagen_url, :id_emprendimiento, :id_categoria)
            """),
            {
                "descripcion": productoData.descripcion,
                "precio": productoData.precio,
                "imagen_url": image_url,
                "id_emprendimiento": productoData.id_emprendimiento,
                "id_categoria": productoData.id_categoria
            }
        )
        db.commit()
        return {"message": "Product created successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating product: {str(e)}"
        )
