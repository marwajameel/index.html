import time
from web3 import Web3

# 1. بلاک چین نیٹ ورک سے کنکشن قائم کریں (مثلاً BSC یا Ethereum)
# اپنے نوڈ کا درست آر پی سی (RPC URL) درج کریں
INFURA_OR_RPC_URL = "https://bsc-dataseed.binance.org/"
web3 = Web3(Web3.HTTPProvider(INFURA_OR_RPC_URL))

if not web3.is_connected():
    print("❌ بلاک چین سے کنکشن قائم نہیں ہو سکا! نیٹ ورک چیک کریں۔")
    exit()

print("✅ بلاک چین سے کامیابی سے رابطہ ہو گیا ہے!")

# 2. والٹ کی تفصیلات (پرائیویٹ کی اور ایڈریس)
# نوٹ: اپنی پرائیویٹ کی کو ہمیشہ محفوظ رکھیں اور کسی کے ساتھ شیئر نہ کریں
SENDER_ADDRESS = "0 നിങ്ങളുടെ_वॉलेट_ایڈریس_یہاں_لکھیں"
PRIVATE_KEY = "آپ_کی_پرائیویٹ_کی_یہاں_آئے_گی"
RECIPIENT_OR_CONTRACT = "0 اپڈیٹ_یا_امپورٹ_ہونے_والا_ایڈریس"

def update_blockchain_address():
    try:
        # گیس کی قیمت اور نانس (Nonce) حاصل کریں
        nonce = web3.eth.get_transaction_count(SENDER_ADDRESS)
        gas_price = web3.eth.gas_price
        
        # ٹرانزیکشن کی تفصیلات تیار کریں
        tx = {
            'nonce': nonce,
            'to': RECIPIENT_OR_CONTRACT,
            'value': web3.to_wei(0.001, 'ether'),  # ضرورت کے مطابق فیس یا اماؤنٹ تبدیل کریں
            'gas': 21000,                          # معیاری گیس کی حد
            'gasPrice': gas_price,
            'chainId': 56                          # باائننس اسمارٹ چین (BSC) کے لیے 56، ایتھیریم کے لیے 1
        }
        
        # پرائیویٹ کی کے ذریعے ٹرانزیکشن پر دستخط (Sign) کریں
        signed_tx = web3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)
        
        # بلاک چین پر ٹرانزیکشن بھیجیں (فیس پے ہو گی)
        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        print(f"⏳ ٹرانزیکشن بھیج دی گئی ہے، تصدیق کا انتظار ہے...")
        print(f"🔗 ٹرانزیکشن ہیش: {web3.to_hex(tx_hash)}")
        
        # ٹرانزیکشن کی رسید کا انتظار کریں
        receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
        
        if receipt.status == 1:
            print("مبارک ہو! ایڈریس کامیابی کے ساتھ اپڈیٹ اور فیس ادا کر دی گئی ہے۔")
        else:
            print("❌ ٹرانزیکشن ناکام ہو گئی ہے۔")
            
    except Exception as e:
        print(f"⚠️ خرابی پیش آ گئی: {e}")

# 3. خودکار (آٹو) بوٹ کا لُوپ
if __name__ == "__main__":
    print("🤖 آٹو سسٹم بوٹ شروع ہو رہا ہے...")
    while True:
        update_blockchain_address()
        
        # اگلی اپڈیٹ تک کا وقفہ (مثلاً ہر 1 گھنٹے بعد یا ضرورت کے مطابق سیکنڈز دیں)
        print("⏳ اگلی کارروائی تک انتظار جاری ہے...\n")
        time.sleep(3600)  // 3600 سیکنڈ = 1 گھنٹہ
