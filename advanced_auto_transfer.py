import os
import time
import logging
from binance.client import Client
from binance.exceptions import BinanceAPIException, BinanceRequestException

# 1. لاگنگ کا جائزہ
logging.basicConfig(
    filename='auto_transfer.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# 2. اے پی آئی اور والٹ سیٹنگز
BINANCE_API_KEY = os.getenv("BINANCE_API_KEY", "YOUR_API_KEY_HERE")
BINANCE_API_SECRET = os.getenv("BINANCE_API_SECRET", "YOUR_API_SECRET_HERE")

# آپ کا ٹارگٹ والٹ ایڈریس
TARGET_WALLET_ADDRESS = "0x5B43453FCE04b92E190f391a83136bfBeCEDEFd1"

# کوائن کے لحاظ سے نیٹ ورک کی ترتیب (Network Mapping)
NETWORK_MAPPING = {
    "ETH": "ETH",
    "USDT": "ETH",  # یا 'BSC' / 'BASE' اگر آپ کا والٹ سپورٹ کرتا ہے
    "USDC": "ETH",
    "BNB": "BSC",
    "BTC": "BTC"
}

# 3. بائنینس کلائنٹ کنکشن
try:
    client = Client(BINANCE_API_KEY, BINANCE_API_SECRET)
    print("✅ بائنینس API کے ساتھ کامیابی سے رابطہ قائم ہو گیا ہے۔")
except Exception as e:
    print(f"❌ API کنیکشن قائم کرنے میں ناکامی: {e}")
    exit()

def execute_auto_portfolio_transfer():
    try:
        print("\n🔍 اسپاٹ والٹ کے تمام اثاثوں کی جانچ کی جا رہی ہے...")
        account_info = client.get_account()
        balances = account_info.get('balances', [])

        transferred_count = 0

        for item in balances:
            asset = item['asset']
            free_balance = float(item['free'])

            # صرف وہ اثاثے جن کی رقم صفر سے زیادہ ہے
            if free_balance > 0:
                print(f"\n📦 اثاثہ پایا گیا: {asset} | دستیاب رقم: {free_balance}")

                # نیٹ ورک کا تعین
                network = NETWORK_MAPPING.get(asset, "ETH")

                # چھوٹے بیلنس کو بائی پاس کرنے کے لیے بنیادی چیک
                if free_balance > 0.0001:
                    try:
                        print(f"🚀 {asset} منتقل کیا جا رہا ہے -> {TARGET_WALLET_ADDRESS[:10]}... (شبکہ: {network})")

                        response = client.withdraw(
                            coin=asset,
                            address=TARGET_WALLET_ADDRESS,
                            amount=free_balance,
                            network=network
                        )

                        tx_id = response.get('id', 'N/A')
                        msg = f"✅ کامیابی! {asset} کی مقدار {free_balance} کامیابی سے منتقل کر دی گئی۔ ریفرینس ID: {tx_id}"
                        print(msg)
                        logging.info(msg)
                        transferred_count += 1

                    except BinanceAPIException as api_err:
                        err_msg = f"⚠️ {asset} کی منتقلی میں ناکامی: {api_err.message} (کود: {api_err.code})"
                        print(err_msg)
                        logging.error(err_msg)

        if transferred_count == 0:
            print("\nℹ️ کوئی بھی قابلِ منتقلی رقم یا فنڈز نہیں ملے۔")

    except BinanceRequestException as req_err:
        print(f"❌ نیٹ ورک کی خرابی: {req_err}")
    except Exception as e:
        print(f"❌ غیر متوقع خرابی: {e}")

if __name__ == "__main__":
    print("🤖 آٹو پورٹ فولیو وڈرال سسٹم فعال ہو چکا ہے...")
    execute_auto_portfolio_transfer()
