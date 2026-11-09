import requests
import json

def withdraw_from_morpho_vault():
    url = "https://api.base.org/earn/v1/lend/withdraw"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    # آپ کی فراہم کردہ تفصیلات کے مطابق پेलोड
    payload = {
        "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        "vaultId": "8d068ba8-072e-421c-b553-6cf989cefeec",
        "assets": "1000000",
        "maxSlippageBps": 50,
        "builderCode": "your_registered_builder_code"
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        
        print(f"Status Code: {response.status_code}")
        print("Response:")
        print(json.dumps(response.json(), indent=4))
        
    except Exception as e:
        print(f"خرابی پیش آئی: {e}")

if __name__ == "__main__":
    withdraw_from_morpho_vault()
