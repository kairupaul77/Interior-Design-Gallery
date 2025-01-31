from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import db, Room, TokenBlocklist  # Import the Room and TokenBlocklist models
from flask_migrate import Migrate
from flask_mail import Mail, Message
from flask_jwt_extended import JWTManager
from datetime import timedelta  # Make sure timedelta is imported
from flask_cors import CORS
import os
from views.product import product_bp
from views.routes import routes_bp  # Import routes_bp from routes.py
from views.user import user_bp

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Load the configuration from config.py
app.config.from_object('config.Config')

# Initialize the SQLAlchemy object (initialize it only once)
db.init_app(app)  # Initialize db with the app here

# Initialize Migrate object
migrate = Migrate(app, db)

# Config database (this is where SQLALCHEMY_DATABASE_URI should be set)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pauldatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Flask mail configuration
app.config['MAIL_SERVER'] = 'smtp.sendgrid.net'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'papikey'  # Set to 'apikey' for SendGrid
app.config['MAIL_PASSWORD'] = '1997kairu'  # Your SendGrid API key
app.config['MAIL_DEFAULT_SENDER'] = 'kairu2182@gmail.com'

mail = Mail(app)

# Config JWT
app.config['JWT_SECRET_KEY'] = 'asdfghytrdserty'  # Secret key for JWT
app.config['ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)  # Corrected expiration time
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

# Initialize JWTManager
jwt = JWTManager(app)

# Import and register blueprints (routes)
app.register_blueprint(user_bp)
app.register_blueprint(product_bp)
app.register_blueprint(routes_bp)  # Register routes_bp

# Token blocklist loader for revoked tokens
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None

# Route to fetch all rooms
@app.route('/rooms', methods=['GET'])
def get_rooms():
    try:
        rooms = Room.query.all()  # Fetch all rooms from the database
        if not rooms:
            return jsonify({"message": "No rooms available"}), 404
        return jsonify([room.to_dict() for room in rooms]), 200  # Return rooms as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to add a new room
@app.route('/rooms', methods=['POST'])
def add_room():
    try:
        # Get the data from the request
        data = request.get_json()
        
        # Validate incoming data
        if not data or not all(key in data for key in ('name', 'description', 'image_url')):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Create a new room
        new_room = Room(
            name=data['name'],
            description=data['description'],
            image_url=data['image_url']
        )
        
        # Add to the database
        db.session.add(new_room)
        db.session.commit()

        return jsonify(new_room.to_dict()), 201  # Return the newly added room as JSON
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Example home route (to check if the app is running)
@app.route('/')
def home():
    return 'Welcome to the Interior Design Gallery!'

# # Add the send-email route here
# @app.route('/send-email', methods=['POST'])
# def send_email():
#     try:
#         msg = Message(
#             subject="Test Email from Flask",
#             sender=app.config["MAIL_DEFAULT_SENDER"],
#             recipients=["recipient@example.com"],  # Replace with your test email
#             body="This is a test email sent from Flask with SendGrid."
#         )
#         mail.send(msg)
#         return jsonify({"msg": "Email sent successfully!"}), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to send email: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
