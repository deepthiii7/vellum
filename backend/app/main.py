from fastapi import FastAPI
from app.api.api_router import api_router
from app.core.database import test_connection

app = FastAPI(
    title="Vellum API",
    version="1.0.0"
)

app.include_router(api_router)

@app.on_event("startup")
def startup_event():
    test_connection()

@app.get("/")
def root():
    return {
        "message": "Welcome to Vellum"
    }