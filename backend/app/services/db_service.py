import os
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

client = None

def get_db():
    global client
    if client is None:
        uri = os.getenv("MONGO_URI")
        client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    return client.triage_system

def save_patient_record(analysis_result):
    """Saves the cleaned AI dictionary to MongoDB safely."""
    try:
        db = get_db()
        
        # We now trust that analysis_result is a pure Python dictionary
        record = {
            "urgency_level": analysis_result.get("urgency_level", "Unknown"),
            "urgency_score": analysis_result.get("urgency_score", 0),
            "structured_summary": analysis_result.get("structured_summary", "No summary provided."),
            "extracted_entities": analysis_result.get("extracted_entities", {}),
            "created_at": datetime.utcnow(),
            "status": "Waiting"
        }
        
        db.patients.insert_one(record)
        return True
    except Exception as e:
        print(f"🚨 DB ERROR: Failed to save patient record: {e}")
        return False

def get_all_patients(limit=50):
    """Fetches patients and serializes the ID for React."""
    try:
        db = get_db()
        cursor = db.patients.find().sort("created_at", -1).limit(limit)
        
        patients = []
        for doc in cursor:
            doc['id'] = str(doc['_id'])
            del doc['_id']
            patients.append(doc)
            
        return patients
    except Exception as e:
        print(f"🚨 Fetch ERROR: {e}")
        return []

def update_patient_status(patient_id, new_status):
    """Safely updates patient status."""
    try:
        db = get_db()
        result = db.patients.update_one(
            {"_id": ObjectId(patient_id)},
            {"$set": {"status": new_status}}
        )
        return result.matched_count > 0
    except Exception as e:
        print(f"🚨 MongoDB Update Error: {e}")
        return False