from ai_models.config import model


def classify_urgency(text: str) -> str:
    """
    Classify urgency level of patient complaint
    """

    prompt = f"""
    You are a medical triage assistant.

    Classify the urgency level of this patient complaint.

    Complaint:
    {text}

    Categories:
    LOW
    MEDIUM
    HIGH
    CRITICAL

    Return only the category.
    """

    response = model.generate_content(prompt)

    return response.text.strip().upper()