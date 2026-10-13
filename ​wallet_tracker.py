import requests

def fetch_wallet_transactions():
    # آپ کا مکمل API یو آر ایل
    url = "https://api.blockscout.com/1/api/v2/addresses/0xd8da6bf26964af9d7eed9e03e53415d37aa96045/transactions?apikey=proapi_Vtm0rsjW2Or2g760uKiCRm9zPOR6qFmIqzagVbMU9pbyejunqSfvVPWwrsaGXnqs_cojP7O"
    
    headers = {
        "accept": "application/json"
    }
    
    try:
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            print("ڈیٹا کامیابی سے حاصل ہو گیا ہے!")
            return data
        else:
            print(f"خامی پیش آئی، اسٹیٹس کوڈ: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"کنکشن میں خامی: {e}")
        return None

# فنکشن کو رن کرنا
result = fetch_wallet_transactions()

if result:
    # حاصل ہونے والی ٹرانزیکشنز کی تفصیلات دیکھنا
    items = result.get("items", [])
    print(f"کل ٹرانزیکشنز کی تعداد: {len(items)}")
    for tx in items[:5]:  # ابتدائی 5 ٹرانزیکشنز کا ریکارڈ
        print(f"Tx Hash: {tx.get('hash')} | Value: {tx.get('value')}")
