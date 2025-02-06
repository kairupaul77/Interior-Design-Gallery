Backend README (Flask)
Interior Design Gallery - Backend
Description
The backend for the Interior Design Gallery is built using Flask, a lightweight Python web framework. It serves as the API that handles user authentication, product management, and other business logic for the frontend.

Project Structure
instance/: Contains configuration files (e.g., database configuration) and any instance-specific settings.
pauldatabase/: Database-related files for managing the app’s data.
migrations/: Contains migration scripts for the database schema.
static/images/: Stores static images (e.g., room designs, product images).
views/: Contains the main Flask views for routing and controller logic.
__init__.py: Initializes the Flask app and registers routes.
product.py: Contains routes related to products (e.g., retrieving product info, adding products).
routes.py: Defines other general application routes.
user.py: Defines routes for user authentication (e.g., login, signup).
app.py: The main entry point of the Flask app, where the app is initialized.
config.py: Configuration file for Flask settings, such as secret keys and database URLs.
models.py: Defines the database models for users, products, and other entities.
Dependencies
The following dependencies are required to run the backend:

Flask: The core web framework for the application.
Flask-SQLAlchemy: For interacting with the database using SQLAlchemy ORM.
Flask-Migrate: For handling database migrations.
Flask-Cors: To handle Cross-Origin Resource Sharing (CORS) for allowing the frontend to communicate with the backend.
Flask-JWT-Extended: For managing JSON Web Token (JWT) authentication.
Installation
1. Clone the repository
bash
Copy
git clone https://github.com/kairupaul77/Interior-Design-Gallery.git
cd interior-design-gallery-backend
2. Set up a Virtual Environment
It's recommended to use a virtual environment for isolating dependencies:

bash
Copy
python -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
3. Install the Dependencies
bash
Copy
pip install -r requirements.txt
4. Set Up the Database
Make sure you have your database set up. If you are using SQLite (default configuration), you can use the following command to set up your database:

bash
Copy
flask db init
flask db migrate
flask db upgrade
5. Run the Application
To run the backend, use:

bash
Copy
python app.py
The backend will now be running at http://localhost:5000.

API Endpoints
POST /users/signup: Create a new user.
POST /users/login: User login with email and password.
GET /products: Get all products.
GET /products/{id}: Get a specific product by ID.
POST /products: Add a new product (admin only).
Authentication
To authenticate users, the backend uses JWT tokens. When a user logs in successfully, they will receive a JWT token, which must be included in the Authorization header of subsequent requests that require authentication.

Example of request header with JWT:

bash
Copy
Authorization: Bearer <JWT_TOKEN>
Configuration
The backend configuration, including the database URL and secret keys, is defined in the config.py file.

Scripts
flask run: Starts the Flask development server.
flask db init: Initializes the migration folder.
flask db migrate: Creates a migration script for database changes.
flask db upgrade: Applies the migrations to the database.
