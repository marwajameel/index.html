import time
import base58
from solana.rpc.api import Client
from solders.pubkey import Pubkey
from solders.keypair import Keypair
from solders.system_program import TransferParams, transfer
from solders.transaction import Transaction

# 1. سولانا Mainnet RPC
SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"
client = Client(SOLANA_RPC_URL)

# 2. آپ کی فراہم کردہ پرائیویٹ کی (Private Key)
PRIVATE_KEY_STR = "Jup_2c1dcdc2a0fc4e86c671713187e1ec4faee5395d7054f5d05c693cfe802f3b2d"

# Base58 کی کے ذریعے بیک اپ والٹ کیپیئر (Keypair) بنانا
try:
    # اگر پرائیویٹ کی Base58 فارمیٹ میں ہے
    secret_bytes = base58.b58decode(PRIVATE_KEY_STR)
    BACKUP_WALLET_KEYPAIR = Keypair.from_bytes(secret_bytes)
except Exception as e:
    # اگر کی ہیکس (Hex) یا بائٹس فارمیٹ میں ہو
    BACKUP_WALLET_KEYPAIR = Keypair.from_seed(bytes.fromhex("2c1dcdc2a0fc4e86c671713187e1ec4faee5395d7054f5d05c693cfe802f3b2d"))

# 3. ٹارگٹ پراجیکٹ کا والٹ ایڈریس
TARGET_PROJECT_ADDRESS = Pubkey.from_string("0x5B43453FCE04b92E190f391a83136bfBeCEDEFd1")

# 4. گیس حد اور ریفل کی مقدار (Lamports: 1 SOL = 1,000,000,000 Lamports)
MIN_SOL_LIMIT = 50_000_000       # 0.05 SOL سے کم ہونے پر
REFILL_AMOUNT = 500_000_000     # 0.5 SOL بھیجیں

def check_and_refill_solana_gas():
    try:
        # موجودہ بیلنس چیک کریں
        response = client.get_balance(TARGET_PROJECT_ADDRESS)
        current_balance = response.value
        sol_balance = current_balance / 1_000_000_000
        print(f"📊 پراجیکٹ والٹ بیلنس: {sol_balance} SOL")

        # اگر بیلنس کم ہے تو آٹو ریفل کریں
        if current_balance < MIN_SOL_LIMIT:
            print("⚠️ گیس بیلنس کم ہے! سمارٹ کانٹریکٹ ٹرانزیکشنز کے لیے بیک اپ گیس منتقل کی جا رہی ہے...")

            transfer_ix = transfer(
                TransferParams(
                    from_pubkey=BACKUP_WALLET_KEYPAIR.pubkey(),
                    to_pubkey=TARGET_PROJECT_ADDRESS,
                    lamports=REFILL_AMOUNT
                )
            )

            recent_blockhash = client.get_latest_blockhash().value.blockhash
            tx = Transaction.new_signed_with_payer(
                [transfer_ix],
                BACKUP_WALLET_KEYPAIR.pubkey(),
                [BACKUP_WALLET_KEYPAIR],
                recent_blockhash
            )

            tx_res = client.send_transaction(tx)
            print(f"✅ گیس فیس کامیابی سے ٹرانسفر ہو گئی! Tx Hash: {tx_res.value}")
        else:
            print("✅ پراجیکٹ کے لیے SOL بیلنس کافی ہے۔ ٹرانزیکشنز معمول کے مطابق چل رہی ہیں۔")

    except Exception as e:
        print(f"❌ ٹرانزیکشن کے دوران خرابی: {e}")

if __name__ == "__main__":
    print(f"🚀 سولانا سمارٹ کانٹریکٹ آٹو گیس بوٹ فعال ہو گیا ہے...")
    print(f"🔑 کنیکٹڈ والٹ: {BACKUP_WALLET_KEYPAIR.pubkey()}")
    
    while True:
        check_and_refill_solana_gas()
        time.sleep(10)  # ہر 10 سیکنڈ بعد سمارٹ کانٹریکٹ گیس چیک کرے گا
