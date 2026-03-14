import os
from werkzeug.utils import secure_filename

def save_upload(audio_file, upload_folder):
    """Secures the filename and saves it to the specified folder."""
    filename = secure_filename(audio_file.filename)
    filepath = os.path.join(upload_folder, filename)
    audio_file.save(filepath)
    return filepath, filename