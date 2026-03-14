from ai_models.speech_to_text.whisper_service import transcribe_audio
from ai_models.nlp_pipelines.ner_extractor import extract_entities
from ai_models.nlp_pipelines.summarizer import summarize_text
from ai_models.urgency_classifier.classifier import classify_urgency


def process_text_input(text: str) -> dict:
    """
    Process patient text input through the AI pipeline
    """

    entities = extract_entities(text)

    summary = summarize_text(text)

    urgency = classify_urgency(text)

    return {
        "original_text": text,
        "summary": summary,
        "entities": entities,
        "urgency_level": urgency
    }


def process_audio_input(audio_path: str) -> dict:
    """
    Process patient audio input
    """

    transcript = transcribe_audio(audio_path)

    result = process_text_input(transcript)

    result["audio_transcript"] = transcript

    return result