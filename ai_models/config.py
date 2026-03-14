import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables (ensure your .env file is in the root directory)
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("Missing GROQ_API_KEY in environment variables.")

# Initialize a globally accessible client
client = Groq(api_key=GROQ_API_KEY)