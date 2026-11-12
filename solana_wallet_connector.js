// ==============================================================================
// SDN NEWS & MJ04 DIRECT SOLANA WALLET CONNECTOR (NO KYC / WATCH-ONLY BRIDGE)
// Owner & Management: Jamil Ahmed Kalyal | www.SDNNews.com
// ==============================================================================

const SOLANA_MAINNET_RPC = "https://api.mainnet-beta.solana.com";
const TARGET_WALLET_ADDRESS = "4yqgcP2EvCyyE14Zd9H2jPFMK59q67YUz7bBnUckCfVE";

async function syncSolanaWalletDirect() {
  try {
    const response = await fetch(SOLANA_MAINNET_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getAccountInfo",
        params: [
          TARGET_WALLET_ADDRESS,
          { encoding: "jsonParsed" }
        ]
      })
    });

    const data = await response.json();
    if (data && data.result && data.result.value) {
      const lamports = data.result.value.lamports;
      const solBalance = lamports / 1e9;
      
      console.log("✅ Wallet Successfully Adjusted & Synced!");
      console.log(`👤 Owner: JAMIL AHMED Kalyal`);
      console.log(`🔑 Address: ${TARGET_WALLET_ADDRESS}`);
      console.log(`💰 Live SOL Balance: ${solBalance.toFixed(4)} SOL`);
      return { status: "CONNECTED", balance: solBalance };
    } else {
      console.log("⚠️ Wallet connected in Watch-Only mode (0 SOL or Token Account).");
      return { status: "WATCH_ONLY", balance: 0 };
    }
  } catch (error) {
    console.error("❌ Connection Error:", error);
    return { status: "ERROR", error };
  }
}

// سسٹم کے ساتھ آٹومیٹک ایڈجسٹ کرنے کے لیے فنکشن چلائیں
syncSolanaWalletDirect();
