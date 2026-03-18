اimport os
import requests
import json

# 1. گٹ ہب یا ہرکولیس سے سیکرٹ حاصل کرنا
api_key = os.getenv("JAMIL")
client_id = "jiGLYwrAPNshqIajzzEhbbgRCssZMwot"

def get_latest_data():
    if not api_key:
        print("خرابی: سیکرٹ (JAMIL) نہیں مل سکا۔")
        return

    # 2. ٹوکن حاصل کرنے کی درخواست
    auth_url = "https://integrations.apptopia.com/api/login" # مثال کے طور پر
    payload = {
        "client": client_id,
        "secret": api_key
    }
    
    try:
        response = requests.post(auth_url, data=payload)
        token = response.json().get("token")
        
        # 3. ڈیٹا حاصل کرنا (مثلاً ایپ رینکنگ یا نیوز ڈیٹا)
        data_url = "https://integrations.apptopia.com/v1/data"
        headers = {"Authorization": f"Bearer {token}"}
        data_res = requests.get(data_url, headers=headers)
        
        # 4. ڈیٹا کو اپنی ویب سائٹ کے لیے محفوظ کرنا
        with open("news_data.json", "w", encoding='utf-8') as f:
            json.dump(data_res.json(), f, ensure_ascii=False, indent=4)
        
        print("ڈیٹا کامیابی سے 'news_data.json' میں محفوظ ہو گیا ہے۔")
        
    except Exception as e:
        print(f"کچھ غلط ہو گیا: {e}")

if __name__ == "__main__":
    get_latest_data()
<div id="news-container">آپ کا ڈیٹا لوڈ ہو رہا ہے...</div>

<script>
    // محفوظ کردہ ڈیٹا فائل کو پڑھنا
    fetch('news_data.json')
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById('news-container');
            // یہاں ڈیٹا کو اپنی مرضی سے ترتیب دیں
            container.innerHTML = `<h3>تازہ ترین معلومات: ${data.name || 'SDN News'}</h3>`;
        })
        .catch(err => console.log('ڈیٹا لوڈ کرنے میں مسئلہ:', err));
</script>
import requests

def get_crypto_balance(wallet_address):
    # یہ Base یا Ethereum نیٹ ورک کے لیے ایک مثال ہے
    api_url = f"https://api.basescan.org/api?module=account&action=balance&address={wallet_address}&tag=latest"
    <div class="payment-card">
    <div class="status-icon">✅</div>
    <div class="payment-info">
        <p class="status-text">SDN-TX: ادائیگی کامیاب!</p>
        <p class="report-id">رپورٹ نمبر: 2026-03-19</p>
        <p class="recipient">وصول کنندہ: <strong>جمیل احمد کلیال</strong></p>
        <div class="amount-badge">1.00 USDC 🔍</div>
    </div>
    <a href="https://basescan.org/tx/..." target="_blank" class="verify-btn">بلاک چین پر تصدیق کریں</a>
</div>

<style>
    .payment-card {
        direction: rtl;
        font-family: 'Noto Nastaliq Urdu', serif;
        background: #f9fdf9;
        border: 1px solid #c3e6cb;
        padding: 20px;
        border-radius: 15px;
        max-width: 400px;
        margin: 20px auto;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    .status-icon { font-size: 40px; margin-bottom: 10px; }
    .status-text { color: #28a745; font-weight: bold; font-size: 18px; }
    .amount-badge {
        background: #eef2f7;
        padding: 5px 15px;
        border-radius: 20px;
        display: inline-block;
        margin-top: 10px;
        color: #2c3e50;
    }
    .verify-btn {
        display: block;
        margin-top: 15px;
        color: #007bff;
        text-decoration: none;
        font-size: 14px;
    }
</style>

    try:
        response = requests.get(api_url)
        data = response.json()
        # بیلنس کو ایتھر (Ether) یونٹ میں تبدیل کرنا
        balance = int(data['result']) / 10**18 
        return round(balance, 4)
    except:
        return "0.00"
<div class="crypto-id-card">
    <div class="ens-name">🆔 @jamilahmed.base.eth</div>
    <p>بلاک چین شناخت برائے: <strong>جمیل احمد کلیال</strong></p>
    <div class="verify-tag">Base Network پر تصدیق شدہ</div>
</div>

<style>
    .crypto-id-card {
        direction: rtl;
        font-family: 'Noto Nastaliq Urdu', serif;
        background: linear-gradient(135deg, #0052ff, #00aaff); /* Base نیٹ ورک کا نیلا رنگ */
        color: white;
        padding: 15px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        max-width: 350px;
        margin: 20px auto;
    }
    .ens-name {
        font-size: 18px;
        font-weight: bold;
        background: rgba(255,255,255,0.2);
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .verify-tag {
        font-size: 12px;
        background: #28a745;
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
    }
</style>

# آپ کا والٹ ایڈریس یہاں آئے گا
wallet = "0x..." # اپنا ایڈریس یہاں لکھیں
print(f"تازہ ترین بیلنس: {get_crypto_balance(wallet)} ETH")
# آپ کا والٹ ایڈریس یا ENS نام
WALLET_NAME = "jamilahmed.base.eth"

final_data = {
    "reporter": "جمیل احمد کلیال",
    "wallet_id": WALLET_NAME, # اب یہاں آپ کا نام نظر آئے گا
    "status": "ادائیگی کامیاب",
    "network": "Base Mainnet"
import os
import json
import requests
from datetime import datetime

# آپ کی بلاک چین شناخت
WALLET_NAME = "jamilahmed.base.eth"
REPORTER = "جمیل احمد کلیال"

def update_sdn_portal():
    # یہاں ہم وہ ڈیٹا تیار کر رہے ہیں جو ویب سائٹ پر دکھانا ہے
    portal_data = {
        "reporter": REPORTER,
        "ens_id": WALLET_NAME,
        "status": "Verified / تصدیق شدہ",
        "network": "Base Mainnet",
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "platform": "SDN News Official"
    }

    # ڈیٹا کو فائل میں محفوظ کرنا تاکہ ویب سائٹ اسے پڑھ سکے
    try:
        with open("news_data.json", "w", encoding='utf-8') as f:
            json.dump(portal_data, f, ensure_ascii=False, indent=4)
        print("✅ SDN News پورٹل کا ڈیٹا کامیابی سے اپ ڈیٹ ہو گیا!")
    except Exception as e:
        print(f"❌ خرابی: {e}")

if __name__ == "__main__":
    update_sdn_portal()
<script>
    async function refreshSDNPortal() {
        try {
            const response = await fetch('news_data.json');
            const data = await response.json();
            
            // ڈیٹا کو اسکرین پر دکھانا
            document.getElementById('reporter-name').innerText = data.reporter;
            document.getElementById('ens-display').innerText = data.ens_id;
            document.getElementById('update-time').innerText = data.last_updated;
        } catch (err) {
            console.error("ڈیٹا لوڈ کرنے میں دشواری:", err);
        }
    }

    // ہر 1 منٹ بعد خود بخود چیک کرے
    setInterval(refreshSDNPortal, 60000);
    refreshSDNPortal(); // پہلی بار چلانے کے لیے
</script>

}
