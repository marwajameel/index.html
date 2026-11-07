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
import os
from web3 import Web3

# 1. بیس نیٹ ورک کا آر پی سی کنکشن (Base Mainnet RPC)
INFURA_URL = "https://mainnet.base.org"  # یا آپ اپنا QuickNode یا Alchemy RPC استعمال کر سکتے ہیں
w3 = Web3(Web3.HTTPProvider(INFURA_URL))

# کنکشن کی تصدیق
if not w3.is_connected():
    print("بلاک چین سے کنکشن قائم نہیں ہو سکا۔")
    exit()

# 2. سینڈر (آپ کا) والٹ اور ریسیپिएंट (وصول کنندہ) ایڈریس
SENDER_ADDRESS = "0x30525dE7D9A84dc1253B33F828522C0593bB6fa3"  # آپ کا والٹ ایڈریس
RECIPIENT_ADDRESS = "0xcBcA630521176E76D8a5F55F78703B92336A1411"  # ہدف ایڈریس
PRIVATE_KEY = "یہاں_اپنے_والٹ_کی_پرائیویٹ_کی_درج_کریں"  # حفاظتی طور پر اسے خفیہ رکھیں

# بیس نیٹ ورک پر USDT کا آفیشل اسمارٹ کانٹریکٹ ایڈریس
USDT_BASE_CONTRACT = "0x50c5725949A6F0c72E6C4a641F24049A917DB0cb"

# کم سے کم ABI جو ERC-20 ٹوکن ٹرانسفر کے لیے درکار ہے
ERC20_ABI = [
    {
        "constant": False,
        "inputs": [
            {"name": "_to", "type": "address"},
            {"name": "_value", "type": "uint256"},
        ],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function",
    },
]


def send_native_eth(amount_in_eth):
    """مطلوبہ مالیت کا ETH ٹرانسفر کرنے کا فنکشن"""
    nonce = w3.eth.get_transaction_count(SENDER_ADDRESS)
    value_in_wei = w3.to_wei(amount_in_eth, "ether")

    # گیس کی قیمت کا تخمینہ
    gas_price = w3.eth.gas_price

    tx = {
        "nonce": nonce,
        "to": Web3.to_checksum_address(RECIPIENT_ADDRESS),
        "value": value_in_wei,
        "gas": 21000,  # استاندارد ETH ٹرانسفر گیس کی حد
        "gasPrice": gas_price,
        "chainId": 8453,  # Base Mainnet Chain ID
    }

    # سائن اور براڈ کاسٹ کرنا
    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(
        f"کامیاب! ETH ٹرانزیکشن ہیش: {w3.to_hex(tx_hash)} - ایڈریس: {RECIPIENT_ADDRESS}"
    )


def send_usdt_token(amount_to_send):
    """USDT ٹوکن خودکار طریقے سے ٹرانسفر کرنے کا فنکشن"""
    contract = w3.eth.contract(
        address=Web3.to_checksum_address(USDT_BASE_CONTRACT), abi=ERC20_ABI
    )

    # USDT کے 6 decimal ہوتے ہیں
    amount_in_smallest_unit = int(amount_to_send * (10**6))

    nonce = w3.eth.get_transaction_count(SENDER_ADDRESS)

    # ٹرانسفر فنکشن بلڈ کرنا
    txn = contract.functions.transfer(
        Web3.to_checksum_address(RECIPIENT_ADDRESS), amount_in_smallest_unit
    ).build_transaction(
        {
            "chainId": 8453,
            "gas": 65000,  # ERC-20 ٹرانسفر کے لیے گیس لمٹ
            "gasPrice": w3.eth.gas_price,
            "nonce": nonce,
        }
    )

    signed_txn = w3.eth.account.sign_transaction(txn, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(
        f"کامیاب! USDT ٹرانزیکشن ہیش: {w3.to_hex(tx_hash)} - ایڈریس: {RECIPIENT_ADDRESS}"
    )


# مثال کے طور پر: اگر آپ 1 USDT بھیجنا چاہیں تو نیچے والی لائن فعال کریں:
# send_usdt_token(1.0)

# یا اگر آپ اتنی ہی مالیت کا ETH بھیجنا چاہیں (مثال کے طور پر 0.0004 ETH):
# send_native_eth(0.0004)

