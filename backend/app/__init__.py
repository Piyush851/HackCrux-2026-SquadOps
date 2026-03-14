import os
from flask import Flask
from flask_cors import CORS
from backend.app.routes.triage_routes import triage_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configure upload folder
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    # Register the routes. 
    # The prefix means the route in triage_routes.py '/audio' becomes '/api/triage/audio'
    app.register_blueprint(triage_bp, url_prefix='/api/triage')

    return app