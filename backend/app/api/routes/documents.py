from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.document import Document
from app.services.file_service import save_pdf
from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import create_chunks
from app.services.embedding_service import generate_embeddings

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    try:

        file_path = save_pdf(file)

        document = Document(
            filename=file.filename,
            file_path=file_path
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        return {
            "id": document.id,
            "filename": document.filename,
            "message": "Upload successful"
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    
@router.get("/{document_id}/text")
def get_document_text(
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

    return {
        "document_id": document.id,
        "filename": document.filename,
        "text": text
    }

@router.get("/{document_id}/chunks")
def get_document_chunks(
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

    chunks = create_chunks(text)

    return {
        "document_id": document.id,
        "filename": document.filename,
        "total_chunks": len(chunks),
        "chunks": chunks
    }

@router.get("/{document_id}/embeddings")
def get_document_embeddings(
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

    chunks = create_chunks(text)

    embeddings = generate_embeddings(chunks)

    return {
        "document_id": document.id,
        "total_chunks": len(chunks),
        "embedding_dimension": len(
            embeddings[0]
        ),
        "sample_embedding": embeddings[0][:10].tolist()
    }