import requests
import time
import logging

# لاگنگ سیٹ اپ
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def send_telegram_alert(message):
    """ٹیلیگرام کے ذریعے فوری موبائل نوٹیفیکیشن بھیجنے کا فنکشن"""
    TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"
    CHAT_ID = "YOUR_CHAT_ID"
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={CHAT_ID}&text={message}"
    try:
        requests.get(url)
    except Exception as e:
        logging.error(f"ٹیلیگرام الرٹ بھیجنے میں خرابی: {e}")

def monitor_and_notify_usdt(wallet_address, api_key):
    """USDT فنڈز اور ٹرانزیکشنز کو مانیٹر کرنے کا نظام"""
    url = f"https://api.basescan.org/api?module=account&action=tokentx&address={wallet_address}&page=1&offset=1&sort=desc&apikey={api_key}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if data["status"] == "1" and len(data["result"]) > 0:
            latest_tx = data["result"][0]
            token_symbol = latest_tx['tokenSymbol']
            
            if token_symbol == "USDT" or token_symbol == "USDC":
                print(f"🚨 **نیا USDT ٹرانزیکشن الرٹ!**")
                print(f"   - ٹوکن: {token_symbol}")
                print(f"   - مالیت/مقدار: {int(latest_tx['value']) / 10**6}")
                print(f"   - ہیش: {latest_tx['hash'][:12]}...")
                
                # نوٹیفیکیشن الرٹ بھیجنا
                alert_msg = f"SDN News Alert: ویب تھری سے {token_symbol} کی منتقلی اور سرگرمی نوٹ ہو گئی ہے!"
                send_telegram_alert(alert_msg)
        else:
            print("⏳ کوئی نئی USDT ٹرانزیکشن نہیں ملی، سسٹم فعال ہے۔")
            
    except Exception as e:
        logging.error(f"اسکرپٹ میں خرابی: {e}")

if __name__ == "__main__":
    print("--- 🚀 SDN News USDT Transfer & Notification Bot Active ---")
    
    my_wallet = "0x0A64Fe1f0D01E0B4b453B9F010a03dBD214D0cf9"
    api_key = "YOUR_BASESCAN_API_KEY"
    
    # مسلسل مانیٹرنگ لوپ
    while True:
        monitor_and_notify_usdt(my_wallet, api_key)
        time.sleep(45)  # ہر 45 سیکنڈ بعد چیک کرے گا
