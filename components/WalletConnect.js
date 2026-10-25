import { ethers } from "ethers";

// 1. والٹ سے کنیکٹ کرنے کا خودکار فنکشن
async function connectWalletAutomatically() {
  try {
    // چیک کریں کہ کیا براؤزر میں Web3 Provider (Ethereum object) موجود ہے
    if (typeof window.ethereum !== "undefined") {
      console.log("Web3 Provider مل گیا ہے!");

      // صارف سے والٹ کنیکٹ کرنے کی اجازت لیں
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];

      // Ethers.js پرووائڈر اور سائینر سیٹ اپ کریں
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();

      console.log("کنیکٹ شدہ والٹ ایڈریس:", userAddress);
      console.log("نیٹ ورک چین ID:", network.chainId);

      // بیس نیٹ ورک (Base Chain ID: 8453) کی تصدیق
      if (network.chainId !== 8453) {
        await switchToBaseNetwork();
      }

      // UI پر والٹ ایڈریس اپ ڈیٹ کریں
      updateDashboardUI(userAddress);
      return { provider, signer, userAddress };
    } else {
      alert("براہِ کرم Bitget Wallet، MetaMask یا کوئی بھی Web3 والٹ براؤزر میں انسٹال کریں۔");
    }
  } catch (error) {
    console.error("والٹ کنیکشن میں خرابی:", error.message);
  }
}

// 2. نیٹ ورک کو خودکار طریقے سے Base (Chain ID 8453) پر سوئچ کرنے کا فنکشن
async function switchToBaseNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x2105" }], // 8453 کا Hexadecimal کوڈ 0x2105 ہے
    });
  } catch (switchError) {
    // اگر بیس نیٹ ورک والٹ میں پہلے سے شامل نہیں ہے تو اسے شامل کریں
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x2105",
            chainName: "Base Mainnet",
            nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://mainnet.base.org"],
            blockExplorerUrls: ["https://basescan.org"],
          },
        ],
      });
    }
  }
}

// 3. ڈیش بورڈ UI اپ ڈیٹ کرنے کا فنکشن
function updateDashboardUI(address) {
  const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  const statusElement = document.getElementById("walletStatus");
  if (statusElement) {
    statusElement.innerText = `کامیابی سے کنیکٹ ہو گیا: ${shortAddress}`;
  }
}

// پیج لوڈ ہوتے ہی یا کنیکٹ کے بٹن پر یہ فنکشن چلوائیں
document.getElementById("connectBtn")?.addEventListener("click", connectWalletAutomatically);
