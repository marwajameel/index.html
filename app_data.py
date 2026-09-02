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

    # Output to JSON for Server/Portfolio Consumption
    with open("portal_data.json", "w", encoding="utf-8") as f:
        json.dump(portal_data, f, ensure_ascii=False, indent=2)

    print("Data Updated Successfully in portal_data.json!")

if __name__ == "__main__":
    update_sdn_portal()
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
