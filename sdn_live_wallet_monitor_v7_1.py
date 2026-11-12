# ==============================================================================
# SDN NEWS & WEB3 VIBENET AUTO-SYNC ENGINE (V7.1)
# Bureau Chief: Jamil Ahmed Kalyal | www.SDNNews.com
# ==============================================================================

import time
import requests
from datetime import datetime

# ------------------------------------------------------------------------------
# 1. API CREDENTIALS & VIBENET WEB3 ENDPOINTS
# ------------------------------------------------------------------------------
TRUST_AGENT_ID = "796c11e6-10b6-4c7f-ab01-ab990bdb8b87"

# Base Vibenet Network Details
VIBENET_CHAIN_ID = 84538453
VIBENET_RPC_URL = "https://rpc.vibes.base.org"

ETH_RPC_URL = "https://eth.llamarpc.com"
BSC_RPC_URL = "https://bsc-dataseed.binance.org/"
POLYGON_RPC_URL = "https://polygon-rpc.com"
SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"

# ------------------------------------------------------------------------------
# 2. WEB3 SMART CONTRACTS & WALLETS
# ------------------------------------------------------------------------------
EVM_WALLET_1 = "0xd1597C721500659fD4A34f7fB7a3B50B0EAb484a"
POLYGON_WALLET_2 = "0xa74D9D8CEFfd33d2E0C14270bF89879E21ea7B8B"

WEB3_CONTRACTS = {
    "BASE_DOMAIN": "jamilahmed.base.eth",
    "OPG_BSC": "0x5feCcD17C393CaF1001D18164236A37E731FCb9d",
    "OPG_BASE": "0xFbC2051AE2265686a469421b2C5A2D5462FbF5eB"
}

SOLANA_WALLETS = [
    "9WzD...AWWM",
    "9SRTywssWCxcqzsN7J6UVDG28yae4j6UACjqZcHrR5kV",
    "3kaffFzheGJZ91HiXrLgoGXuY8BEdgMAAyMmp6TyGaaw",
    "HpHNn675qDgDk2LHUTUuXnw65i2zfTZ6deSTHVqD9jaF",
    "AW2u89EDdBEUoZ64FnoB1wkyFos3T3XhmsPYpKjQswLA",
    "3WUGr3pstHfkJtBW6isEZe19SiRZQe5ASzF2rwKp3Sev",
    "8UMFS9KskNesw8X63ceE4grJZ9d5B4Z8kFpywqjQSHkx",
    "He8xgT26ZEwpH6AxLFF6btKqG4z2dBgw9irdStGCXe7M"
]

BITCOIN_WALLETS = [
    "bc1qmzgew3flv5lemf6ahsaqmx3th473lsz0zsgw50",
    "bc1pxj5eaw448vvs2g38m82knx0lnm9a84r2nrfrtf9p37nfd0dsv0yqspy6qv"
]

INITIAL_INVESTMENT_USD = 1000.00

# ------------------------------------------------------------------------------
# 3. BLOCKCHAIN & VIBENET FETCHERS
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
    if "..." in address:
        return 0.0
    payload = {"jsonrpc": "2.0", "id": 1, "method": "getBalance", "params": [address]}
    try:
        res = requests.post(SOLANA_RPC_URL, json=payload, timeout=8)
        if res.status_code == 200:
            lamports = res.json().get("result", {}).get("value", 0)
            return lamports / 1e9
    except Exception:
        pass
    return 0.0

def get_btc_balance(address):
    url = f"https://blockstream.info/api/address/{address}"
    try:
        res = requests.get(url, timeout=8)
        if res.status_code == 200:
            data = res.json()
            funded = data.get("chain_stats", {}).get("funded_txo_sum", 0)
            spent = data.get("chain_stats", {}).get("spent_txo_sum", 0)
            return (funded - spent) / 1e8
    except Exception:
        pass
    return 0.0

def get_live_prices():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana,bitcoin,binancecoin&vs_currencies=usd"
    try:
        res = requests.get(url, timeout=8)
        if res.status_code == 200:
            data = res.json()
            return (
                data.get("ethereum", {}).get("usd", 3000.0),
                data.get("solana", {}).get("usd", 180.0),
                data.get("bitcoin", {}).get("usd", 85000.0),
                data.get("binancecoin", {}).get("usd", 600.0)
            )
    except Exception:
        pass
    return 3000.0, 180.0, 85000.0, 600.0

# ------------------------------------------------------------------------------
# 4. MAIN VIBENET SYNC LOOP
# ------------------------------------------------------------------------------
def run_vibenet_sync_engine():
    print("==================================================================")
    print("   SDN NEWS & VIBENET BASE CHAIN AUTO-SYNC ENGINE (V7.1)          ")
    print("   Bureau Chief: Jamil Ahmed Kalyal | www.SDNNews.com             ")
    print("==================================================================")
    print(f"[VIBENET] Connected RPC : {VIBENET_RPC_URL} (Chain ID: {VIBENET_CHAIN_ID})")
    print(f"[WEB3 SYNC] Domain      : {WEB3_CONTRACTS['BASE_DOMAIN']}\n")

    cycle = 1
    accumulated_gas_usd = 0.16

    while True:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{now}] --- Vibenet & Multi-Chain Sync Cycle #{cycle} ---")

        eth_p, sol_p, btc_p, bnb_p = get_live_prices()

        # Fetch Balances using Vibenet RPC for Base and standard RPCs for others
        vibenet_base_bal = get_evm_balance(VIBENET_RPC_URL, EVM_WALLET_1)
        eth_bal = get_evm_balance(ETH_RPC_URL, EVM_WALLET_1)
        bnb_bal = get_evm_balance(BSC_RPC_URL, EVM_WALLET_1)
        total_sol = sum(get_solana_balance(a) for a in SOLANA_WALLETS)
        total_btc = sum(get_btc_balance(a) for a in BITCOIN_WALLETS)

        print(f"  > Vibenet Base Balance  : {vibenet_base_bal:.4f} ETH (Testnet)")
        print(f"  > Mainnet Balances      : ETH=${eth_bal*eth_p:,.2f} | BNB=${bnb_bal*bnb_p:,.2f}")
        print(f"  > Solana & Bitcoin      : SOL = {total_sol:.4f} | BTC = {total_btc:.6f}")

        gross_usd = ((eth_bal + vibenet_base_bal) * eth_p) + (bnb_bal * bnb_p) + (total_sol * sol_p) + (total_btc * btc_p)
        net_usd = max(0.0, gross_usd - accumulated_gas_usd)
        profit_usd = net_usd - INITIAL_INVESTMENT_USD
        profit_pct = (profit_usd / INITIAL_INVESTMENT_USD) * 100 if INITIAL_INVESTMENT_USD > 0 else 0.0

        print("  --------------------------------------------------------------")
        print(f"  * Gross Portfolio Value : ${gross_usd:,.2f}")
        print(f"  * Net Portfolio Value   : ${net_usd:,.2f}")
        print(f"  * Live Net Profit / Loss: ${profit_usd:+,.2f} ({profit_pct:+.2f}%)")
        print("==================================================================\n")

        cycle += 1
        time.sleep(60)

if __name__ == "__main__":
    run_vibenet_sync_engine()
