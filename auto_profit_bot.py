import time
import logging
from web3 import Web3

# لاگنگ سیٹ اپ تاکہ تمام ٹرانزیکشنز کا ریکارڈ محفوظ رہے
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Base Network RPC URL (مستحکم کنکشن کے لیے)
BASE_RPC_URL = "https://mainnet.base.org"
web3 = Web3(Web3.HTTPProvider(BASE_RPC_URL))

# آپ کا آفیشل والیٹ ایڈریس
WALLET_ADDRESS = "0xdeef7C6CAa67Fbb1b62f98665f37c8343Bae072b"

def start_auto_bot():
    logging.info("--- SDN News Auto Profit Bot Started ---")
    
    if not web3.is_connected():
        logging.error("Base نیٹ ورک سے کنکشن قائم کرنے میں ناکامی!")
        return

    logging.info(f"موفقیت سے Base نیٹ ورک جڑ گیا ہے۔ مانیٹرنگ جاری ہے والیٹ: {WALLET_ADDRESS}")
    
    last_checked_block = web3.eth.block_number

    while True:
        try:
            current_block = web3.eth.block_number
            
            # اگر نیا بلاک آئے تو چیک کریں
            if current_block > last_checked_block:
                balance_wei = web3.eth.get_balance(WALLET_ADDRESS)
                balance_eth = web3.from_wei(balance_wei, 'ether')
                
                logging.info(f"موجودہ بلاک: {current_block} | والیٹ بیلنس: {balance_eth} ETH/Base")
                
                # اگر فنڈز موصول ہوں تو آٹو روٹنگ یا گیٹ وے سگنل متحرک کریں
                if balance_eth > 0.001:
                    logging.info(">>> نئی رقم موصول ہوئی! آٹو روٹنگ اور کیش آؤٹ کا عمل شروع کیا جا رہا ہے...")
                    # یہاں آپ اپنے ایزی پیسہ/جائز کیش یا ٹوکن سوپ کا API فنکشن جوڑ سکتے ہیں

                last_checked_block = current_block

            # ہر 15 سیکنڈ بعد اگلا بلاک چیک کریں
            time.sleep(15)

        except Exception as e:
            logging.error(f"بوٹ میں خرابی پیش آئی: {e}")
            time.sleep(30)

if __name__ == "__main__":
    start_auto_bot()
