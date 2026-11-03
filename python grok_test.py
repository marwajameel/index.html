import os
from dotenv import load_dotenv
from openai import OpenAI

# .env فائل سے API Key لوڈ کریں
load_dotenv()

# xAI کلائنٹ کو سیٹ اپ کریں
client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1",  # xAI کا سرور ایڈریس
)

# AI کو میسج بھیجیں
response = client.chat.completions.create(
    model="grok-beta",  # xAI کا فعال ماڈل
    messages=[
        {
            "role": "system",
            "content": "آپ ایک مددگار اسسٹنٹ ہیں جو اردو میں جواب دیتا ہے۔",
        },
        {"role": "user", "content": "آرٹیفیشل انٹیلیجنس کیا ہے؟"},
    ],
    temperature=0.7,  # تخلیقی صلاحیت کی حد
    max_tokens=500,  # جواب کی زیادہ سے زیادہ لمبائی
)

# سرور سے آنے والا جواب پرنٹ کریں
print(response.choices[0].message.content)
