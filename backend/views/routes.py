from flask import Blueprint, request, jsonify
from models import db, User, TokenBlocklist
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import datetime, timezone

# Define Blueprint for authentication routes
routes_bp = Blueprint('routes_bp', __name__)

# Login route
@routes_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Validate the input
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Fetch the user by email
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        # Generate JWT token
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "Either email/password is incorrect"}), 404

# Current user route (requires authentication)
@routes_bp.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)
    if user:
        user_data = {
            'id': user.id,
            'email': user.email,
            # 'is_approved': user.is_approved,
            'is_admin': user.is_admin,
            'username': user.username
        }
        return jsonify(user_data)
    else:
        return jsonify({"error": "User not found"}), 404

# Logout route
@routes_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    
    # Add the JWT to the blocklist
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()

    return jsonify({"success": "Logged out successfully"}), 200
