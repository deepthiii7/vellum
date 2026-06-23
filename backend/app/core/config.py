import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent

ENV_FILE = BASE_DIR / ".env"

load_dotenv(ENV_FILE)

DATABASE_URL = os.getenv("DATABASE_URL")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

print("DATABASE_URL =", DATABASE_URL)