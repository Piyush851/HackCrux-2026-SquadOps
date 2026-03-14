from ai_models.config import client

def generate_summary(text):
    """Generates a strictly formatted 1-2 sentence clinical summary from raw text."""
    
    # 1. Fast fail: Prevent API calls for empty or uselessly short inputs
    if not text or len(text.strip()) < 10:
        return "Insufficient information provided to generate a clinical summary."

    # 2. Strict System Prompt to eliminate conversational filler
    system_prompt = """
    You are an expert clinical triage assistant.
    Your sole task is to synthesize the provided patient text into a clear, professional 1-2 sentence medical summary.
    
    CRITICAL RULES:
    - Do not use markdown formatting (no bolding, italics, or bullet points).
    - Do not include conversational filler (e.g., do NOT start with "Here is the summary" or "The patient reports").
    - Jump straight into the clinical facts.
    - Output ONLY the final summary text.
    """
    
    user_prompt = f"Patient Text:\n{text}"

    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.2 # Low temperature keeps it highly factual and grounded
        )
        
        # 3. Output Sanitization
        summary = response.choices[0].message.content.strip()
        
        # Strip leading/trailing quotes if the AI accidentally wraps the response in them
        if summary.startswith('"') and summary.endswith('"'):
            summary = summary[1:-1]
            
        return summary
        
    except Exception as e:
        print(f"[AI Model Error] Summarization failed: {e}")
        # Return a safe fallback string that looks clean on the React frontend
        return "Clinical summary could not be generated due to an AI processing error."