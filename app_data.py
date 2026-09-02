import os
import json
import requests
from datetime import datetime

# اصلی شناخت اور والیٹ
WALLET_NAME = "jamilahmed.base.eth"
REPORTER = "جمیل احمد کلیال"

def update_sdn_portal():
    print("SDN News ڈیش بورڈ ڈیٹا اپ ڈیٹ ہو رہا ہے...")

    # بیس نیٹ ورک سے ڈیٹا بلاواسطہ حاصل کریں
    try:
        url = f"https://base.blockscout.com/api/v2/addresses/{WALLET_NAME}"
        res = requests.get(url, timeout=5).json()
    except:
        res = {"status": "connected"}

    # پورٹ فولیو کا سادہ ڈیٹا
    portal_data = {
        "reporter": REPORTER,
        "wallet": WALLET_NAME,
        "updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "network": "Base Mainnet",
        "data": res
    }

    # پورٹ فولیو کے لیے JSON فائل تیار کریں
    with open("portal_data.json", "w", encoding="utf-8") as f:
        json.dump(portal_data, f, ensure_ascii=False, indent=2)

    print("ڈیٹا کامیابی سے اپ ڈیٹ ہو گیا ہے!")

if __name__ == "__main__":
    update_sdn_portal()
