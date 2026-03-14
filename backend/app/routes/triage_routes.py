from flask import Blueprint, request, jsonify, current_app
from backend.app.services.file_service import save_upload, extract_text_from_pdf
from ai_models.pipeline import process_text_pipeline, process_audio_pipeline

# --- NEW: Import your modular AI master pipelines! ---
from ai_models.pipeline import process_text_pipeline, process_audio_pipeline

triage_bp = Blueprint('triage', __name__)

@triage_bp.route('/text', methods=['POST'])
def process_text():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided in the request body"}), 400

    raw_text = data['text']

    # 1. Pass the text directly to your AI master pipeline
    analysis_result = process_text_pipeline(raw_text)

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
            # 1. Save the file locally
            filepath, filename = save_upload(audio_file, current_app.config['UPLOAD_FOLDER'])

            # 2. Pass the file to your AI master pipeline (handles Whisper + LLaMA 3)
            transcribed_text, analysis_result = process_audio_pipeline(filepath, filename)

            # Catch transcription errors
            if not analysis_result:
                return jsonify({"error": transcribed_text}), 500

            return jsonify({
                "status": "success",
                "message": "Audio transcribed and analyzed via AI pipeline successfully!",
                "original_text": transcribed_text,
                "analysis": analysis_result
            }), 200

        except Exception as e:
            return jsonify({"error": f"Failed to process audio: {str(e)}"}), 500

@triage_bp.route('/report', methods=['POST'])
def process_report():
    if 'file' not in request.files:
        return jsonify({"error": "No report file provided"}), 400

    report_file = request.files['file']
    if report_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Ensure it's a PDF
    if not report_file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Only PDF reports are supported currently"}), 400

    if report_file:
        try:
            # 1. Save the PDF locally
            filepath, filename = save_upload(report_file, current_app.config['UPLOAD_FOLDER'])

            # 2. Extract text from the PDF
            extracted_text = extract_text_from_pdf(filepath)

            if not extracted_text:
                return jsonify({"error": "Could not extract text from the provided PDF. It might be a scanned image."}), 422

            # 3. Pass the extracted text to your existing AI master pipeline!
            analysis_result = process_text_pipeline(extracted_text)

            return jsonify({
                "status": "success",
                "message": "Diagnostic report analyzed successfully!",
                # We truncate the original text to 500 characters so we don't send a massive book back to the frontend
                "original_text": extracted_text[:500] + "... [TRUNCATED]",
                "analysis": analysis_result
            }), 200

        except Exception as e:
            return jsonify({"error": f"Failed to process report: {str(e)}"}), 500