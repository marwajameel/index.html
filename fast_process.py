import asyncio
import aiohttp
import time
import hmac
import hashlib

# -------------------------------------------------------------
# آپ کی فراہم کردہ Bitget / Exchange API معلومات
# -------------------------------------------------------------
API_KEY = 'bg_aedf4ff6e168bf83aaafddbfd6e61690'
API_SECRET = '425c9ca12cc4550fe5328ce857859a9a00c5b2c5dc75889460ea0438991bae59'

BASE_URL = 'https://api.bitget.com'  # یا آپ کا متعلقہ API اینڈ پوائنٹ

def get_signature(timestamp, method, request_path, body, secret):
    """API کی محفوظ سیکیورٹی سگنیچر جنریٹ کرنے کا فنکشن"""
    message = str(timestamp) + method.upper() + request_path + body
    return hmac.new(secret.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()

async def fetch_fast_data(session, endpoint):
    """فوری اور بغیر کسی تاخیر کے ڈیٹا لوڈ کرنے کے لیے Asynchronous درخواست"""
    timestamp = str(int(time.time() * 1000))
    method = 'GET'
    body = ''
    
    signature = get_signature(timestamp, method, endpoint, body, API_SECRET)
    
    headers = {
        'ACCESS-KEY': API_KEY,
        'ACCESS-SIGN': signature,
        'ACCESS-TIMESTAMP': timestamp,
        'Content-Type': 'application/json'
    }

    try:
        async with session.get(BASE_URL + endpoint, headers=headers, timeout=5) as response:
            if response.status == 200:
                data = await response.json()
                print("✅ ڈیٹا کامیابی سے اور فوری اپلوڈ/لوڈ ہو گیا:")
                print(data)
                return data
            else:
                error = await response.text()
                print(f"❌ ایرور (Status {response.status}): {error}")
    except Exception as e:
        print(f"⚠️ نیٹ ورک کنکشن کا مسئلہ: {e}")

async def main():
    async with aiohttp.ClientSession() as session:
        # فوری ڈیٹا کی پروسیسنگ کے لیے
        await fetch_fast_data(session, '/api/v2/spot/account/assets')

if __name__ == '__main__':
    asyncio.run(main())
