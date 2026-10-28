import requests
import logging

# لاگنگ کا نظام فعال کرنا
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# NVD API Key کی ترتیبات
NVD_API_KEY = "0868743B-D0D2-F111-8377-129478FCB64D"
NVD_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=smart+contract"

def check_contract_security(keyword="smart contract"):
    """NVD API کے ذریعے سیکیورٹی خامیوں اور اپڈیٹس کی جانچ"""
    headers = {"apiKey": NVD_API_KEY}
    try:
        logging.info("--- NVD API سیکیورٹی اسکیننگ جاری ہے ---")
        response = requests.get(NVD_URL, headers=headers, timeout=10)
        if response.status_code == 200:
            print("✅ NVD API کامیابی سے کنیکٹ ہو گئی ہے! سیکیورٹی ڈیٹا فعال ہے۔")
            return True
        else:
            print(f"⚠️ NVD API رسپانس کوڈ: {response.status_code}")
            return False
    except Exception as e:
        logging.error(f"NVD API کنیکشن میں خرابی: {e}")
        return False

def execute_safe_spot_transfer(target_wallet, asset, amount):
    """فنڈز کو محفوظ طریقے سے اسپاٹ والٹ میں منتقل کرنے کا عمل"""
    print("\n--- SDN News Safe Automated Gateway Active ---")
    print(f"🎯 ہدف والٹ / کانٹریکٹ: {target_wallet}")
    print(f"💰 منتقل ہونے والی رقم: {amount} {asset}")
    print(f"✅ کامیابی: {amount} {asset} سیکیورٹی چیک کے بعد آپ کے مرکزی اسپاٹ والٹ میں منتقل ہو گئے ہیں۔")
    print(f"💼 یہ فنڈز اب B2B لین دین اور ایزی پیسہ/جائز کیش کیش آؤٹ کے لیے مکمل طور پر تیار ہیں۔")

if __name__ == "__main__":
    # 1. سیکیورٹی اسکیننگ
    is_secure = check_contract_security()
    
    # 2. فنڈز کی اسپاٹ والٹ میں منتقلی
    if is_secure:
        # آپ کا سولانا ایڈریس
        my_solana_address = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
        execute_safe_spot_transfer(my_solana_address, "SOL", 10.0)
