from ai_models.nlp_pipelines.ner_extractor import extract_entities


def test_ner():

    text = "I have severe chest pain and fever for two days"

    result = extract_entities(text)

    print("\nNER Result:")
    print(result)


if __name__ == "__main__":
    test_ner()