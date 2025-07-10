# Entrypoint of the whole application
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, emprendimiento, producto, categories

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth.router)
app.include_router(emprendimiento.router)
app.include_router(producto.router)
app.include_router(categories.router)
