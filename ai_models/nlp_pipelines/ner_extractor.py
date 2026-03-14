import json
from ai_models.config import client

def extract_entities(text):
    """Extracts clinical entities and returns them as a parsed JSON dictionary."""
    prompt = f"""
    You are an AI clinical triage assistant. Extract medical entities from the text into this EXACT JSON format:
    {{"symptoms": ["list"], "timeline": ["list"], "risk_indicators": ["list"]}}
    
    Text: {text}
    """
    try:
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            temperature=0.1,
            response_format={"type": "json_object"} # Forces JSON output
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"NER Error: {e}")
        return {"symptoms": [], "timeline": [], "risk_indicators": []}