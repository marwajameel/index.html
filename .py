import time
import requests

def call_with_retry(api_url, headers, payload, max_retries=3):
    """نیٹ ورک ایرर یا فیل ہونے پر خودکار طریقے سے دوبارہ کوشش کرنے کا فنکشن"""
    for attempt in range(1, max_retries + 1):
        try:
            print( کوشش نمبر {attempt} جاری ہے... )
            response = requests.post(api_url, json=payload, headers=headers, timeout=10)
            
            if response.status_code == 200:
                print(" کامیابی سے ڈیٹا کنیکట్ ہو گیا!")
                return response.json()
            else:
                print(f"⚠️ سرور رسپانس کوڈ: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"❌ نیٹ ورک یا کنکشن کا مسئلہ: {e}")
            
        # اگلی کوشش سے پہلے تھوڑا وقفہ دیں
        time.sleep(2 * attempt)
        
    print("❌ تمام کوششیں ناکام ہو گئی ہیں، براہ کرم نیٹ ورک کنکشن چیک کریں۔")
    return None

# استعمال کرنے کا طریقہ:
# api_url = "YOUR_RPC_OR_API_ENDPOINT"
# result = call_with_retry(api_url, {}, {})
