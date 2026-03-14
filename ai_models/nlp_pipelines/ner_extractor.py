import json
from ai_models.config import client

def extract_entities(text):
    """Extracts clinical entities and returns them as a strictly parsed JSON dictionary."""
    
    # 1. Fast fail: Don't waste an API call if the text is empty
    if not text or len(text.strip()) < 5:
        return {"symptoms": [], "timeline": [], "risk_indicators": []}

    # 2. Separation of System and User prompts for better LLM instruction adherence
    system_prompt = """
    You are an expert AI clinical triage assistant. 
    Your job is to perform Named Entity Recognition (NER) on medical text.
    You must extract medical entities and strictly output valid JSON matching this exact schema:
    {
        "symptoms": ["list of strings"], 
        "timeline": ["list of strings representing time or duration"], 
        "risk_indicators": ["list of strings representing critical risks or comorbidities"]
    }
    If an entity type is not found, return an empty list [] for that key. Do not invent information.
    """
    
    user_prompt = f"Patient Text:\n{text}"

    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.1, # Keep this very low for deterministic, factual extraction
            response_format={"type": "json_object"} # Forces JSON output
        )
        
        # Parse the raw string into a Python dictionary
        raw_content = response.choices[0].message.content
        result = json.loads(raw_content)
        
        # 3. Defensive Validation: Guarantee every key is an actual List
        # This absolutely ensures your React frontend .map() functions never crash!
        validated_result = {
            "symptoms": result.get("symptoms", []) if isinstance(result.get("symptoms"), list) else [],
            "timeline": result.get("timeline", []) if isinstance(result.get("timeline"), list) else [],
            "risk_indicators": result.get("risk_indicators", []) if isinstance(result.get("risk_indicators"), list) else []
        }
        
        return validated_result

    except Exception as e:
        print(f"[AI Model Error] NER Extraction failed: {e}")
        # Safe fallback for the frontend
        return {"symptoms": [], "timeline": [], "risk_indicators": []}