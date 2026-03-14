from ai_models.config import model


def summarize_text(text: str) -> str:
    """
    Summarize patient complaint into clinical note
    """

    prompt = f"""
    Convert the following patient complaint into a concise medical summary.

    Complaint:
    {text}

    Return only a short summary.
    """

    response = model.generate_content(prompt)

    return response.text.strip()