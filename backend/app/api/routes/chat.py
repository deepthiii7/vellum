from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.document import Document

from app.services.pdf_service import (
    extract_text_from_pdf
)

from app.services.chunk_service import (
    create_chunks
)

from app.services.vector_service import (
    load_index,
    search_chunks
)

from app.services.embedding_service import model

from app.services.rag_service import (
    generate_answer
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/ask")
def ask_question(
    document_id: int,
    question: str,
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

    index, chunks = load_index(
        document.id
    )

    retrieved_chunks = search_chunks(
        query=question,
        index=index,
        chunks=chunks,
        model=model,
        top_k=3
    )

    answer = generate_answer(
        question,
        retrieved_chunks
    )

    return {
        "question": question,
        "answer": answer,
        "sources": retrieved_chunks
    }