from config import supabase_client
from typing import BinaryIO
import mimetypes

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}

def save_file_image_to_storage(filename: str, file: BinaryIO, bucket: str) -> str:
    """
    Save an image file to Supabase storage and return the public URL.
    Only allows image files based on MIME type.
    """
    try:
        # Detect MIME type
        content_type, _ = mimetypes.guess_type(filename)
        
        # Validate content type
        if content_type is None or not content_type.startswith("image/") or content_type not in ALLOWED_IMAGE_TYPES:
            raise ValueError(f"Unsupported image format: {content_type}")

        # Upload the file to Supabase storage
        response = supabase_client.storage.from_(bucket).upload(
            filename,
            file,
            file_options={"contentType": content_type}
        )

        options = {
            "transform": {
                "format": "avif",        # o "origin"
                "height": 200,           # redimensionar a 200 px de alto
                "quality": 70            # ajustar calidad
            }
        }

        # Get the public URL
        public_url = supabase_client.storage.from_(bucket).get_public_url(filename, options=options)
        if isinstance(public_url, dict):
            return public_url.get('publicURL') or public_url.get('publicUrl') or public_url.get('url')
        return public_url

    except Exception as e:
        raise Exception(f"Error saving image to storage: {str(e)}")
    

