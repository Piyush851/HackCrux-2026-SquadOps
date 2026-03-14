from ai_models.config import client

def transcribe_audio(filepath, filename):
    """Passes an audio file to Whisper for highly accurate transcription."""
    try:
        with open(filepath, "rb") as file_to_transcribe:
            transcription = client.audio.transcriptions.create(
                model="whisper-large-v3", 
                file=(filename, file_to_transcribe.read()) 
            )
        return transcription.text
    except Exception as e:
        print(f"Whisper Transcription Error: {e}")
        return f"Error transcribing audio: {str(e)}"