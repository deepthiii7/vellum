from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api_router import api_router

from app.core.database import engine

from app.models.base import Base
from app.models.document import Document


@asynccontextmanager
async def lifespan(app: FastAPI):

    Base.metadata.create_all(
        bind=engine
    )

    yield


app = FastAPI(
    title="Vellum API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Vellum"
    }