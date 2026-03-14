import os
from ai_models.config import client

# Whisper's supported audio formats
ALLOWED_EXTENSIONS = {'.mp3', '.mp4', '.mpeg', '.mpga', '.m4a', '.wav', '.webm'}
# Max file size in MB (Groq API limit is typically 25MB for audio)
MAX_FILE_SIZE_MB = 25 

def transcribe_audio(filepath, filename):
    """Passes an audio file to Whisper with strict validation and error handling."""
    
    # 1. Defensive Validation: Check if the file actually exists on the disk
    if not os.path.exists(filepath):
        print(f"[Audio Error] File not found at path: {filepath}")
        return "Error transcribing audio: File not found."

    # 2. Defensive Validation: Check file extension
    _, ext = os.path.splitext(filename.lower())
    if ext not in ALLOWED_EXTENSIONS:
        print(f"[Audio Error] Unsupported file format: {ext}")
        return f"Error transcribing audio: Unsupported format {ext}. Please use MP3, WAV, etc."

    # 3. Defensive Validation: Check file size to prevent API rejection
    file_size_mb = os.path.getsize(filepath) / (1024 * 1024)
    if file_size_mb > MAX_FILE_SIZE_MB:
        print(f"[Audio Error] File too large: {file_size_mb:.2f}MB")
        return f"Error transcribing audio: File size exceeds the {MAX_FILE_SIZE_MB}MB limit."

    try:
        # 4. Safe File Handling and API Execution
        with open(filepath, "rb") as file_to_transcribe:
            transcription = client.audio.transcriptions.create(
                model="whisper-large-v3", 
                file=(filename, file_to_transcribe.read()),
                response_format="text" # explicitly request plain text back
            )
            
        # Clean up empty transcriptions
        result_text = transcription.strip() if isinstance(transcription, str) else transcription.text.strip()
        
        if not result_text:
            return "Error transcribing audio: Audio was empty or unintelligible."
            
        return result_text

    except Exception as e:
        print(f"[AI Model Error] Whisper Transcription failed: {e}")
        return f"Error transcribing audio: {str(e)}"