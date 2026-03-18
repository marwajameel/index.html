import os
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
