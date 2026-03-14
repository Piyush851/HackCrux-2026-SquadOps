import os
from werkzeug.utils import secure_filename
from pypdf import PdfReader # New import for reading PDFs

def save_upload(file_obj, upload_folder):
    """Secures the filename and saves it to the specified folder."""
    filename = secure_filename(file_obj.filename)
    filepath = os.path.join(upload_folder, filename)
    file_obj.save(filepath)
    return filepath, filename

def extract_text_from_pdf(filepath):
    """Reads a PDF file and extracts all available text."""
    text = ""
    try:
        reader = PdfReader(filepath)
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text.strip()
    except Exception as e:
        print(f"PDF Extraction Error: {e}")
        return None