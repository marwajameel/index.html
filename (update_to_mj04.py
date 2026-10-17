import os
import json

# نیا اور واحد برانڈ نام
UNIFIED_BRAND_NAME = "MJ04"

# آپ کے پراجیکٹس کی ڈائریکٹری (جہاں تمام فائلیں موجود ہیں)
PROJECTS_ROOT_DIR = "./projects"

def update_metadata_files(directory):
    print(f"🔄 تمام پروجیکٹس کا نام تبدیل ہو کر '{UNIFIED_BRAND_NAME}' کیا جا رہا ہے...")
    
    updated_count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            # صرف JSON یا کنفیگریشن یا سورس فائلز کو ٹارگٹ کریں
            if file.endswith(('.json', '.env', '.js', '.py', '.html', '.md')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # پرانے ناموں یا ہولڈر کو MJ04 سے ریپلیس کرنا
                    # (یہاں آپ اپنے پرانے ناموں کی جگہ دے سکتے ہیں)
                    new_content = content.replace("Jamil Ahmed Kalyal", UNIFIED_BRAND_NAME)
                    new_content = new_content.replace("sdn-news", "mj04-news")
                    
                    if content != new_content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"✅ اپ ڈیٹ ہو گئی فائل: {file_path}")
                        updated_count += 1
                except Exception as e:
                    # بعض بائنری یا انکوڈنگ فائلز کو چھوڑنے کے لیے
                    continue

    print(f"\n🎉 کل {updated_count} فائیلز کامیابی سے '{UNIFIED_BRAND_NAME}' کے نام پر اپ ڈیٹ کر دی گئی ہیں!")

if __name__ == "__main__":
    update_metadata_files(PROJECTS_ROOT_DIR)
import time
import schedule
from web3 import Web3

RPC_URL = "https://mainnet.base.org"
web3 = Web3(Web3.HTTPProvider(RPC_URL))

SUB_ACCOUNT_PRIVATE_KEY = "YOUR_BOT_SUB_WALLET_PRIVATE_KEY"
MAIN_SPOT_WALLET_ADDRESS = "0x5B43453FCE04b92E190f391a83136bfBeCEDEFd1"
GAS_RESERVE = web3.to_wei(0.005, 'ether')

def sweep_daily_profit_to_spot():
    try:
        sub_account = web3.eth.account.from_key(SUB_ACCOUNT_PRIVATE_KEY)
        current_balance = web3.eth.get_balance(sub_account.address)
        
        if current_balance > GAS_RESERVE:
            profit_to_transfer = current_balance - GAS_RESERVE
            nonce = web3.eth.get_transaction_count(sub_account.address)
            tx = {
                'nonce': nonce,
                'to': MAIN_SPOT_WALLET_ADDRESS,
                'value': profit_to_transfer,
                'gas': 21000,
                'maxFeePerGas': web3.to_wei(5, 'gwei'),
                'maxPriorityFeePerGas': web3.to_wei(1.5, 'gwei'),
                'chainId': web3.eth.chain_id
            }
            signed_tx = web3.eth.account.sign_transaction(tx, SUB_ACCOUNT_PRIVATE_KEY)
            tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
            print(f"✅ پرافٹ اسپاٹ والٹ میں منتقل ہو گیا: {web3.to_hex(tx_hash)}")
    except Exception as e:
        print(f"❌ خرابی: {e}")

schedule.every().day.at("00:00").do(sweep_daily_profit_to_spot)

if __name__ == "__main__":
    while True:
        schedule.run_pending()
        time.sleep(60)

