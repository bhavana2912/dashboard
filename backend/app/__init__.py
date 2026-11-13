from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import text

from config import Config
from .models import db


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app, origins=['http://localhost:5173', 'http://127.0.0.1:5173'])
    db.init_app(app)

    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    @app.get('/api/db-check')
    def db_check():
        db.session.execute(text('SELECT 1'))
        return jsonify(status='ok', message='Database connected')

    return app
