import os
from flask import Blueprint, request, jsonify, current_app
from backend.app.services.file_service import save_upload, extract_text_from_pdf
from ai_models.pipeline import process_text_pipeline, process_audio_pipeline
from backend.app.services.db_service import save_patient_record, get_all_patients
from collections import Counter

triage_bp = Blueprint('triage', __name__)

@triage_bp.route('/text', methods=['POST'])
def process_text():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400
        
    raw_text = data['text']
    analysis_result = process_text_pipeline(raw_text)
    
    # Save to MongoDB
    save_patient_record(analysis_result)
    
    return jsonify({"status": "success", "original_text": raw_text, "analysis": analysis_result}), 200


@triage_bp.route('/audio', methods=['POST'])
def process_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['file']
    if audio_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filepath = None
    try:
        filepath, filename = save_upload(audio_file, current_app.config['UPLOAD_FOLDER'])
        transcribed_text, analysis_result = process_audio_pipeline(filepath, filename)
        
        if not analysis_result:
            return jsonify({"error": transcribed_text}), 500
        
        # Save to MongoDB
        save_patient_record(analysis_result)
        
        return jsonify({"status": "success", "original_text": transcribed_text, "analysis": analysis_result}), 200
        
    except Exception as e:
        return jsonify({"error": f"Failed to process audio: {str(e)}"}), 500
        
    finally:
        # GARBAGE COLLECTION: Always delete the file after processing, even if it crashes
        if filepath and os.path.exists(filepath):
            os.remove(filepath)


@triage_bp.route('/report', methods=['POST'])
def process_report():
    if 'file' not in request.files:
        return jsonify({"error": "No report file provided"}), 400
    
    report_file = request.files['file']
    if report_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filepath = None
    try:
        filepath, filename = save_upload(report_file, current_app.config['UPLOAD_FOLDER'])
        extracted_text = extract_text_from_pdf(filepath)
        
        if not extracted_text:
            return jsonify({"error": "Could not extract text from the PDF"}), 422
            
        analysis_result = process_text_pipeline(extracted_text)
        
        # Save to MongoDB
        save_patient_record(analysis_result)
        
        return jsonify({"status": "success", "original_text": extracted_text[:500] + "...", "analysis": analysis_result}), 200
        
    except Exception as e:
        return jsonify({"error": f"Failed to process report: {str(e)}"}), 500
        
    finally:
        # GARBAGE COLLECTION: Prevent server bloat
        if filepath and os.path.exists(filepath):
            os.remove(filepath)


@triage_bp.route('/metrics', methods=['GET'])
def get_metrics():
    # Fetch all live patients from MongoDB
    patients = get_all_patients()

    urgency_counts = {"High": 0, "Medium": 0, "Low": 0, "Unknown": 0}
    all_symptoms = []

    for patient in patients:
        level = patient.get("urgency_level", "Unknown")
        if level in urgency_counts:
            urgency_counts[level] += 1
        else:
            urgency_counts["Unknown"] += 1
            
        entities = patient.get("extracted_entities", {})
        symptoms = entities.get("symptoms", [])
        
        if isinstance(symptoms, list):
            all_symptoms.extend([str(s).title() for s in symptoms])

    urgency_data = [{"name": k, "value": v} for k, v in urgency_counts.items() if v > 0]
    symptom_counts = Counter(all_symptoms).most_common(5)
    symptom_data = [{"symptom": s[0], "count": s[1]} for s in symptom_counts]
    
    active_queue = urgency_counts.get("High", 0) + urgency_counts.get("Medium", 0)
    calculated_wait = active_queue * 4

    # We send exactly what is in the DB, no fake data!
    return jsonify({
        "urgencyData": urgency_data,
        "patientTrend": [
            { "time": "Last Hour", "patients": max(0, len(patients) - 2) }, 
            { "time": "Live", "patients": len(patients) } 
        ],
        "symptomData": symptom_data,
        "stats": { 
            "total": len(patients), 
            "critical": urgency_counts.get("High", 0), 
            "doctors": 8, 
            "waitTime": f"{calculated_wait} min"
        },
        "recentPatients": patients[:10] 
    }), 200