import time
import logging
import requests

# لاگنگ کا نظام تاکہ تمام ٹرانزیکشنز کا ریکارڈ محفوظ رہے
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Base Network RPC URL
BASE_RPC_URL = "https://mainnet.base.org"
web3 = Web3(Web3.HTTPProvider(BASE_RPC_URL))

# آپ کا آفیشل والیٹ ایڈریس
WALLET_ADDRESS = "0xdeef7C6CAa67Fbb1b62f98665f37c8343Bae072b"

def send_pkr_cashout_alert(amount_eth):
    try:
        # فرض کریں 1 ETH کی قیمت PKR میں (یا لائیو API سے ریٹ حاصل کریں)
        eth_to_pkr_rate = 750000  # تخمینی ریٹ
        amount_pkr = float(amount_eth) * eth_to_pkr_rate
        
        logging.info(f"--- PKR Cashout Gateway Triggered ---")
        logging.info(f"موصولہ کرپٹو: {amount_eth} ETH")
        logging.info(f"بمطابق پاکستانی روپے (PKR): Rs. {amount_pkr:,.2f}")
        
        # ٹیلیگرام یا لوکل نوٹیفیکیشن کے لیے (اگر آپ بوٹ ٹوکن جوڑنا چاہیں)
        print(f"🚨 SDN News الرٹ: Rs. {amount_pkr:,.2f} (PKR) موصول ہوئے! ایزی پیسہ / جائز کیش کے لیے تیار ہے۔")
        
    except Exception as e:
        logging.error(f"PKR گیٹ وے میں خرابی: {e}")

def start_auto_bot():
    logging.info("--- SDN News Auto Profit & PKR Gateway Bot Started ---")
    
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
                
                # اگر فنڈز موصول ہوں تو PKR گیٹ وے کو متحرک کریں
                if balance_eth > 0.001:
                    logging.info(">>> نئی رقم موصول ہوئی! PKR کیش آؤٹ کا عمل شروع کیا جا رہا ہے...")
                    send_pkr_cashout_alert(balance_eth)

                last_checked_block = current_block

            # ہر 15 سیکنڈ بعد اگلا بلاک چیک کریں
            time.sleep(15)

        except Exception as e:
            logging.error(f"بوٹ میں خرابی پیش آئی: {e}")
            time.sleep(30)

if __name__ == "__main__":
    start_auto_bot()
