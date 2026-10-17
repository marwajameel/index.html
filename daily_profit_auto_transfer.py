import time
import schedule
from web3 import Web3
from binance.client import Client

# 1. نیٹ ورک اور API سیٹ اپ
RPC_URL = "https://mainnet.base.org"  # یا Solana RPC
web3 = Web3(Web3.HTTPProvider(RPC_URL))

# آپ کی کیز (Environment Variables کے ذریعے رکھیں)
SUB_ACCOUNT_PRIVATE_KEY = "YOUR_BOT_SUB_WALLET_PRIVATE_KEY"
MAIN_SPOT_WALLET_ADDRESS = "0x5B43453FCE04b92E190f391a83136bfBeCEDEFd1"

# گیس ریزرو (کہ گیس فیس کے لیے کتنا بیلنس باقی رکھنا ہے)
GAS_RESERVE = web3.to_wei(0.005, 'ether')  # 0.005 ETH گیس کے لیے چھوڑ کر باقی سارا پرافٹ منتقل ہوگا

def sweep_daily_profit_to_spot():
    try:
        sub_account = web3.eth.account.from_key(SUB_ACCOUNT_PRIVATE_KEY)
        current_balance = web3.eth.get_balance(sub_account.address)
        
        print(f"📊 بوٹ والٹ کا موجودہ بیلنس: {web3.from_wei(current_balance, 'ether')} ETH")
        
        # اگر بیلنس گیس ریزرو سے زیادہ ہو تو زائد رقم پرافٹ کے طور پر ٹرانسفر کریں
        if current_balance > GAS_RESERVE:
            profit_to_transfer = current_balance - GAS_RESERVE
            print(f"💰 پرافٹ مل گیا! {web3.from_wei(profit_to_transfer, 'ether')} ETH اسپاٹ والٹ میں منتقل کیا جا رہا ہے...")
            
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
            
            print(f"✅ روزانہ کا پرافٹ کامیابی سے اسپاٹ والٹ میں منتقل ہو گیا! Tx Hash: {web3.to_hex(tx_hash)}")
        else:
            print("ℹ️ آج کا پرافٹ ابھی گیس حد سے کم ہے، اگلی سائیکل میں چیک کیا جائے گا۔")

    except Exception as e:
        print(f"❌ پرافٹ ٹرانسفر میں خرابی: {e}")

# روزانہ رات 12:00 بجے آٹو ٹرانسفر چلانے کا شیڈول
schedule.every().day.at("00:00").do(sweep_daily_profit_to_spot)

if __name__ == "__main__":
    print("🚀 روزانہ پرافٹ آٹو سوئیپ بوٹ (MJ04) فعال ہو گیا ہے۔")
    print(f"🎯 ٹارگٹ اسپاٹ والٹ: {MAIN_SPOT_WALLET_ADDRESS}")
    
    # پہلی بار فوراً ٹیسٹ کرنے کے لیے
    sweep_daily_profit_to_spot()
    
    while True:
        schedule.run_pending()
        time.sleep(60)
