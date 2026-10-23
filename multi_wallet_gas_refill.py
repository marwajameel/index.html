import os
import time
import base58
from solana.rpc.api import Client
from solders.pubkey import Pubkey
from solders.keypair import Keypair
from solders.system_program import TransferParams, transfer
from solders.transaction import Transaction

# 1. سولانا RPC EndPoint (بہتر ہو گا کہ Helius / QuickNode کی API URL استعمال کریں)
client = Client("https://api.mainnet-beta.solana.com")

# 2. مین گیس والٹ پرائیویٹ کی (ماحول کے متغیر / Environment Variable سے لوڈ کریں)
# اپنی پرائیویٹ کی کو کوڈ میں بلاواسطہ مت رکھیں
MAIN_GAS_WALLET_KEY = os.getenv("SOLANA_PRIVATE_KEY", "2c1dcdc2a0fc4e86c671713187e1ec4faee5395d7054f5d05c693cfe802f3b2d")

try:
    if len(MAIN_GAS_WALLET_KEY) == 64 or len(MAIN_GAS_WALLET_KEY) == 128:
        MAIN_KEYPAIR = Keypair.from_seed(bytes.fromhex(MAIN_GAS_WALLET_KEY[:64]))
    else:
        secret_bytes = base58.b58decode(MAIN_GAS_WALLET_KEY)
        MAIN_KEYPAIR = Keypair.from_bytes(secret_bytes)
except Exception as e:
    print(f"❌ کی پیئر لوڈ کرنے میں خرابی: {e}")
    exit(1)

# 3. صرف درست سولانا والٹ ایڈریسز (43/44 کریکٹرز کا Base58 پبلک کی)
TARGET_WALLETS = [
    "A9aEY896KTSgWe8HdU6L3sSxQjdoca6r39difpjDAh7Q"
]

MIN_BALANCE = 50_000_000     # 0.05 SOL حد (کم از کم)
REFILL_AMOUNT = 200_000_000  # 0.2 SOL آٹو سپلائی

def auto_refill_all_wallets():
    print("🔍 تمام والٹس کا بیلنس چیک کیا جا رہا ہے...")
    for wallet_str in TARGET_WALLETS:
        try:
            target_pubkey = Pubkey.from_string(wallet_str)
            balance = client.get_balance(target_pubkey).value
            sol_bal = balance / 1_000_000_000
            print(f"📌 Solana Wallet [{wallet_str[:6]}...]: بیلنس = {sol_bal} SOL")

            if balance < MIN_BALANCE:
                print(f"⚠️ بیلنس کم ہے! {REFILL_AMOUNT / 1_000_000_000} SOL بھیجے جا رہے ہیں...")
                transfer_ix = transfer(
                    TransferParams(
                        from_pubkey=MAIN_KEYPAIR.pubkey(),
                        to_pubkey=target_pubkey,
                        lamports=REFILL_AMOUNT
                    )
                )
                recent_blockhash = client.get_latest_blockhash().value.blockhash
                tx = Transaction.new_signed_with_payer(
                    [transfer_ix], MAIN_KEYPAIR.pubkey(), [MAIN_KEYPAIR], recent_blockhash
                )
                res = client.send_transaction(tx)
                print(f"✅ سپلائی بھیج دی گئی! Tx: {res.value}")
        except Exception as e:
            print(f"❌ خرابی والٹ [{wallet_str[:6]}...]: {e}")

if __name__ == "__main__":
    print("🚀 MJ04 ملٹی والٹ آٹو گیس اسکرپٹ فعال ہو گیا ہے...")
    while True:
        auto_refill_all_wallets()
        time.sleep(30)  # Rate Limit سے بچنے کے لیے وقت بڑھا کر 30 سیکنڈ کر دیا ہے
