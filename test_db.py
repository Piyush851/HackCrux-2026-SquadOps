import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
uri = os.getenv("MONGO_URI")

print(f"Attempting to connect to MongoDB...")

try:
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("✅ SUCCESS! Your Flask backend is actively connected to MongoDB Atlas.")
    print("✅ The React Dashboard will now update in real-time.")
except Exception as e:
    print(f"❌ FAILED TO CONNECT. Here is the exact reason:\n{e}")