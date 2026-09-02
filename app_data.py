import os
import json
import requests
from datetime import datetime

# Wallet and Reporter Settings
WALLET_NAME = "jamilahmed.base.eth"
REPORTER = "Jamil Ahmed Kalyal"

def update_sdn_portal():
    print("SDN News Dashboard Data Updating...")

    # Fetch Data from Base Network
    try:
        url = f"https://base.blockscout.com/api/v2/addresses/{WALLET_NAME}"
        res = requests.get(url, timeout=5).json()
    except Exception as e:
        res = {"status": "connected", "error": str(e)}

    # Prepare Portfolio Data Structure
    portal_data = {
        "reporter": REPORTER,
        "wallet": WALLET_NAME,
        "updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "network": "Base Mainnet",
        "data": res
    }

    # Save to a separate JSON file
    with open("portal_data.json", "w", encoding="utf-8") as f:
        json.dump(portal_data, f, ensure_ascii=False, indent=2)

    print("Data Updated Successfully in portal_data.json!")

if __name__ == "__main__":
    update_sdn_portal()
import json
from datetime import datetime

# آپ کا والیٹ ڈیٹا (جس میں سے صرف پبلک کیز اور ایڈریسز استعمال کیے جائیں گے)
RAW_WALLET_DATA = {
  "users": {
    "a0fe2cf7-ca1e-4f7b-81e7-d1bcf3b63e71": {
      "uuid": "a0fe2cf7-ca1e-4f7b-81e7-d1bcf3b63e71",
      "username": "Account 1",
      "blockchains": {
        "ethereum": "0x22eC7a80a873322fE71Be03f194CE2DD8Eb2c20e",
        "solana": "iGgNJhmyQEnSMean7NfHgEm4RAU72hSNBWvYb1ybynq",
        "arbitrum": "0x22eC7a80a873322fE71Be03f194CE2DD8Eb2c20e"
      }
    }
  }
}

def sync_live_app_data():
    print("SDN News ڈیش بورڈ کے لیے لائیو والٹ ڈیٹا تیار ہو رہا ہے...")

    user_info = RAW_WALLET_DATA["users"]["a0fe2cf7-ca1e-4f7b-81e7-d1bcf3b63e71"]

    # لائیو ایپ کے لیے صرف پبلک انفارمیشن فلٹر کریں
    live_portal_payload = {
        "app_title": "SDN News Live Wallet Dashboard",
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "account_name": user_info["username"],
        "account_id": user_info["uuid"],
        "wallets": {
            "ethereum_address": user_info["blockchains"]["ethereum"],
            "solana_address": user_info["blockchains"]["solana"],
            "arbitrum_address": user_info["blockchains"]["arbitrum"]
        },
        "status": "Active"
    }

    #     # Save payload to portal_data.json
    with open("portal_data.json", "w", encoding="utf-8") as f:
        json.dump(live_portal_payload, f, ensure_ascii=False, indent=2)

    print("Live app data updated successfully in portal_data.json!")

if __name__ == "__main__":
    sync_live_app_data()

        json.dump(live_portal_payload, f, ensure_ascii=False, indent=2)

    print("لائیو ایپ کا ڈیٹا کامیابی سے portal_data.json میں محفوظ ہو گیا ہے!")

if __name__ == "__main__":
    sync_live_app_data()
