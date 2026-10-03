import time
import schedule
from solana.rpc.api import Client
from solana.transaction import Transaction
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solders.system_program import transfer, TransferParams

# 1. نیٹ ورک اور والیٹ کنفیگریشن
RPC_URL = "https://api.mainnet-beta.solana.com"
solana_client = Client(RPC_URL)

# اپنے والیٹ کی پرائیویٹ کی یہاں باٹس (bytes) یا لسٹ کی شکل میں درج کریں
# انتباہ: اپنی پرائیویٹ کی کو ہمیشہ محفوظ رکھیں اور کسی کے ساتھ شیئر نہ کریں!
SENDER_PRIVATE_KEY = [...] # مثال کے طور پر: [23, 45, ...] 
sender_keypair = Keypair.from_bytes(bytes(SENDER_PRIVATE_KEY))

# وصول کرنے والے کا ایڈریس (Recipient Address)
RECIPIENT_ADDRESS = Pubkey.from_string("HPvOjvSk_9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM")

# بھیجی جانے والی رقم (SOL میں، 1 SOL = 1,000,000,000 Lamports)
AMOUNT_SOL = 0.001
AMOUNT_LAMPORTS = int(AMOUNT_SOL * 1_000_000_000)

def execute_automated_transaction():
    try:
        print("\n[آٹومیشن] خودکار ٹرانزیکشن شروع ہو رہی ہے...")
        
        # لیٹسٹ بلاک ہیش حاصل کریں
        recent_blockhash = solana_client.get_latest_blockhash().value.blockhash
        
        # ٹرانزیکشن بنائیں
        txn = Transaction()
        txn.add(
            transfer(
                TransferParams(
                    from_pubkey=sender_keypair.pubkey(),
                    to_pubkey=RECIPIENT_ADDRESS,
                    lamports=AMOUNT_LAMPORTS
                )
            )
        )
        
        # ٹرانزیکشن کو سائن اور سینڈ کریں
        response = solana_client.send_transaction(txn, sender_keypair)
        
        print(f" کامیابی! ٹرانزیکشن ہیش: {response.value}")
        
    except Exception as e:
        print(f" ٹرانزیکشن میں خرابی پیش آگئی: {e}")

# 2. شیڈول سیٹ کریں (مثلاً ہر 1 گھنٹے بعد ٹرانزیکشن چلے گی)
# آپ اسے 'every(30).minutes' یا 'every().day.at("12:00")' بھی کر سکتے ہیں
schedule.every(1).hours.do(execute_automated_transaction)

print("سولانا آٹومیشن بوٹ کامیابی سے فعال ہو گیا ہے اور شیڈول کا انتظار کر رہا ہے...")

# 3. لوپ جو اسکرپٹ کو ہمیشہ رن رکھے گا
while True:
    schedule.run_pending()
    time.sleep(1)
