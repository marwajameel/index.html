import { ethers } from "ethers";

// 1. نیٹ ورک اور والٹ کی سیٹ اپ
const RPC_URL = "https://mainnet.base.org"; // Base Mainnet RPC
const PRIVATE_KEY = "YOUR_PRIVATE_KEY_HERE"; // بھیجنے والے اکاؤنٹ کی پرائیویٹ کی

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// 2. این ایف ٹی کنٹریکٹ اور ٹرانسفر کی تفصیلات
const nftContractAddress = "0x00B1087eA844f89971BDF9F9ee83bB0B73C2dE9e"; // NFT Contract Address
const recipientAddress = "YOUR_RECEIVER_WALLET_ADDRESS"; // وصول کرنے والے والٹ کا ایڈریس
const tokenId = "YOUR_TOKEN_ID_HERE"; // این ایف ٹی کا ٹوکن آئی ڈی

// ERC-721 کا بنیادی ABI
const abi = [
  "function safeTransferFrom(address from, address to, uint256 tokenId) external"
];

async function transferNFT() {
  try {
    const contract = new ethers.Contract(nftContractAddress, abi, wallet);

    console.log(`NFT ٹرانسفر ہونا شروع ہو رہا ہے... Token ID: ${tokenId}`);

    // safeTransferFrom کے ذریعے ٹرانسفر کی کال
    const tx = await contract.safeTransferFrom(
      wallet.address,
      recipientAddress,
      tokenId
    );

    console.log(`ٹرانزیکشن بلاک چین پر بھیج دی گئی ہے۔ Hash: ${tx.hash}`);

    // ٹرانزیکشن کی تصدیق کا انتظار
    const receipt = await tx.wait();
    console.log(`مبارک ہو! NFT کامیابی سے ٹرانسفر ہو چکا ہے۔ Block: ${receipt.blockNumber}`);
  } catch (error) {
    console.error("ٹرانسفر کے دوران خرابی:", error);
  }
}

transferNFT();
