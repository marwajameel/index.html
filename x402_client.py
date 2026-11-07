import requests

# API Endpoint aur Payload
url = "https://api.blockchain.info/explorer-gateway-kt/x402/btc/block/transactions"
payload = {"height": 850000}

print("1. بلاک چین اے پی آئی کو ریکوئسٹ بھیجی جا رہی ہے...")

# 1. Initial Call (Triggers 402 Payment Required)
response = requests.post(url, json=payload)

if response.status_code == 402:
    payment_req = response.headers.get("PAYMENT-REQUIRED")
    print(f"سرور کی طرف سے پیمنٹ مطلوب ہے (402 Required): {payment_req}")
    
    # یہاں آپ اپنے Base Network Wallet (Web3.py یا Viem) کے ذریعے 
    # $0.005 USDC کی پیمنٹ سائن کریں گے:
    # payment_signature = sign_x402_payment(payment_req, max_amount=0.005)
    
    # 2. Paid Retry with Signature (سگنیچر کے ساتھ دوبارہ ریکوئسٹ)
    # headers = {"PAYMENT-SIGNATURE": payment_signature}
    # final_response = requests.post(url, json=payload, headers=headers)
    # print("کامیاب رسپانس:", final_response.json())
else:
    print("ڈیٹا موصول ہو گیا:", response.json())
