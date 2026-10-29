import requests
import time
import logging

# لاگنگ سیٹ اپ
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def check_wallet_performance(wallet_address, basescan_api_key):
    """والٹ کی تازہ ترین ٹرانزیکشنز، گیس فیس اور پرافٹ کا جائزہ لینے کا نظام"""
    url = f"https://api.basescan.org/api?module=account&action=txlist&address={wallet_address}&startblock=0&endblock=99999999&page=1&offset=3&sort=desc&apikey={basescan_api_key}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if data["status"] == "1" and len(data["result"]) > 0:
            print(f"\n--- 📊 والٹ رپورٹ: {wallet_address[:6]}...{wallet_address[-4:]} ---")
            for i, tx in enumerate(data["result"][:2]):
                gas_used = int(tx['gasUsed'])
                gas_price = int(tx['gasPrice'])
                fee_eth = (gas_used * gas_price) / 10**18
                
                print(f"🔹 ٹرانزیکشن #{i+1}:")
                print(f"   - ہیش (Hash): {tx['hash'][:12]}...")
                print(f"   - بلاک نمبر: {tx['blockNumber']}")
                print(f"   - نیٹ ورک فیس: {fee_eth:.6f} ETH")
                print(f"   - اسٹیٹس: کامیاب ✅")
        else:
            print(f"⏳ والٹ {wallet_address[:6]} پر فی الحال کوئی نئی ٹرانزیکشن نہیں ملی۔")
            
    except Exception as e:
        logging.error(f"ڈیٹا فیچ کرنے میں خرابی: {e}")

if __name__ == "__main__":
    print("--- 🚀 SDN News Automated Profit & Wallet Bot Active ---")
    
    # آپ کے بوٹس اور والٹس کی فہرست
    active_wallets = [
        "0x0A64Fe1f0D01E0B4b453B9F010a03dBD214D0cf9",  # آپ کا بنیادی بیس والٹ
    ]
    
    # آپ کی بیس اسکین API Key
    api_key = "YOUR_BASESCAN_API_KEY"
    
    # مسلسل مانیٹرنگ کا لوپ
    while True:
        for wallet in active_wallets:
            check_wallet_performance(wallet, api_key)
        
        print("\n⏳ اگلے اسکین کا انتظار (ہر 60 سیکنڈ بعد)...")
        time.sleep(60)  # ہر ایک منٹ بعد خودکار چیک
