from ai_models.config import client

def generate_summary(text):
    """Generates a 1-2 sentence medical summary from raw text."""
    prompt = f"""
    You are an expert clinical assistant. Provide a clear, professional 1-2 sentence 
    structured medical summary of the following patient text. No markdown, just the summary text.
    
    Text: {text}
    """
    try:
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            temperature=0.2 # Low temp for factual accuracy
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Summarizer Error: {e}")
        return "Error generating summary."