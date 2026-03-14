from ai_models.urgency_classifier.classifier import classify_urgency


def test_classifier():

    text = "Severe chest pain and shortness of breath"

    urgency = classify_urgency(text)

    print("\nUrgency Level:")
    print(urgency)


if __name__ == "__main__":
    test_classifier()