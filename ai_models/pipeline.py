import concurrent.futures
from ai_models.speech_to_text.whisper_service import transcribe_audio
from ai_models.nlp_pipelines.summarizer import generate_summary
from ai_models.nlp_pipelines.ner_extractor import extract_entities
from ai_models.urgency_classifier.classifier import classify_urgency

def process_text_pipeline(text):
    """Runs raw text through the complete array of AI models concurrently for maximum speed."""
    
    # 1. Fast fail: Prevent the pipeline from running on empty data
    if not text or len(text.strip()) < 5:
        return {
            "urgency_level": "Unknown",
            "urgency_score": 0,
            "structured_summary": "No text provided for analysis.",
            "extracted_entities": {"symptoms": [], "timeline": [], "risk_indicators": []}
        }

    try:
        # 2. Parallel AI Execution! 
        # This fires all 3 requests to Groq simultaneously instead of waiting in line.
        with concurrent.futures.ThreadPoolExecutor() as executor:
            # Submit all tasks to the thread pool
            future_summary = executor.submit(generate_summary, text)
            future_entities = executor.submit(extract_entities, text)
            future_urgency = executor.submit(classify_urgency, text)
            
            # Wait for all of them to finish and grab their results
            summary = future_summary.result()
            entities = future_entities.result()
            urgency = future_urgency.result()
            
        # 3. Assemble the final master JSON object for the frontend
        return {
            "urgency_level": urgency.get("urgency_level", "Unknown"),
            "urgency_score": urgency.get("urgency_score", 0),
            "structured_summary": summary,
            "extracted_entities": entities
        }
        
    except Exception as e:
        print(f"[Master Pipeline Error] Parallel execution failed: {e}")
        # Safe fallback so the server never crashes
        return {
            "urgency_level": "Unknown",
            "urgency_score": 0,
            "structured_summary": "Error running the AI analysis pipeline.",
            "extracted_entities": {"symptoms": [], "timeline": [], "risk_indicators": []}
        }


def process_audio_pipeline(filepath, filename):
    """Transcribes audio, then passes the text to the parallel AI pipeline."""
    
    # 1. Wait for Whisper to finish transcribing (this must be sequential)
    transcribed_text = transcribe_audio(filepath, filename)
    
    # 2. Check the contract: Did Whisper fail? 
    # If yes, return the error to the Flask route immediately.
    if transcribed_text.startswith("Error"):
        return transcribed_text, None 
        
    # 3. Fire the parallel text analysis!
    analysis_result = process_text_pipeline(transcribed_text)
    
    return transcribed_text, analysis_result