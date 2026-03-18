import os
import json
import requests
from datetime import datetime

# بلاک چین شناخت
WALLET_NAME = "jamilahmed.base.eth"
REPORTER = "جمیل احمد کلیال"

def update_sdn_portal():
    print("SDN News ڈیٹا اپ ڈیٹ ہو رہا ہے...")
    
    # ویب سائٹ کے لیے ڈیٹا تیار کرنا
    portal_data = {
        "reporter": REPORTER,
        "ens_id": WALLET_NAME,
        "status": "Verified / تصدیق شدہ",
        "network": "Base Mainnet",
        "last_updated": datetime.now().strftime("%Y-%m-%d %I:%M %p"),
        "msg": "SDN-TX: ادائیگی کامیاب! بلاک چین پر تصدیق شدہ"
    }

    try:
        # صرف news_data.json فائل بنانا
        with open("news_data.json", "w", encoding='utf-8') as f:
            json.dump(portal_data, f, ensure_ascii=False, indent=4)
        print("✅ کامیابی: news_data.json تیار ہو گئی ہے!")
    except Exception as e:
        print(f"❌ خرابی: {e}")

if __name__ == "__main__":
    update_sdn_portal()
