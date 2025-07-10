from fastapi import HTTPException, status, UploadFile
from config import settings, supabase_client
from sqlalchemy import Connection, text
from jose import jwt
from uuid import uuid4
import bcrypt
from enums import UserRole
from base64 import b64encode, b64decode
from utils import save_file_image_to_storage

def login(email: str, password: str, db: Connection):
    user = db.execute(
        text("""SELECT id, email, full_name "name", hashed_pwd "hashpwd", rol FROM public."Users" WHERE email = :email"""), {"email": email}
    ).fetchone()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    user_dict = dict(user._mapping)

    if not bcrypt.checkpw(password.encode('utf-8'), user_dict['hashpwd'].encode('utf-8')):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token_data = {
        "id": str(user_dict['id']),
        "email": user_dict['email'],
        "name": user_dict['name'],
        "rol": user_dict['rol']
    }
    
    token = jwt.encode(token_data, settings.JWT_SECRET)
    
    return {"token": token}

async def register(tipo: UserRole, nombre: str, correo: str, contrasena: str,
            nombre_emprendimiento: str = None, ubicacion: str = None,
            ruc: str = None, logo: UploadFile = None, db: Connection = None):
    
    hashed_password = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    user_id = str(uuid4())
    
    db.execute(
        text("INSERT INTO public.\"Users\" (id, email, full_name, hashed_pwd, rol) "
        "VALUES (:id, :email, :full_name, :hashed_pwd, :rol)"),
        {
            "id": user_id,
            "email": correo,
            "full_name": nombre,
            "hashed_pwd": hashed_password,
            "rol": tipo.value,
        }
    )
    
    db.execute(
        text("INSERT INTO public.\"Entrepreneurships\" (nombre, ubicacion, ruc, id_user) VALUES (:nombre, :ubicacion, :ruc, :id_user)"),
        {
            "nombre": nombre_emprendimiento,
            "ubicacion": ubicacion,
            "ruc": ruc,
            "id_user": user_id
        }
    )
    
    if logo:
       
        file_name = logo.filename
        file_content = await logo.read()  # Leer el contenido del archivo

        public_url = save_file_image_to_storage(file_name, file_content, bucket="emprendimiento-logos")

        db.execute(
            text("UPDATE public.\"Entrepreneurships\" SET imagen_logo_url = :imagen_url WHERE id_user = :id_user"),
            {
                "imagen_url": public_url,
                "id_user": user_id
            }
        )
    
    db.commit()
    
    return {"message": "User registered successfully"}
