from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.document import Document

from app.services.pdf_service import (
    extract_text_from_pdf
)

from app.services.extraction_service import (
    extract_information
)

router = APIRouter(
    prefix="/extract",
    tags=["Extraction"]
)


@router.post("/")
def extract_document_data(
    document_id: int,
    db: Session = Depends(get_db)
):

    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    text = extract_text_from_pdf(
        document.file_path
    )

    extracted = extract_information(
        text
    )

    return extracted