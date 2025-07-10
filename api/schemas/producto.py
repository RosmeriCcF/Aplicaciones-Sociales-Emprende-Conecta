from pydantic import BaseModel

class Producto(BaseModel):
    descripcion: str
    precio: float
    id_emprendimiento: int
    id_categoria: int
