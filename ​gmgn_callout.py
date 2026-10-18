import hashlib
import hmac
import time
import json
import requests

class GMGNCalloutAPI:
    def __init__(self, ak: str, sk: str):
        self.ak = ak
        self.sk = sk
        self.base_url = "https://papi.gmgn.ai/callout/openapi/v1"

    def _request(self, endpoint: str, payload_dict: dict):
        path = f"/callout/openapi/v1/{endpoint}"
        method = "POST"
        raw_query = ""
        
        # باڈی کو درست JSON فارمیٹ میں تبدیل کرنا (بغیر اضافی اسپیسز کے)
        body = json.dumps(payload_dict, separators=(",", ":")) if payload_dict else ""
        ts = str(int(time.time() * 1000))
        
        # سگنیچر پेलोڈ کی ترتیب: ak + timestamp + method + path + raw_query + body
        payload = self.ak + ts + method + path + raw_query + body
        sig = hmac.new(self.sk.encode(), payload.encode(), hashlib.sha256).hexdigest()

        headers = {
            "Content-Type": "application/json",
            "X-Ak": self.ak,
            "X-Timestamp": ts,
            "X-Signature": sig,
        }

        resp = requests.post(f"{self.base_url}/{endpoint}", data=body, headers=headers)
        return resp.json()

    def get_global_stream(self, page_token: str = ""):
        """گلوبل کال آؤٹ اسٹریم حاصل کرنے کے لیے (/global)"""
        payload = {"page_token": page_token} if page_token else {}
        return self._request("global", payload)

    def get_token_callouts(self, chain: str, call_token: str, cursor: str = "", limit: int = 50):
        """کسی مخصوص ٹوکن کے کال آؤٹس حاصل کرنے کے لیے (/token)"""
        data = {"chain": chain, "call_token": call_token, "limit": limit}
        if cursor:
            data["cursor"] = cursor
        return self._request("token", data)

    def get_wallet_records(self, chain: str, call_wallet: str, limit: int = 20, page_token: str = ""):
        """کسی مخصوص والٹ کی ہسٹری حاصل کرنے کے لیے (/get_record)"""
        data = {"chain": chain, "call_wallet": call_wallet, "limit": limit}
        if page_token:
            data["page_token"] = page_token
        return self._request("get_record", data)

# --- استعمال کرنے کا طریقہ ---
if __name__ == "__main__":
    # یہاں اپنی اصل AK اور SK درج کریں
    AK = "آپ_کی_اصل_اک"
    SK = "آپ_کی_اصل_سک"

    api = GMGNCalloutAPI(AK, SK)

    # 1. گلوبل اسٹریم کا ڈیٹا حاصل کریں (/global)
    print("Global Stream:")
    print(api.get_global_stream())

    # 2. کسی ٹوکن کا ڈیٹا حاصل کریں (/token)
    # print(api.get_token_callouts(chain="sol", call_token="ٹوکن_ایڈریس"))
