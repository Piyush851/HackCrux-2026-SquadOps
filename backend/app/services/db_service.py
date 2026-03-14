import os
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, PyMongoError
from datetime import datetime

# Global client to reuse the connection pool efficiently
client = None

def get_db():
    global client
    if client is None:
        uri = os.getenv("MONGO_URI")
        if not uri:
            raise ValueError("🚨 MONGO_URI is missing from your .env file!")
        
        try:
            # We add a 5-second timeout. If it can't connect, it fails fast instead of hanging forever!
            client = MongoClient(uri, serverSelectionTimeoutMS=5000)
            # Send a ping to confirm a successful connection
            client.admin.command('ping')
            print("✅ Successfully connected to MongoDB Atlas!")
        except ServerSelectionTimeoutError as err:
            print(f"🚨 MongoDB Connection Failed! Check your IP whitelist on Atlas and your Wi-Fi: {err}")
            raise
    
    return client.triage_system

def save_patient_record(analysis_result):
    """Saves the AI analysis to MongoDB safely."""
    try:
        db = get_db()
        
        record = {
            "urgency_level": analysis_result.get("urgency_level", "Unknown"),
            "urgency_score": analysis_result.get("urgency_score", 0),
            "structured_summary": analysis_result.get("structured_summary", "No summary provided."),
            "extracted_entities": analysis_result.get("extracted_entities", {}),
            "created_at": datetime.utcnow()
        }
        
        db.patients.insert_one(record)
        return True
    except PyMongoError as e:
        print(f"🚨 Failed to save patient record to MongoDB: {e}")
        return False # Fail gracefully without crashing the upload route

def get_all_patients(limit=50):
    """Fetches the most recent patients, capped by a limit to prevent frontend lag."""
    try:
        db = get_db()
        
        # We limit the fetch to the most recent 50 patients. 
        # This keeps the Dashboard incredibly fast even if the database has 10,000 records.
        patients = list(db.patients.find({}, {"_id": 0}).sort("created_at", -1).limit(limit))
        return patients
    except PyMongoError as e:
        print(f"🚨 Failed to fetch patients from MongoDB: {e}")
        return [] # Return an empty list so the React UI doesn't break

def save_patient_record(analysis_result):
    """Saves the AI analysis to MongoDB safely."""
    try:
        db = get_db()
        
        record = {
            "urgency_level": analysis_result.get("urgency_level", "Unknown"),
            "urgency_score": analysis_result.get("urgency_score", 0),
            "structured_summary": analysis_result.get("structured_summary", "No summary provided."),
            "extracted_entities": analysis_result.get("extracted_entities", {}),
            "created_at": datetime.utcnow()
        }
        
        # Force the insert and print a confirmation to the terminal
        result = db.patients.insert_one(record)
        print(f"✅ Patient successfully saved to MongoDB! Document ID: {result.inserted_id}")
        return True
        
    except Exception as e:
        print(f"🚨 CRITICAL DB ERROR: Failed to save patient record: {e}")
        return False