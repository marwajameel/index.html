import requests
from web3 import Web3

# 1. Base Network Custom RPC کنکشن
RPC_URL = "https://mainnet.base.org"
web3 = Web3(Web3.HTTPProvider(RPC_URL))

# آپ کا والٹ ایڈریس
WALLET_ADDRESS = "0x30525dE7D9A84dc1253B33F828522C0593bB6fa3"

def check_wallet_status():
    """والٹ کا گیس اور بیلنس خودکار چیک کرنے کا فنکشن"""
    if web3.is_connected():
        print("✅ بیس نیٹ ورک (Base Network) سے کامیابی سے کنیکٹ ہو گیا ہے!")
        
        # والٹ کا ETH (گیس) بیلنس چیک کریں
        balance_wei = web3.eth.get_balance(WALLET_ADDRESS)
        balance_eth = web3.from_wei(balance_wei, 'ether')
        print(f"💰 والٹ بیلنس: {balance_eth} ETH")
        return balance_eth
    else:
        print("❌ نیٹ ورک کنکشن میں خرابی ہے، براہ کرم RPC چیک کریں۔")
        return 0

def fetch_blockchain_data_with_x402():
    """x402 پروٹوکول کے ذریعے خودکار ڈیٹا ریکوئسٹ اور پیمنٹ ہینڈلر"""
    url = "https://api.blockchain.info/explorer-gateway-kt/x402/btc/block/transactions"
    payload = {"height": 850000}

    print("🔄 بلاک چین اے پی آئی کو خودکار ریکوئسٹ بھیجی جا رہی ہے...")
    response = requests.post(url, json=payload)

    if response.status_code == 402:
        payment_req = response.headers.get("PAYMENT-REQUIRED")
        print(f"⚠️ سرور سے پیمنٹ مطلوب ہے (402 Required): {payment_req}")
        
        # یہاں آپ کا سافٹ ویئر خودکار طور پر سگنیچر جنरेट کر کے فیس ادا کرے گا
        # (آپ اپنے پرائیویٹ کی کے ذریعے یہاں سائن ٹرانزیکشن کا کوڈ ایڈ کر سکتے ہیں)
        print("💡 سافٹ ویئر خودکار طور پر $0.005 USDC کی فیس ادا کرنے کے لیے تیار ہے...")
    else:
        print("🎉 ڈیٹا کامیابی سے موصول ہو گیا:", response.json())

if __name__ == "__main__":
    print("--- جمیل والٹ آٹومیشن سسٹم شروع ہو رہا ہے ---")
    check_wallet_status()
    fetch_blockchain_data_with_x402()
