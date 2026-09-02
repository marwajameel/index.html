import json
import requests
from datetime import datetime

# Wallet & Reporter Settings
WALLET_NAME = "jamilahmed.base.eth"
REPORTER = "Jamil Ahmed Kalyal"

# Public Wallet Data for Live App Sync
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
    print("SDN News Dashboard Data Updating...")

    # Fetch Base Network Address Details
    base_res = {}
    try:
        url = f"https://base.blockscout.com/api/v2/addresses/{WALLET_NAME}"
        base_res = requests.get(url, timeout=5).json()
    except Exception as e:
        base_res = {"status": "connected", "error": str(e)}

    user_info = RAW_WALLET_DATA["users"]["a0fe2cf7-ca1e-4f7b-81e7-d1bcf3b63e71"]

    # Prepare Live Application Payload
    live_portal_payload = {
        "app_title": "SDN News Live Wallet Dashboard",
        "reporter": REPORTER,
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "account_name": user_info["username"],
        "account_id": user_info["uuid"],
        "base_domain": WALLET_NAME,
        "wallets": {
            "ethereum_address": user_info["blockchains"]["ethereum"],
            "solana_address": user_info["blockchains"]["solana"],
            "arbitrum_address": user_info["blockchains"]["arbitrum"]
        },
        "base_chain_data": base_res,
        "status": "Active"
    }

    # Save to JSON file
    with open("portal_data.json", "w", encoding="utf-8") as f:
        json.dump(live_portal_payload, f, ensure_ascii=False, indent=2)

    print("Live app data updated successfully in portal_data.json!")

if __name__ == "__main__":
    sync_live_app_data()
