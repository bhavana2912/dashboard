
import getpass

from app import create_app
from app.models import Role, StaffUser, db

app = create_app()

with app.app_context():
    # Find the existing Management role.
    admin_role = Role.query.filter_by(
        role_name='Management (Admin)'
    ).first()

    if not admin_role:
        print("Management role not found. Please check the roles table.")
        raise SystemExit(1)

    print("\nCreate the initial Management account")

    username = input("Admin username: ").strip()
    full_name = input("Admin full name: ").strip()
    password = getpass.getpass("Admin password: ")
    confirm_password = getpass.getpass("Confirm password: ")

    if not username or not full_name or not password:
        print("All fields are required.")
        raise SystemExit(1)

    if password != confirm_password:
        print("Passwords do not match.")
        raise SystemExit(1)

    if len(password) < 8:
        print("Password must contain at least 8 characters.")
        raise SystemExit(1)

    existing_user = StaffUser.query.filter_by(
        username=username
    ).first()

    if existing_user:
        print("This username already exists. No changes made.")
        raise SystemExit(1)

    admin = StaffUser(
        username=username,
        full_name=full_name,
        role_id=admin_role.id
    )

    admin.set_password(password)

    db.session.add(admin)
    db.session.commit()

    print("\nManagement account created successfully!")
    print("You can now log in using your username and password.")
