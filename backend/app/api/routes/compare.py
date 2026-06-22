from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.document import Document

from app.services.pdf_service import (
    extract_text_from_pdf
)

from app.services.comparison_service import (
    compare_documents
)

router = APIRouter(
    prefix="/compare",
    tags=["Comparison"]
)


@router.post("/")
def compare(
    document_a_id: int,
    document_b_id: int,
    db: Session = Depends(get_db)
):

    doc_a = (
        db.query(Document)
        .filter(Document.id == document_a_id)
        .first()
    )

    doc_b = (
        db.query(Document)
        .filter(Document.id == document_b_id)
        .first()
    )

    if not doc_a or not doc_b:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    text_a = extract_text_from_pdf(
        doc_a.file_path
    )

    text_b = extract_text_from_pdf(
        doc_b.file_path
    )

    result = compare_documents(
        text_a,
        text_b
    )

    return {
        "document_a": doc_a.filename,
        "document_b": doc_b.filename,
        "comparison": result
    }