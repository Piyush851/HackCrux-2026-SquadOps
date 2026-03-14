from ai_models.speech_to_text.whisper_service import transcribe_audio
from ai_models.nlp_pipelines.summarizer import generate_summary
from ai_models.nlp_pipelines.ner_extractor import extract_entities
from ai_models.urgency_classifier.classifier import classify_urgency

def process_text_pipeline(text):
    """Runs raw text through the complete array of AI models."""
    
    # In a production app, you might run these asynchronously to save time,
    # but for a hackathon, sequential execution is perfectly stable.
    summary = generate_summary(text)
    entities = extract_entities(text)
    urgency = classify_urgency(text)
    
    return {
        "urgency_level": urgency.get("urgency_level", "Unknown"),
        "urgency_score": urgency.get("urgency_score", 0),
        "structured_summary": summary,
        "extracted_entities": entities
    }

def process_audio_pipeline(filepath, filename):
    """Transcribes audio, then runs the text through the pipeline."""
    
    transcribed_text = transcribe_audio(filepath, filename)
    
    # If transcription fails, don't try to process the error message through NLP
    if transcribed_text.startswith("Error"):
        return transcribed_text, None 
        
    analysis_result = process_text_pipeline(transcribed_text)
    
    return transcribed_text, analysis_result