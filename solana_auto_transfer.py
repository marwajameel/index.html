import time
from solana.rpc.api import Client
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solders.system_program import TransferParams, transfer
from solders.transaction import Transaction

# 1. سولانا مین نیٹ RPC یو آر ایل (Solana Mainnet RPC)
RPC_URL = "https://api.mainnet-beta.solana.com"
client = Client(RPC_URL)

# 2. اپنے والٹ کی تفصیلات اور سولانا ایڈریس درج کریں
#5PDGoMSKkTeAtsdqcRGQyM9tt4g82RZupsiqGqxQyCUCEUWtAXSpuARQziiaEnpgaapq3bozCV7aZV2ACg15x8Xs
SENDER_SECRET_KEY = [0] * 64  # [byte_0, byte_1, ..., byte_63] کی شکل میں

# وصول کرنے والا سولانا ایڈریس (آپ کا فراہم کردہ ایڈریس)
RECEIVER_PUBKEY_STR = "IGgNJhmyQEnSMean7NfHgEm4RAU72hSNBWvYb1ybynq"

sender_keypair = Keypair.from_bytes(bytes(SENDER_SECRET_KEY))
sender_pubkey = sender_keypair.pubkey()
receiver_pubkey = Pubkey.from_string(RECEIVER_PUBKEY_STR)

def send_all_sol():
    try:
        # اکاؤنٹ کا بیلنس معلوم کریں (Lamports میں)
        balance_res = client.get_balance(sender_pubkey)
        balance = balance_res.value

        # ٹرانزیکشن فی (معیاری 5000 Lamports)
        fee = 5000
        amount_to_send = balance - fee

        if amount_to_send <= 0:
            print("سولانا والٹ میں ٹرانزیکشن یا فی کے لیے بیلنس ناکافی ہے۔")
            return

        # حالیہ بلاک ہیش حاصل کریں
        recent_blockhash = client.get_latest_blockhash().value.blockhash

        # ٹرانسفر کی انسٹرکشن تیار کریں
        transfer_instruction = transfer(
            TransferParams(
                from_pubkey=sender_pubkey,
                to_pubkey=receiver_pubkey,
                lamports=amount_to_send
            )
        )

        # ٹرانزیکشن بنائیں اور سائن کریں
        tx = Transaction.new_signed_with_payer(
            [transfer_instruction],
            sender_pubkey,
            [sender_keypair],
            recent_blockhash
        )

        # ٹرانزیکشن نیٹ ورک پر بھیجیں
        res = client.send_transaction(tx)
        print(f"خودکار سولانا ٹرانسفر کامیاب! سگنیچر: {res.value}")

    except Exception as e:
        print(f"خرابی (Error): {e}")

# خودکار چیک اور ٹرانسفر (ہر 60 سیکنڈ بعد)
if __name__ == "__main__":
    print(f"سولانا خودکار ٹرانسفر بوٹ فعال ہے... فرام والٹ: {sender_pubkey}")
    while True:
        send_all_sol()
        time.sleep(60)
