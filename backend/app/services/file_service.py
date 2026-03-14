import os
import uuid
from werkzeug.utils import secure_filename
from pypdf import PdfReader

def save_upload(file_obj, upload_folder):
    """Secures the filename, prevents collisions, and saves it safely."""
    
    # 1. Defensive: Ensure the upload directory actually exists!
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
        print(f"📁 Created missing upload directory at: {upload_folder}")

    # 2. Defensive: Prevent File Overwrites with UUIDs
    # secure_filename strips out spaces and weird characters
    original_filename = secure_filename(file_obj.filename)
    
    # Add a unique random string to the front of the filename so "report.pdf" becomes "a1b2c3d4_report.pdf"
    unique_filename = f"{uuid.uuid4().hex[:8]}_{original_filename}"
    
    filepath = os.path.join(upload_folder, unique_filename)
    file_obj.save(filepath)
    
    return filepath, unique_filename

def extract_text_from_pdf(filepath):
    """Reads a PDF file with strict error handling for scanned documents."""
    text = ""
    try:
        reader = PdfReader(filepath)
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        
        final_text = text.strip()
        
        # 3. Defensive: Catch PDFs that are just scanned images (no selectable text)
        if not final_text:
            print(f"⚠️ Warning: Extracted 0 characters from {filepath}. It might be a scanned image.")
            return None
            
        return final_text
        
    except Exception as e:
        print(f"🚨 PDF Extraction Error on {filepath}: {e}")
        return None