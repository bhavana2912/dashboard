from flask import Blueprint, current_app, jsonify, request
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

from ..models import StaffUser, db

auth_bp = Blueprint('auth', __name__)


def _serializer():
    return URLSafeTimedSerializer(current_app.config['SECRET_KEY'], salt='satya-login')


@auth_bp.post('/login')
def login():
    data = request.get_json(silent=True) or {}
    username = (data.get('username') or '').strip()
    password = data.get('password') or ''
    if not username or not password:
        return jsonify(message='User name and password are required.'), 400

    user = StaffUser.query.filter_by(username=username).first()
    # Same message for wrong user / wrong password (do not reveal which one is wrong)
    if not user or not user.is_active or not user.check_password(password):
        return jsonify(message='Invalid user name or password.'), 401

    token = _serializer().dumps({'uid': user.id})
    return jsonify(token=token, user=user.to_dict())


@auth_bp.get('/me')
def me():
    header = request.headers.get('Authorization', '')
    token = header.removeprefix('Bearer ').strip()
    try:
        uid = _serializer().loads(token, max_age=current_app.config['TOKEN_MAX_AGE_SECONDS'])['uid']
    except (BadSignature, SignatureExpired):
        return jsonify(message='Session expired. Please sign in again.'), 401
    user = db.session.get(StaffUser, uid)
    if not user:
        return jsonify(message='User not found.'), 401
    return jsonify(user=user.to_dict())


@auth_bp.post('/forgot-password')
def forgot_password():
    # Always the same answer, so nobody can find out which accounts exist.
    # TODO: send a real reset email once the mail server details are given.
    return jsonify(message='If this account exists, a password reset link has been sent.')
