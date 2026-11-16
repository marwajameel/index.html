import requests

def get_web3_profile(address_or_ns):
    url = f"https://api.web3.bio/profile/{address_or_ns}"
    headers = {"Accept": "application/json"}
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    return None

# مثال کے طور پر اپنے کسی والٹ یا ENS کے لیے کال کرنا
profile_info = get_web3_profile("vitalik.eth")
print(profile_info)
