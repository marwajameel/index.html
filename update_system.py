import os
from dotenv import load_dotenv
from openai import OpenAI

# .env فائل سے ماحول کی متغیرات (Environment Variables) لوڈ کریں
load_dotenv()

# ==========================================
# 1. نظام کی مرکزی کنفیگریشن (System Configuration)
# ==========================================
SYSTEM_CONFIG = {
    "network": "Solana (SOL)",
    "target_wallet_address": "EZ9edpEqWL6KCBg6rRNXMU9mHkFLZ4852tgdSfQSHm6",
    "gas_fee_standard": 0.00037,  # SOL میں معیاری گیس فیس
    "min_withdrawal": 0.0015,  # کم از کم ودڈرا کی حد
    "portfolio_name": "My Kalyal Portfolio",
}


# ==========================================
# 2. xAI / Grok کلائنٹ کا سیٹ اپ
# ==========================================
def initialize_ai_client():
  api_key = os.getenv("XAI_API_KEY")
  if not api_key:
    print(
        "انتباہ: XAI_API_KEY ماحول کی متغیرات (Environment Variables) میں نہیں"
        " ملی۔"
    )
    return None

  client = OpenAI(
      api_key=api_key,
      base_url="https://api.x.ai/v1",  # xAI کا سرور ایڈریس
  )
  return client


# ==========================================
# 3. سسٹم اسٹیٹس اور ایڈریس کی توثیق
# ==========================================
def verify_system_status():
  print("--- ایس ڈی این نیوز اور بلاک چین سسٹم کی تازہ کاری ---")
  print(f"نیٹ ورک: {SYSTEM_CONFIG['network']}")
  print(f"مقررہ ہدف والٹ ایڈریس: {SYSTEM_CONFIG['target_wallet_address']}")
  print(f"معیاری گیس فیس: {SYSTEM_CONFIG['gas_fee_standard']} SOL")
  print("--------------------------------------------------")


# ==========================================
# 4. مین ایگزیکیوشن (Main Execution)
# ==========================================
if __name__ == "__main__":
  verify_system_status()

  ai_client = initialize_ai_client()
  if ai_client:
    try:
      response = ai_client.chat.completions.create(
          model="grok-beta",
          messages=[
              {
                  "role": "system",
                  (
                      "content": "آپ ایک مددگار اسسٹنٹ ہیں جو اردو میں جواب"
                      " دیتا ہے۔"
                  ),
              },
              {
                  "role": "user",
                  (
                      "content": "ہمارا سولانا سسٹم کامیابی سے اپڈیٹ ہو چکا"
                      " ہے، اس کی تصدیق کریں۔"
                  ),
              },
          ],
          temperature=0.7,
          max_tokens=200,
      )
      print("\n--- AI کا جواب ---")
      print(response.choices[0].message.content)
    except Exception as e:
      print(f"API کال کرنے میں خرابی پیش آئی: {e}")
