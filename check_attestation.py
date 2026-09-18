import requests

# Base Mainnet RPC URL (Coinbase Developer Platform)
RPC_URL = "https://api.developer.coinbase.com/rpc/v1/base/CEuN7z8myGVgJo1Op29D4nbyvRAggXcy"

payload = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_blockNumber",
    "params": []
}

headers = {"Content-Type": "application/json"}

response = requests.post(RPC_URL, json=payload, headers=headers)

if response.status_code == 200:
    data = response.json()
    latest_block = int(data['result'], 16)
    print(f"Base Mainnet Connected successfully!")
    print(f"Current Block Number: {latest_block}")
else:
    print("Connection Failed:", response.text)
