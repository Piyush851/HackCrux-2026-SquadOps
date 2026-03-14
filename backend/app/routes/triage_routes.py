from flask import Blueprint, request, jsonify, current_app
from app.services.ai_service import analyze_medical_text, transcribe_audio
from app.services.file_service import save_upload

# Create a Blueprint for triage routes
triage_bp = Blueprint('triage', __name__)

@triage_bp.route('/text', methods=['POST'])
def process_text():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided in the request body"}), 400
        
    raw_text = data['text']
    analysis_result = analyze_medical_text(raw_text)
    
    return jsonify({
        "status": "success",
        "original_text": raw_text,
        "analysis": analysis_result
    }), 200

@triage_bp.route('/audio', methods=['POST'])
def process_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['file']
    if audio_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if audio_file:
        try:
            # 1. Save the file
            filepath, filename = save_upload(audio_file, current_app.config['UPLOAD_FOLDER'])
            
            # 2. Transcribe the audio
            transcribed_text = transcribe_audio(filepath, filename)
            
            # 3. Analyze the text
            analysis_result = analyze_medical_text(transcribed_text)
            
            return jsonify({
                "status": "success",
                "message": "Audio transcribed and analyzed successfully!",
                "original_text": transcribed_text,
                "analysis": analysis_result
            }), 200

        except Exception as e:
            return jsonify({"error": f"Failed to process audio: {str(e)}"}), 500