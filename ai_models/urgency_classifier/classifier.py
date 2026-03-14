import json
from ai_models.config import client

def classify_urgency(text):
    """Analyzes text to calculate an urgency score and priority level."""
    prompt = f"""
    You are an expert emergency triage AI. Analyze the medical text and determine urgency. 
    Return EXACTLY this JSON format:
    {{"urgency_level": "High" | "Medium" | "Low", "urgency_score": <integer 0-100>}}
    
    Text: {text}
    """
    try:
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            temperature=0.1,
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"Classifier Error: {e}")
        return {"urgency_level": "Unknown", "urgency_score": 0}