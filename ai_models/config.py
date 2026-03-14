import os
import google.generativeai as genai

# Load API keys
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Gemini model instance
model = genai.GenerativeModel("gemini-1.5-flash")