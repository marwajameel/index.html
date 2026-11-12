# ==============================================================================
# SDN NEWS & MULTI-WALLET LIVE BLOCKCHAIN & TRUST PORTAL ENGINE
# Developer / Bureau Chief: Jamil Ahmed Kalyal
# ==============================================================================

import time
import hmac
import hashlib
import requests
import json
from datetime import datetime

# ------------------------------------------------------------------------------
# 1. TRUST WALLET API & AGENT CREDENTIALS
# ------------------------------------------------------------------------------
TRUST_ACCESS_ID = "382446d0c8ac34fef4997a72cc0911466feec0559d0d563c36c45b61fd3e056d"
TRUST_HMAC_SECRET = "2c647559ce9b4cbfd020bc36ea1be77a755f8ba2f4ef460d5178b6d310a78d2c"
TRUST_AGENT_ID = "796c11e6-10b6-4c7f-ab01-ab990bdb8b87"

TRUST_API_BASE = "https://api.portal.trustwallet.com/v1"
ETH_RPC_URL = "https://eth.llamarpc.com"
BASE_RPC_URL = "https://mainnet.base.org"
SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"

# ------------------------------------------------------------------------------
# 2. YOUR REGISTERED BACKUP WALLETS (Public Addresses extracted from your data)
# ------------------------------------------------------------------------------
EVM_WALLET = "0xd1597C721500659fD4A34f7fB7a3B50B0EAb484a"

# Your Solana Wallets (Primary & Sub-accounts)
SOLANA_WALLETS = [
    "9SRTywssWCxcqzsN7J6UVDG28yae4j6UACjqZcHrR5kV",
    "3kaffFzheGJZ91HiXrLgoGXuY8BEdgMAAyMmp6TyGaaw",
    "HpHNn675qDgDk2LHUTUuXnw65i2zfTZ6deSTHVqD9jaF",
    "AW2u89EDdBEUoZ64FnoB1wkyFos3T3XhmsPYpKjQswLA",
    "3WUGr3pstHfkJtBW6isEZe19SiRZQe5ASzF2rwKp3Sev",
    "8UMFS9KskNesw8X63ceE4grJZ9d5B4Z8kFpywqjQSHkx",
    "He8xgT26ZEwpH6AxLFF6btKqG4z2dBgw9irdStGCXe7M"
]

INITIAL_INVESTMENT_USD = 1000.00  # ابتدائی سرمایہ

# ------------------------------------------------------------------------------
# 3. LIVE BLOCKCHAIN & PRICE FETCHERS
# ------------------------------------------------------------------------------
def get_evm_balance(rpc_url, address):
    payload = {"jsonrpc": "2.0", "method": "eth_getBalance", "params": [address, "latest"], "id": 1}
    try:
        res = requests.post(rpc_url, json=payload, timeout=8)
        if res.status_code == 200:
            wei = int(res.json().get("result", "0x0"), 16)
            return wei / 1e18
    except Exception:
        pass
    return 0.0

def get_solana_balance(address):
    payload = {"jsonrpc": "2.0", "id": 1, "method": "getBalance", "params": [address]}
    try:
        res = requests.post(SOLANA_RPC_URL, json=payload, timeout=8)
        if res.status_code == 200:
            lamports = res.json().get("result", {}).get("value", 0)
            return lamports / 1e9
    except Exception:
        pass
    return 0.0

def get_live_prices():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana&vs_currencies=usd"
    try:
        res = requests.get(url, timeout=8)
        if res.status_code == 200:
            data = res.json()
            return data.get("ethereum", {}).get("usd", 3000.0), data.get("solana", {}).get("usd", 180.0)
    except Exception:
        pass
    return 3000.0, 180.0

# ------------------------------------------------------------------------------
# 4. MAIN LIVE MONITORING LOOP
# ------------------------------------------------------------------------------
def run_live_dashboard():
    print("==================================================================")
    print("   SDN NEWS & MULTI-WALLET TRUST PORTAL LIVE MONITOR              ")
    print("   Bureau Chief: Jamil Ahmed Kalyal | www.SDNNews.com             ")
    print("==================================================================")
    print(f"[TRUST PORTAL] Connected via Agent ID: {TRUST_AGENT_ID}")
    print("------------------------------------------------------------------\n")

    cycle = 1
    accumulated_gas_usd = 0.16

    while True:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{now}] --- Live Sync Cycle #{cycle} ---")

        # Fetch Live Prices
        eth_price, sol_price = get_live_prices()

        # Fetch EVM Balances (Ethereum & Base)
        eth_bal = get_evm_balance(ETH_RPC_URL, EVM_WALLET)
        base_bal = get_evm_balance(BASE_RPC_URL, EVM_WALLET)

        # Fetch All Solana Wallets Balances
        total_sol_bal = 0.0
        print(f"  > EVM Main Wallet ({EVM_WALLET[:8]}...)")
        print(f"      - Ethereum Mainnet : {eth_bal:.5f} ETH (${eth_bal * eth_price:,.2f})")
        print(f"      - Base Network     : {base_bal:.5f} ETH (${base_bal * eth_price:,.2f})")

        print("  > Solana Wallets Group:")
        for idx, sol_addr in enumerate(SOLANA_WALLETS, 1):
            s_bal = get_solana_balance(sol_addr)
            total_sol_bal += s_bal
            if s_bal > 0:
                print(f"      - Account #{idx} ({sol_addr[:6]}...): {s_bal:.4f} SOL")

        # Calculations
        total_evm_usd = (eth_bal + base_bal) * eth_price
        total_sol_usd = total_sol_bal * sol_price
        gross_usd = total_evm_usd + total_sol_usd
        net_usd = max(0.0, gross_usd - accumulated_gas_usd)
        profit_usd = net_usd - INITIAL_INVESTMENT_USD
        profit_pct = (profit_usd / INITIAL_INVESTMENT_USD) * 100 if INITIAL_INVESTMENT_USD > 0 else 0.0

        print("  --------------------------------------------------------------")
        print(f"  * Total Gross Portfolio : ${gross_usd:,.2f}")
        print(f"  * Gas Fee Deducted      : ${accumulated_gas_usd:,.2f}")
        print(f"  * Net Portfolio Value   : ${net_usd:,.2f}")
        print(f"  * Live Net Profit / Loss: ${profit_usd:+,.2f} ({profit_pct:+.2f}%)")
        print("==================================================================\n")

        cycle += 1
        time.sleep(60)  # ہر 1 منٹ بعد لائیو اپ ڈیٹ

if __name__ == "__main__":
    run_live_dashboard()
