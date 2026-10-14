from web3 import Web3

# 1. RPC اور اکاؤنٹ سیٹ اپ
web3 = Web3(Web3.HTTPProvider('YOUR_RPC_URL'))
private_key = "YOUR_ADMIN_PRIVATE_KEY"
account = web3.eth.account.from_key(private_key)

# 2. پراکسی ایڈریس اور ABI
proxy_address = "YOUR_PROXY_CONTRACT_ADDRESS"
new_implementation = "YOUR_NEW_IMPLEMENTATION_ADDRESS"

abi = [
    {
        "inputs": [{"internalType": "address", "name": "newImplementation", "type": "address"}],
        "name": "upgradeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

# 3. کانٹریکٹ انسٹینس
contract = web3.eth.contract(address=proxy_address, abi=abi)

# 4. ٹرانزیکشن تیار کریں
nonce = web3.eth.get_transaction_count(account.address)
tx = contract.functions.upgradeTo(new_implementation).build_transaction({
    'from': account.address,
    'nonce': nonce,
    'gas': 200000,
    'gasPrice': web3.eth.gas_price
})

# 5. سائن اور سینڈ کریں
signed_tx = web3.eth.account.sign_transaction(tx, private_key)
tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
print(f"Upgrade Tx Hash: {web3.to_hex(tx_hash)}")
