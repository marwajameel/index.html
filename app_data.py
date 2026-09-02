import json
import requests
from datetime import datetime

# Wallet & Reporter Settings
WALLET_NAME = "jamilahmed.base.eth"
REPORTER = "Jamil Ahmed Kalyal"

# Multi-Account Balance Data from Backpack Wallet
ACCOUNTS_DATA = [
    {
        "name": "Account 1",
        "address": "9ujA...QAeQ",
        "blockchain": "solana",
        "balance_usd": 2.33
    },
    {
        "name": "Account Primary (iGgN)",
        "address": "iGgNJhmyQEnSMean7NfHgEm4RAU72hSNBWvYb1ybynq",
        "blockchain": "solana",
        "balance_usd": 0.0905
    },
    {
        "name": "Account EVM/Ethereum",
        "address": "0x22eC7a80a873322fE71Be03f194CE2DD8Eb2c20e",
        "blockchain": "ethereum",
        "balance_usd": 0.00
    },
    {
        "name": "Account 2",
        "address": "Gjc7...dDFf",
        "blockchain": "solana",
        "balance_usd": 0.00
    },
    {
        "name": "Account 6",
        "address": "3LKf...cNdT",
        "blockchain": "solana",
        "balance_usd": 0.00
    },
    {
        "name": "Account 71",
        "address": "4vmo...oAH9",
        "blockchain": "solana",
        "balance_usd": 0.00
    }
]

def sync_live_app_data():
    print("SDN News Live Multi-Wallet Data Updating...")

    # Calculate Total Aggregated Balance
    total_balance_usd = sum(acc["balance_usd"] for acc in ACCOUNTS_DATA)

    # Fetch Base Network Data
    base_res = {}
    try:
        url = f"https://base.blockscout.com/api/v2/addresses/{WALLET_NAME}"
        base_res = requests.get(url, timeout=5).json()
    except Exception as e:
        base_res = {"status": "connected", "error": str(e)}

    # Prepare Payload for Live Dashboard
    live_portal_payload = {
        "app_title": "SDN News Multi-Wallet Dashboard",
        "reporter": REPORTER,
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "base_domain": WALLET_NAME,
        "aggregated_balance_usd": round(total_balance_usd, 4),
        "accounts_count": len(ACCOUNTS_DATA),
        "accounts": ACCOUNTS_DATA,
        "base_chain_details": base_res,
        "status": "Active"
    }

    # Save to JSON File
    with open("portal_data.json", "w", encoding="utf-8") as f:
        json.dump(live_portal_payload, f, ensure_ascii=False, indent=2)

    print(f"Success! Updated aggregated balance of ${total_balance_usd} to portal_data.json")

if __name__ == "__main__":
    sync_live_app_data()
