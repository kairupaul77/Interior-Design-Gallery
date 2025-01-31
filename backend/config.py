from datetime import timedelta

class Config:
    # Your database URI (you can change it based on your setup)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///pauldatabase.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-secret-key-here'
    
    # JWT settings
    JWT_SECRET_KEY = 'your-jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)  # Set expiration time for access tokens (1 hour)

