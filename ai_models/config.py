import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

# 1. Bulletproof Environment Loading
# Dynamically calculate the absolute path to the root 'triage-system' directory
# __file__ is config.py -> parent is ai_models -> parent is triage-system
current_dir = Path(__file__).resolve().parent
root_dir = current_dir.parent 
env_path = root_dir / '.env'

# Load the explicitly found .env file, or fallback to default if not found
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv() 

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# 2. Developer-Friendly Error Messaging
if not GROQ_API_KEY:
    error_msg = (
        "\n" + "="*60 + "\n"
        "🚨 CRITICAL ERROR: GROQ_API_KEY is missing! 🚨\n"
        f"The system looked for your .env file here: {env_path}\n"
        "Please ensure the file exists and contains:\n"
        "GROQ_API_KEY=gsk_your_actual_api_key_here\n"
        "="*60 + "\n"
    )
    print(error_msg)
    raise ValueError("Missing GROQ_API_KEY in environment variables.")

# 3. Robust Client Initialization
try:
    # We initialize the globally accessible client with safety nets for the live demo
    client = Groq(
        api_key=GROQ_API_KEY,
        max_retries=2, # Auto-retry instantly if the API drops a packet
        timeout=30.0   # Prevent the backend from hanging infinitely if the internet dies
    )
except Exception as e:
    print(f"Failed to initialize Groq client: {e}")
    raise