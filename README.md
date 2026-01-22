import os
import psycopg2

# Replit Secrets سے یو آر ایل حاصل کرنا
db_url = os.environ['DATABASE_URL']

try:
    # ڈیٹا بیس سے رابطہ
    conn = psycopg2.connect(db_url)
    print("ڈیٹا بیس سے کنکشن کامیاب رہا!")
    
    # یہاں آپ اپنا کام کر سکتے ہیں...
    
    conn.close()
except Exception as e:
    print(f"کنکشن میں خرابی: {e}")

