from fastapi import FastAPI

from app.api.api_router import api_router
from app.core.database import engine

from app.models.base import Base
from app.models.document import Document

app = FastAPI(
    title="Vellum API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(api_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Vellum"
    }