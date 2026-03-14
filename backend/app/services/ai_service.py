import os
import json
from groq import Groq

# The client will automatically pick up GROQ_API_KEY from your .env
client = Groq() 

def analyze_medical_text(text):
    """Passes text to LLaMA 3.3 to extract structured clinical data."""
    system_prompt = """
    You are an expert AI clinical triage assistant. 
    Analyze the provided medical text and extract the information into the EXACT JSON format below.
    Respond ONLY with valid JSON, no markdown, no conversational text.
    
    {
        "urgency_level": "High" | "Medium" | "Low",
        "urgency_score": <integer between 0 and 100>,
        "structured_summary": "<A clear, concise, professional 1-2 sentence medical summary>",
        "extracted_entities": {
            "symptoms": ["<list of symptoms>"],
            "timeline": ["<list of time references>"],
            "risk_indicators": ["<list of critical risk factors>"]
        }
    }
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": text}
            ],
            model="llama-3.3-70b-versatile", 
            temperature=0.2, 
            response_format={"type": "json_object"} 
        )
        return json.loads(chat_completion.choices[0].message.content)
        
    except Exception as e:
        print(f"LLM Error: {e}")
        return {
            "urgency_level": "Unknown",
            "urgency_score": 0,
            "structured_summary": "Error generating summary.",
            "extracted_entities": {"symptoms": [], "timeline": [], "risk_indicators": []}
        }

def transcribe_audio(filepath, filename):
    """Passes the saved audio file to Whisper for transcription."""
    with open(filepath, "rb") as file_to_transcribe:
        transcription = client.audio.transcriptions.create(
            model="whisper-large-v3", 
            file=(filename, file_to_transcribe.read()) 
        )
    return transcription.text