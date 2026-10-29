import requests
import time
import logging

# لاگنگ سیٹ اپ
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def monitor_solana_wallet(wallet_address):
    """سولانا نیٹ ورک پر والٹ کی تازہ ترین سرگرمی چیک کرنے کا فنکشن"""
    # Solana Public RPC Endpoint
    url = f"https://api.mainnet-beta.solana.com"
    
    headers = {"Content-Type": "application/json"}
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getSignaturesForAddress",
        [wallet_address, {"limit": 3}]
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        data = response.json()
        
        if "result" in data and len(data["result"]) > 0:
            print(f"\n--- ⚡ سولانا والٹ رپورٹ: {wallet_address[:6]}...{wallet_address[-4:]} ---")
            for i, tx in enumerate(data["result"]):
                print(f"🔹 ٹرانزیکشن #{i+1}:")
                print(f"   - سگنیچر (Signature): {tx['signature'][:15]}...")
                print(f"   - স্লট (Slot): {tx['slot']}")
                print(f"   - اسٹیٹس: کامیاب ✅")
        else:
            print(f"⏳ سولانا والٹ پر فی الحال کوئی نئی ٹرانزیکشن نہیں ملی۔")
            
    except Exception as e:
        logging.error(f"سولانا ڈیٹا فیچ کرنے میں خرابی: {e}")

if __name__ == "__main__":
    print("--- 🚀 SDN News Solana Bot Tracker Active ---")
    
    # آپ کا سولانا والٹ ایڈریس
    solana_wallet = "iGgNJhmyQEnSMean7NfHgEm4RAU72hSNBWvYb1ybynq"
    
    # مسلسل مانیٹرنگ لوپ
    while True:
        monitor_solana_wallet(solana_wallet)
        print("\n⏳ اگلے سولانا اسکین کا انتظار (ہر 45 سیکنڈ بعد)...")
        time.sleep(45)
import requests
import time
import logging

# لاگنگ سیٹ اپ
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def monitor_solana_wallet(wallet_address):
    """سولانا نیٹ ورک پر والٹ کی تازہ ترین سرگرمی اور ٹرانزیکشنز چیک کرنے کا نظام"""
    url = "https://api.mainnet-beta.solana.com"
    
    headers = {"Content-Type": "application/json"}
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getSignaturesForAddress",
        "params": [wallet_address, {"limit": 3}]
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        data = response.json()
        
        if "result" in data and len(data["result"]) > 0:
            print(f"\n--- ⚡ سولانا والٹ الرٹ: {wallet_address[:6]}...{wallet_address[-4:]} ---")
            for i, tx in enumerate(data["result"]):
                print(f"🔹 ٹرانزیکشن #{i+1}:")
                print(f"   - سگنیچر (Signature): {tx['signature'][:15]}...")
                print(f"   - سلاٹ (Slot): {tx['slot']}")
                print(f"   - اسٹیٹس: کامیاب ✅")
        else:
            print(f"⏳ سولانا والٹ پر فی الحال کوئی نئی ٹرانزیکشن نہیں ملی۔ نظام فعال ہے۔")
            
    except Exception as e:
        logging.error(f"سولانا ڈیٹا فیچ کرنے میں خرابی: {e}")

if __name__ == "__main__":
    print("--- 🚀 SDN News Solana Trading & Bot Tracker Active ---")
    
    # آپ کا سولانا والٹ ایڈریس
    solana_wallet = "iGgNJhmyQEnSMean7NfHgEm4RAU72hSNBWvYb1ybynq"
    
    # مسلسل مانیٹرنگ لوپ (ہر 45 سیکنڈ بعد چیک کرے گا)
    while True:
        monitor_solana_wallet(solana_wallet)
        print("\n⏳ اگلے سولانا اسکین کا انتظار...")
        time.sleep(45)

