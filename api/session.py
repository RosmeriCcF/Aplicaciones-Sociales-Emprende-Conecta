from config import settings
from fastapi import Depends
from sqlalchemy import create_engine

database_url = f"postgresql://{settings.DATABASE_USER}:{settings.DATABASE_PWD}@{settings.DATABASE_HOST}:{settings.DATABASE_PORT}/{settings.DATABASE_NAME}"

engine = create_engine(database_url)

def get_db():
    """
    Dependency that provides a database session.
    """
    try:
        db = engine.connect()
        yield db
    finally:
        db.close()
