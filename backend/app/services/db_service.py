import os
from pymongo import MongoClient
from datetime import datetime

# Global client to reuse the connection
client = None

def get_db():
    global client
    if client is None:
        uri = os.getenv("MONGO_URI")
        if not uri:
            raise ValueError("MONGO_URI is missing from your .env file!")
        client = MongoClient(uri)
    
    # We will name our database 'triage_system'
    return client.triage_system

def save_patient_record(analysis_result):
    """Saves the AI analysis to MongoDB with a timestamp."""
    db = get_db()
    
    # Structure the document
    record = {
        "urgency_level": analysis_result.get("urgency_level", "Unknown"),
        "urgency_score": analysis_result.get("urgency_score", 0),
        "structured_summary": analysis_result.get("structured_summary", ""),
        "extracted_entities": analysis_result.get("extracted_entities", {}),
        "created_at": datetime.utcnow()
    }
    
    db.patients.insert_one(record)
    return True

def get_all_patients():
    """Fetches all patients, sorted by newest first."""
    db = get_db()
    
    # We use {"_id": 0} to exclude the MongoDB ObjectId, 
    # because Flask's jsonify doesn't know how to serialize it by default.
    # We sort by 'created_at' -1 to get the newest patients at the top of the queue.
    patients = list(db.patients.find({}, {"_id": 0}).sort("created_at", -1))
    return patients