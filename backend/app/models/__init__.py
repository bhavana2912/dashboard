from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import Role, StaffUser  # noqa: E402,F401
