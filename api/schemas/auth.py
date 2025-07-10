from pydantic import BaseModel, EmailStr
from enums import UserRole

class LoginData(BaseModel):
    email: EmailStr
    password: str
    
class LoginUser(BaseModel):
    id: str
    email: EmailStr
    name: str
    rol: UserRole
