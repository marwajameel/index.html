// dapp_dev_helper.js
// MetaMask SDK اور Base RPC کو چیک کرنے کا مکمل اسکرپٹ

const axios = require('axios');

// 1. بیس مین نیٹ (Base Mainnet) کا RPC URL (Coinbase Developer Platform)
const BASE_RPC_URL = "https://api.developer.coinbase.com/rpc/v1/base/CEuN7z8myGVgJo1Op29D4nbyvRAggXcy";

// 2. آن چین اٹیسٹیشن (Onchain Attestation) کی تفصیلات
const ATTESTATION_UID = "0x9c2108e7683176078b834068c0a8e6539213a56c3c4ae029d999f69840149911";
const TX_HASH = "0x51fcfd20dadda2c81399d7dc9fd7cfb4abd669e587eb71ce32c40ebb67739456";

async function runDappDevCheck() {
    console.log("==================================================");
    console.log("        DAPP DEV & BASE CHAIN CONNECTOR           ");
    console.log("==================================================\n");

    try {
        // Base Node سے لائیو بلاک نمبر اور گیس کی قیمت حاصل کرنا
        const blockResponse = await axios.post(BASE_RPC_URL, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_blockNumber",
            params: []
        });

        const gasResponse = await axios.post(BASE_RPC_URL, {
            jsonrpc: "2.0",
            id: 2,
            method: "eth_gasPrice",
            params: []
        });

        if (blockResponse.status === 200) {
            const blockNumber = parseInt(blockResponse.data.result, 16);
            const gasPriceWei = parseInt(gasResponse.data.result, 16);
            const gasPriceGwei = (gasPriceWei / 1e9).toFixed(4);

            console.log("[+] Base Mainnet Status: CONNECTED");
            console.log(`[+] Current Block Number: ${blockNumber.toLocaleString()}`);
            console.log(`[+] Current Gas Price:   ${gasPriceGwei} Gwei\n`);

            console.log("--------------------------------------------------");
            console.log("           ATTESTATION & METAMASK DATA            ");
            console.log("--------------------------------------------------");
            console.log(`• Issuer (Coinbase): verifications.coinbase.eth`);
            console.log(`• Holder:            wafflingabout.eth`);
            console.log(`• UID:               ${ATTESTATION_UID}`);
            console.log(`• Tx Hash:           ${TX_HASH}\n`);

            console.log("• View on EAS Scan: https://base.easscan.org/attestation/view/" + ATTESTATION_UID);
            console.log("• View on BaseScan: https://basescan.org/tx/" + TX_HASH);
            console.log("==================================================");
        }
    } catch (error) {
        console.error("[!] Connection Error:", error.message);
    }
}

runDappDevCheck();
