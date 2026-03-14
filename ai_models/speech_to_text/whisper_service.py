import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")


def transcribe_audio(audio_path: str) -> str:
    """
    Converts audio file into text using Whisper API
    """

    with open(audio_path, "rb") as audio_file:
        transcript = openai.Audio.transcribe(
            model="whisper-1",
            file=audio_file
        )

    return transcript["text"]