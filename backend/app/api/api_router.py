from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.api.routes.documents import router as document_router
from app.api.routes.chat import router as chat_router
from app.api.routes.compare import (
    router as compare_router
)

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(document_router)
api_router.include_router(chat_router)
api_router.include_router(compare_router)