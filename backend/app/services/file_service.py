from pathlib import Path
import shutil
from fastapi import UploadFile

UPLOAD_DIR = Path("app/uploads")

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def save_pdf(file: UploadFile) -> str:

    if not file.filename.lower().endswith(".pdf"):
        raise ValueError("Only PDF files are allowed")

    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return str(file_path)