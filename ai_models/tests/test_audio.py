from ai_models.pipeline import process_audio_input


def test_audio():

    result = process_audio_input("sample_audio.wav")

    print("\nAudio Pipeline Result:")
    print(result)


if __name__ == "__main__":
    test_audio()