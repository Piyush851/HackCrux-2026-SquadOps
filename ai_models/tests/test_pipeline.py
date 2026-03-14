from ai_models.pipeline import process_text_input


def test_pipeline():

    text = "I have chest pain and breathing issues since yesterday"

    result = process_text_input(text)

    print("\nPipeline Result:")
    print(result)


if __name__ == "__main__":
    test_pipeline()