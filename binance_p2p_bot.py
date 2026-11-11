import os
import time
from binance.client import Client
from dotenv import load_dotenv

# .env فائل سے اے پی آئی کیز لوڈ کریں
load_dotenv()

API_KEY = os.getenv('BINANCE_API_KEY')
SECRET_KEY = os.getenv('BINANCE_SECRET_KEY')

# بائنس کلائنٹ کی سکیور انیشلائزیشن
client = Client(API_KEY, SECRET_KEY)

def fetch_and_consolidate_funds():
    """تمام والٹس سے فنڈز کا ڈیٹا اکٹھا کرنا اور فنڈنگ والٹ میں منتقل کرنا"""
    try:
        print("\n🔍 بائنس والٹس سے ڈیٹا فیچ کیا جا رہا ہے...")
        
        # 1. اسپاٹ والٹ بیلنس چیک کریں
        spot_account = client.get_account()
        spot_balances = spot_account['balances']
        spot_usdt = next((float(b['free']) for b in spot_balances if b['asset'] == 'USDT'), 0.0)
        
        # 2. فنڈنگ والٹ (P2P) بیلنس چیک کریں
        funding_assets = client.get_funding_asset()
        funding_usdt = next((float(f['free']) for f in funding_assets if f['asset'] == 'USDT'), 0.0)

        print(f"📊 اسپاٹ والٹ دستیاب USDT: {spot_usdt}")
        print(f"📊 فنڈنگ والٹ دستیاب USDT: {funding_usdt}")

        # 3. اگر اسپاٹ والٹ میں فنڈز موجود ہیں تو انہیں خودکار طریقے سے پی ٹو پی (Funding) میں شفٹ کریں
        if spot_usdt > 1.0:
            print(f"🔄 اسپاٹ سے {spot_usdt} USDT فنڈنگ والٹ میں منتقل کیے جا رہے ہیں...")
            transfer_result = client.make_universal_transfer(
                type='MAIN_FUNDING',
                asset='USDT',
                amount=str(spot_usdt)
            )
            print(f"✅ فنڈز کامیابی سے منتقل ہو گئے! ٹرانزیکشن آئی ڈی: {transfer_result.get('tranId')}")
        else:
            print("ℹ️ اسپاٹ والٹ میں منتقل کرنے کے لیے کوئی نیا بیلنس موجود نہیں۔")

    except Exception as e:
        print(f"❌ ڈیٹا فیچ یا ٹرانسفر کے دوران خرابی پیش آگئی: {e}")

def run_automation_daemon():
    """مستقل چلنے والا آٹومیشن لوپ جو ہر وقت ڈیٹا مانیٹر کرے گا"""
    print("🚀 بائنس پی ٹو پی فل آٹومیشن بوٹ فعال ہو چکا ہے...")
    while True:
        fetch_and_consolidate_funds()
        print("⏳ اگلی سنکرونائزیشن کا انتظار جاری ہے... (30 سیکنڈ بعد دوبارہ چیک ہوگا)")
        time.sleep(30)

if __name__ == "__main__":
    run_automation_daemon()
