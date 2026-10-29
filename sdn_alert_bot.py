import requests
import time
import logging

# لاگنگ اور الرٹ سیٹ اپ
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def send_telegram_alert(message):
    """اگر آپ ٹیلیگرام پر الرٹ لینا چاہیں تو یہ فنکشن پیغام بھیجے گا"""
    # ٹوکن اور چیٹ آئی ڈی درج کرنے کے بعد یہ خودکار کام کرے گا
    TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"
    CHAT_ID = "YOUR_CHAT_ID"
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={CHAT_ID}&text={message}"
    try:
        requests.get(url)
    except Exception as e:
        logging.error(f"ٹیلیگرام نوٹیفیکیشن بھیجنے میں خرابی: {e}")

def monitor_with_alerts(wallet_address, basescan_api_key):
    """والٹ کی سرگرمی پر نظر رکھنے اور الرٹ جاری کرنے کا نظام"""
    url = f"https://api.basescan.org/api?module=account&action=txlist&address={wallet_address}&startblock=0&endblock=99999999&page=1&offset=1&sort=desc&apikey={basescan_api_key}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if data["status"] == "1" and len(data["result"]) > 0:
            latest_tx = data["result"][0]
            tx_hash = latest_tx['hash']
            
            # آخری ٹرانزیکشن کی جانچ کے لیے یہاں لاجک بنائی جا سکتی ہے
            print(f"🚨 **نیا الرٹ:** والٹ {wallet_address[:6]}... پر نئی سرگرمی حتمی مرحلے میں ہے!")
            print(f"   - ٹرانزیکشن ہیش: {tx_hash}")
            print(f"   - بلاک نمبر: {latest_tx['blockNumber']}")
            
            # الرٹ میسج تیار کرنا
            alert_msg = f"SDN News Alert: والٹ {wallet_address[:6]} پر نئی ٹرانزیکشن ہو گئی ہے! ہیش: {tx_hash[:10]}..."
            # send_telegram_alert(alert_msg)
            
        else:
            print(لگ رہا ہے کہ سکون ہے... کوئی نئی ٹرانزیکشن نہیں ملی۔)
            
    except Exception as e:
        logging.error(f"الرٹ اسکرپٹ میں خرابی: {e}")

if __name__ == "__main__":
    print("--- 🔔 SDN News Automated Notification Alerts Active ---")
    
    my_wallet = "0x0A64Fe1f0D01E0B4b453B9F010a03dBD214D0cf9"
    api_key = "YOUR_BASESCAN_API_KEY"
    
    # مسلسل الرٹ سسٹم
    while True:
        monitor_with_alerts(my_wallet, api_key)
        time.sleep(30)  # ہر 30 سیکنڈ بعد چیک کرے گا
