import os
import requests
from dotenv import load_dotenv
from solders.keypair import Keypair
from solana.rpc.api import Client

# .env فائل سے حساس معلومات لوڈ کریں
load_dotenv()

RPC_URL = os.getenv("NEXT_PUBLIC_SOLANA_RPC_URL", "https://api.mainnet-beta.solana.com")
PRIVATE_KEY_STR = os.getenv("SOLANA_PRIVATE_KEY")
# آپ اپنی 0x API Key یہاں یا .env فائل میں شامل کر سکتے ہیں
ZEROX_API_KEY = os.getenv("ZEROX_API_KEY", "YOUR_0X_API_KEY") 

solana_client = Client(RPC_URL)

def execute_solana_swap(token_in, token_out, amount_in, slippage_bps=50):
    """0x API v2 کے ذریعے سولانا پر ٹوکن سویپ انسٹرکشنز حاصل کرنے کا آٹو فنکشن"""
    if not PRIVATE_KEY_STR:
        print("❌ ایرر: سولانا پرائیویٹ کی (SOLANA_PRIVATE_KEY) .env فائل میں نہیں ملی!")
        return None

    try:
        # والٹ کیپیر انیشلائز کریں
        wallet = Keypair.from_base58_string(PRIVATE_KEY_STR)
        taker_address = str(wallet.pubkey())
        
        print(f"🔄 فعال والٹ پبلک ایڈریس: {taker_address}")
        
        url = "https://api.0x.org/solana/swap-instructions"
        headers = {
            "0x-api-key": ZEROX_API_KEY,
            "Content-Type": "application/json"
        }
        payload = {
            "amount_in": int(amount_in),
            "taker": taker_address,
            "token_in": token_in,
            "token_out": token_out,
            "slippage_bps": slippage_bps
        }

        print("📡 0x API کو ریکویسٹ بھیجی جا رہی ہے...")
        response = requests.post(url, json=payload, headers=headers)
        
        if response.status_code == 200:
            swap_data = response.json()
            print("✅ سویپ انسٹرکشنز کامیابی سے حاصل ہو گئی ہیں!")
            return swap_data
        else:
            print(f"❌ API ایرر (اسٹیٹس کوڈ {response.status_code}): {response.text}")
            return None

    except Exception as e:
        print(f"❌ ایک্সেپشن / خرابی پیش آ گئی: {e}")
        return None

if __name__ == "__main__":
    # مثال کے طور پر: SOL سے USDC سویپ کرنے کی ٹیسٹ کمانڈ
    # SOL Mint: So11111111111111111111111111111111111111112
    # USDC Mint: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
    
    SOL_MINT = "So11111111111111111111111111111111111111112"
    USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    
    # مقدار (مثلاً 0.01 SOL، لیمپوٹس میں: 10000000)
    amount_to_swap = 10000000 
    
    result = execute_solana_swap(SOL_MINT, USDC_MINT, amount_to_swap)
    if result:
        print("📊 موصولہ ڈیٹا:", result)
