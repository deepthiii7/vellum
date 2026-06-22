from sqlalchemy import create_engine
from app.core.config import DATABASE_URL

engine = create_engine(DATABASE_URL)

def test_connection():
    try:
        with engine.connect():
            print("Database connection successful")
    except Exception as e:
        print(f"Database connection failed: {e}")