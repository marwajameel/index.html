import os
import time
import logging
from binance.client import Client
from binance.exceptions import BinanceAPIException, BinanceRequestException

# 1. لاگنگ کی ترتیب (Logging Setup)
logging.basicConfig(
    filename='auto_transfer.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# 2. آپ کا خفیہ کلید (API Key / Secret) اور ایڈریس
# نوٹ: سیکیورٹی کی خاطر API Keys کو Environment Variables سے پڑھنا زیادہ محفوظ ہے
BINANCE_API_KEY = os.getenv("BINANCE_API_KEY", "KBjXpJKsVCS45aPNAlyVN1Z0mVuyEz5FEpgj522sdUpfvuK2SuvXavT2jvHCCxun")
BINANCE_API_SECRET = os.getenv("BINANCE_API_SECRET", "YOUR_BINANCE_SECRET_HERE")

# آپ کا ٹارگٹ والٹ ایڈریس
TARGET_WALLET_ADDRESS = "0x5B43453FCE04b92E190f391a83136bfBeCEDEFd1"
PREFERRED_NETWORK = "ETH"  # یا 'BASE'

# 3. بائنینس کلائنٹ کی شروعات
try:
    client = Client(BINANCE_API_KEY, BINANCE_API_SECRET)
    print("✅ بائنینس API کے ساتھ کامیابی سے کنیکٹ ہو گیا ہے۔")
except Exception as e:
    print(f"❌ API کنیکشن میں مسئلہ: {e}")
    exit()

def execute_auto_portfolio_transfer():
    try:
        print("\n🔍 اسپاٹ پورٹ فولیو کا جائزہ لیا جا رہا ہے...")
        account_info = client.get_account()
        balances = account_info.get('balances', [])

        transferred_count = 0

        for item in balances:
            asset = item['asset']
            free_balance = float(item['free'])

            # صرف وہ اثاثے جن کا بیلنس موجود ہو
            if free_balance > 0:
                print(f"\n📦 اثاثہ ملا: {asset} | دستیاب بیلنس: {free_balance}")

                # تمام اہم کوائنز (ETH, USDT, وغیرہ) کے لیے آٹو ودڈرال
                if free_balance > 0.001:  # کم از کم ودڈرال کی حد
                    try:
                        print(f"🚀 {asset} کو آٹو منتقل کیا جا رہا ہے -> {TARGET_WALLET_ADDRESS[:8]}...")
                        
                        response = client.withdraw(
                            coin=asset,
                            address=TARGET_WALLET_ADDRESS,
                            amount=free_balance,
                            network=PREFERRED_NETWORK
                        )
                        
                        tx_id = response.get('id', 'N/A')
                        msg = f"✅ کامیابی! {asset} کا {free_balance} والٹ میں منتقل کر دیا گیا۔ Ref ID: {tx_id}"
                        print(msg)
                        logging.info(msg)
                        transferred_count += 1

                    except BinanceAPIException as api_err:
                        err_msg = f"⚠️ {asset} کی منتقلی ناکام: {api_err.message}"
                        print(err_msg)
                        logging.error(err_msg)

        if transferred_count == 0:
            print("\nℹ️ کوئی قابلِ منتقلی اسپاٹ فنڈز نہیں ملے۔")

    except BinanceRequestException as req_err:
        print(f"❌ نیٹ ورک کی خرابی: {req_err}")
    except Exception as e:
        print(f"❌ غیر متوقع غلطی: {e}")

if __name__ == "__main__":
    print("🤖 زبردست آٹو پورٹ فولیو وڈرال بوٹ فعال ہو گیا ہے...")
    execute_auto_portfolio_transfer()
