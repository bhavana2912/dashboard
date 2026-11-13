
import os
from dotenv import load_dotenv
from sqlalchemy.engine import URL

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-only-change-me')

    SQLALCHEMY_DATABASE_URI = URL.create(
        drivername='postgresql+psycopg',
        username=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST', 'localhost'),
        port=int(os.getenv('DB_PORT', '5432')),
        database=os.getenv('DB_NAME')
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TOKEN_MAX_AGE_SECONDS = 60 * 60 * 8
