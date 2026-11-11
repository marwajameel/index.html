import os
import time
from binance.client import Client
from dotenv import load_dotenv

# .env فائل سے API Keys لوڈ کریں
load_dotenv()

API_KEY = os.getenv('BINANCE_API_KEY')
SECRET_KEY = os.getenv('BINANCE_SECRET_KEY')

# بائنس کلائنٹ کو منسلک کریں
client = Client(API_KEY, SECRET_KEY)

def get_total_usdt_balance():
    """تمام والٹس سے موجودہ USDT بیلنس چیک کرنے کا فنکشن"""
    try:
        # اسپاٹ والٹ (Spot Wallet) بیلنس
        spot_balances = client.get_account()['balances']
        spot_usdt = next((float(b['free']) for b in spot_balances if b['asset'] == 'USDT'), 0.0)
        
        # فنڈنگ والٹ (Funding Wallet - P2P) بیلنس
        funding_balances = client.get_funding_asset()
        funding_usdt = next((float(f['free']) for f in funding_balances if f['asset'] == 'USDT'), 0.0)

        print(f"📊 اسپاٹ والٹ USDT: {spot_usdt}")
        print(f"📊 فنڈنگ والٹ USDT: {funding_usdt}")
        return spot_usdt, funding_usdt
    except Exception as e:
        print(f"❌ بیلنس چیک کرنے میں خرابی پیش آگئی: {e}")
        return 0.0, 0.0

def consolidate_to_funding(amount):
    """اسپاٹ والٹ سے فنڈز کو پی ٹو پی (Funding Wallet) میں اکٹھا کرنا"""
    try:
        if amount > 0:
            # ٹرانسفر ٹائپ 'MAIN_FUNDING' کا مطلب ہے Spot سے Funding میں منتقلی
            result = client.make_universal_transfer(
                type='MAIN_FUNDING',
                asset='USDT',
                amount=str(amount)
            )
            print(f"✅ کامیابی سے {amount} USDT فنڈنگ والٹ میں منتقل کر دیے گئے! TranId: {result['tranId']}")
        else:
            print("ℹ️ منتقل کرنے کے لیے اسپاٹ والٹ میں کوئی اضافی فنڈ موجود نہیں ہے۔")
    except Exception as e:
        print(f"❌ فنڈز اکٹھے کرنے کے دوران خرابی: {e}")

def run_p2p_automation_loop():
    """آٹو سسٹم جو مستقل فنڈز کو مانیٹر کر کے ایک جگہ سنٹرلائز کرتا ہے"""
    print("🚀 بائنس پی ٹو پی آٹومیشن سسٹم کامیابی سے شروع ہو چکا ہے...")
    while True:
        print("\n--------------------------------------------------")
        spot_bal, funding_bal = get_total_usdt_balance()
        
        # اگر اسپاٹ والٹ میں فنڈز موجود ہوں تو انہیں خودکار طریقے سے فنڈنگ والٹ میں شفٹ کریں
        if spot_bal > 1.0: 
            print(f"🔄 اسپاٹ میں {spot_bal} USDT موجود ہیں، انہیں فنڈنگ والٹ میں شفٹ کیا جا رہا ہے...")
            consolidate_to_funding(spot_bal)
        
        print("⏳ اگلی مانیٹرنگ کا انتظار جاری ہے... (30 سیکنڈ بعد دوبارہ چیک کیا جائے گا)")
        time.sleep(30)

if __name__ == "__main__":
    run_p2p_automation_loop()
