import json
from ai_models.config import client

def classify_urgency(text):
    """Analyzes text to calculate a strictly validated urgency score and priority level."""
    
    # 1. Fast fail: Prevent API calls for empty inputs
    if not text or len(text.strip()) < 5:
        return {"urgency_level": "Unknown", "urgency_score": 0}

    # 2. Strict System Prompt with explicit clinical grading criteria
    system_prompt = """
    You are an expert emergency triage AI. Your job is to analyze medical text and assign an urgency score and level.
    
    Grading Criteria:
    - High (70-100): Life-threatening, severe pain, active bleeding, cardiac/stroke symptoms, respiratory distress.
    - Medium (40-69): Urgent but stable, moderate pain, infections, simple fractures, requires care within hours.
    - Low (0-39): Routine, minor injuries, mild symptoms, chronic issues without acute exacerbation.
    
    Return EXACTLY this JSON format and nothing else:
    {
        "urgency_level": "High" | "Medium" | "Low",
        "urgency_score": <integer between 0 and 100>
    }
    """
    
    user_prompt = f"Patient Text:\n{text}"

    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.1, # Keep this very low so the AI doesn't get "creative" with scores
            response_format={"type": "json_object"}
        )
        
        result = json.loads(response.choices[0].message.content)
        
        # 3. Defensive Validation: Sanitize the output to protect the React frontend
        
        # Ensure the score is a valid integer between 0 and 100
        try:
            raw_score = result.get("urgency_score", 0)
            # If AI returns a string like "85", int() fixes it.
            score = int(raw_score) 
            score = max(0, min(100, score)) # Mathematically clamp it between 0 and 100
        except (ValueError, TypeError):
            score = 0

        # Ensure the level is exactly one of the three accepted strings
        valid_levels = ["High", "Medium", "Low"]
        level = str(result.get("urgency_level", "Unknown")).capitalize()
        
        if level not in valid_levels:
            # Fallback logic: If the AI hallucinates the level, infer it from the numeric score!
            if score >= 70: level = "High"
            elif score >= 40: level = "Medium"
            elif score > 0: level = "Low"
            else: level = "Unknown"
            
        return {
            "urgency_level": level,
            "urgency_score": score
        }

    except Exception as e:
        print(f"[AI Model Error] Urgency Classification failed: {e}")
        return {"urgency_level": "Unknown", "urgency_score": 0}