from ai_models.nlp_pipelines.summarizer import summarize_text


def test_summary():

    text = "I have been feeling chest pain and breathing difficulty since yesterday."

    summary = summarize_text(text)

    print("\nSummary:")
    print(summary)


if __name__ == "__main__":
    test_summary()