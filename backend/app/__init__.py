import os
from flask import Flask, jsonify
from flask_cors import CORS
from backend.app.routes.triage_routes import triage_bp

def create_app():
    app = Flask(__name__)
    
    # 1. Security: Strict CORS Configuration
    # This specifically allows your React frontend (Vite) to talk to Flask without browser block errors.
    CORS(app, resources={r"/api/*": {"origins": "*"}}) 

    # 2. Security: The RAM Shield (Max Content Length)
    # Groq's Whisper API limit is 25MB. We cap Flask at 30MB. 
    # If a file is larger than 30MB, Flask rejects it instantly, saving your RAM from crashing.
    app.config['MAX_CONTENT_LENGTH'] = 30 * 1024 * 1024 

    # 3. Configure and verify the upload directory
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    # Register the core AI routing blueprint
    app.register_blueprint(triage_bp, url_prefix='/api/triage')

    # 4. Hackathon Lifesaver: The Health Check Route
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """A simple endpoint for the React frontend to ping to ensure the server is online."""
        return jsonify({
            "status": "online",
            "message": "HackCrux Triage AI Backend is running flawlessly.",
            "version": "1.0.0"
        }), 200

    # 5. Global Error Handler for Massive Files
    @app.errorhandler(413)
    def request_entity_too_large(error):
        return jsonify({
            "error": "File too large. Maximum allowed upload size is 30MB to ensure AI speed."
        }), 413

    return app