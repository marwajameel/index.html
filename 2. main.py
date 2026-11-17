import os
from dotenv import load_dotenv

# .env فائل کو لوڈ کرنا
load_dotenv()

# API Key کو ویری ایبل میں لینا
conduit_key = os.getenv("CONDUIT_API_KEY")

print("API Key کامیابی سے لوڈ ہو گئی ہے!")
