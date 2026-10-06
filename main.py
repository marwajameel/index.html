import requests
import json
import time

# --- اپ ڈیٹیڈ کنفیگریشن ---
PARAGRAPH_API_KEY = "Para_CiHwRnJayi4VC-PrWgGB7o1egf3SomkP8_Iamkftg-E"

# API اینڈ پوائنٹ
API_URL = "https://api.paragraph.xyz/v1/posts"

def auto_publish_sdn_news(title, content, published=True):
    """
    SDN News خودکار پبلشنگ فنکشن
    """
    headers = {
        "Authorization": f"Bearer {PARAGRAPH_API_KEY}",
        "Content-Type": "application/json"
    }

    # خبر یا مضمون کا ڈیٹا
    payload = {
        "title": title,
        "markdown": content,
        "published": published
    }

    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
        if response.status_code in [200, 201]:
            print(f"✅ [SDN News] پوسٹ کامیا بی سے شائع ہو گئی: {title}")
            return response.json()
        else:
            print(f"❌ غلطی: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"⚠️ نیٹ ورک غلطی: {e}")
        return None

# --- خودکار پبلشنگ لوپ ٹیسٹ ---
if __name__ == "__main__":
    news_title = "سولانا نیٹ ورک اور اسمارٹ کنٹریکٹ کی تازہ ترین صورتحال"
    
    news_body = """
    ## SDN News - باخبر، ہر لمحہ
    
    سولانا بلاک چین نیٹ ورک اور اسمارٹ کنٹریکٹ مانیٹرنگ کا خودکار نظام کامیابی سے فعال کر دیا گیا ہے۔
    
    ---
    🌐 **SDN News Sarai Alamgir**
    🌐 **Official Portal:** marwajameel.github.io/sdn-news
    📱 **Connect:** @SDNNews
    📞 **Contact:** +92 346 0008235
    👤 **رپورٹ:** جمیل احمد کلیال (بیورو چیف گجرات)
    """

    print("رپورٹ پوسٹ کی جا رہی ہے...")
    auto_publish_sdn_news(title=news_title, content=news_body, published=True)
