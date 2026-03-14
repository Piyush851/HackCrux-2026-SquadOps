import spacy

# Load biomedical model
nlp = spacy.load("en_core_sci_sm")


def extract_entities(text: str) -> dict:
    """
    Extract medical entities from patient text
    """

    doc = nlp(text)

    symptoms = []
    conditions = []

    for ent in doc.ents:

        label = ent.label_.lower()

        if "symptom" in label or "disease" in label:
            symptoms.append(ent.text)

        else:
            conditions.append(ent.text)

    return {
        "symptoms": list(set(symptoms)),
        "conditions": list(set(conditions))
    }