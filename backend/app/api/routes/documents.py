from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.document import Document
from app.services.file_service import save_pdf

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