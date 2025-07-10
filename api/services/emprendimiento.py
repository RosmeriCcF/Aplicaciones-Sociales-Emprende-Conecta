from fastapi import HTTPException, status
from sqlalchemy import Connection, text
from schemas.auth import LoginUser

def get_emprendimientos_list(db: Connection):
    """
    Retrieve a list of all emprendimientos from the database.
    """
    try:
        query = """
            SELECT 
                e.id AS id_emprendimiento,
                e.nombre AS nombre_emprendimiento,
                e.ubicacion AS ubicacion_emprendimiento,
                e.ruc AS ruc_emprendimiento,
                e.imagen_logo_url AS logo_emprendimiento_url,
                u.id AS id_usuario,
                u.full_name AS nombre_usuario,
                u.email AS correo_usuario
            FROM public."Entrepreneurships" e
            JOIN public."Users" u ON e.id_user = u.id
        """
        result = db.execute(text(query)).fetchall()
        emprendimientos = []
        for row in result:
            row_dict = dict(row._mapping)
            for key, value in row_dict.items():
                if type(value).__name__ == "UUID":
                    row_dict[key] = str(value)
            emprendimientos.append(row_dict)
        return emprendimientos
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving emprendimientos: {str(e)}"
        )

def get_emprendimientos_favoritos_by_user(loginuser: LoginUser, db: Connection):
    """
    Retrieve a list of emprendimientos created by a specific user.
    """
    try:
        query = """
            SELECT 
                e.id AS id_emprendimiento,
                e.nombre AS nombre_emprendimiento,
                e.ubicacion AS ubicacion_emprendimiento,
                e.ruc AS ruc_emprendimiento,
                e.imagen_logo_url AS logo_emprendimiento_url,
                u.id AS id_usuario,
                u.full_name AS nombre_usuario,
                u.email AS correo_usuario
            FROM public."Entrepreneurships" e
            JOIN public."Entrepreneurship_Favorites" ef ON e.id = ef.id_emprendimiento
            JOIN public."Users" u ON ef.id_user = u.id
            WHERE u.id = :user_id
        """
        result = db.execute(text(query), {"user_id": loginuser.id}).fetchall()
        emprendimientos = []
        for row in result:
            row_dict = dict(row._mapping)
            for key, value in row_dict.items():
                if type(value).__name__ == "UUID":
                    row_dict[key] = str(value)
            emprendimientos.append(row_dict)
        return emprendimientos
    except Exception as e:
        print(f"Error retrieving emprendimientos: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving emprendimientos"
        )
        
def set_emprendimiento_favorito(id_emprendimiento: str, loginuser: LoginUser, db: Connection):
    """
    Set an emprendimiento as favorite for the current user.
    """
    try:
        # Check if the emprendimiento exists
        query = "SELECT * FROM public.\"Entrepreneurships\" WHERE id = :id_emprendimiento"
        emprendimiento = db.execute(text(query), {"id_emprendimiento": id_emprendimiento}).fetchone()
        
        if not emprendimiento:
            
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Emprendimiento not found"
            )
        # Check if the emprendimiento is already in favorites
        query = "SELECT * FROM public.\"Entrepreneurship_Favorites\" WHERE id_emprendimiento = :id_emprendimiento AND id_user = :user_id"
        favorite = db.execute(text(query), {"id_emprendimiento": id_emprendimiento, "user_id": loginuser.id}).fetchone()

        if not favorite:
            # Insert into favorites
            insert_query = """
                INSERT INTO public."Entrepreneurship_Favorites" (id_emprendimiento, id_user, favorito_still)
                VALUES (:id_emprendimiento, :user_id, TRUE)
            """
            db.execute(text(insert_query), {"id_emprendimiento": id_emprendimiento, "user_id": loginuser.id})
            
        else:
            result = emprendimiento._mapping
            isSet = result.get("favorito_still", None)
            if isSet is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Emprendimiento not found in favorites"
                )
            update_query = """
                UPDATE public."Entrepreneurship_Favorites"
                SET favorito_still = :favorito_still
                WHERE id_emprendimiento = :id_emprendimiento AND id_user = :user_id
            """
            db.execute(text(update_query), {
                "id_emprendimiento": id_emprendimiento,
                "user_id": loginuser.id,
                "favorito_still": not isSet
            })
        
        db.commit()
        
        return {"message": "Emprendimiento added to favorites"}
    except Exception as e:
        print(f"Error setting emprendimiento as favorite: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error setting emprendimiento as favorite"
        )
