from pydantic_settings import BaseSettings, SettingsConfigDict
from supabase import create_client

class Settings(BaseSettings):
    DATABASE_USER: str
    DATABASE_PWD: str
    DATABASE_HOST: str
    DATABASE_PORT: str
    DATABASE_NAME: str
    SUPABASE_URL: str
    SUPABASE_KEY: str
    JWT_SECRET: str

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    
settings = Settings()

supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
print(f"supabase: {supabase_client.auth_url}")
