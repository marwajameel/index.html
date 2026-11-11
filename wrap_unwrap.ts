import { createWalletClient, createPublicClient, http, parseEther, formatEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains'; // یا اگر ایتھریم مین نیٹ ہے تو 'viem/chains' سے 'mainnet' درآمد کریں
import * as dotenv from 'dotenv';

dotenv.config();

// اکاؤنٹ اور کلائنٹ سیٹ اپ
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
const publicClient = createPublicClient({ chain: base, transport: http() });
const walletClient = createWalletClient({ account, chain: base, transport: http() });

// WETH کانٹریک트 ایڈریس (Ethereum Mainnet / Base)
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`;

// WETH کانٹریکٹ کا ABI (صرف deposit اور withdraw کے لیے)
const WETH_ABI = [
  {
    name: 'deposit',
    type: 'function',
    stateMutability: 'payable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'wad', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
] as const;

// 1. ETH کو WETH میں تبدیل کرنے کا فنکشن (Wrap)
async function wrapEth(amountInEth: string) {
  try {
    console.log(`🔄 ${amountInEth} ETH کو WETH میں تبدیل کیا جا رہا ہے...`);
    
    const txHash = await walletClient.writeContract({
      address: WETH_ADDRESS,
      abi: WETH_ABI,
      functionName: 'deposit',
      value: parseEther(amountInEth), // جتنی مقدار ریپ کرنی ہے
    });

    console.log(`✅ کامیابی سے Wrap ہو گیا! Transaction Hash: ${txHash}`);
  } catch (error) {
    console.error('❌ Wrap کرنے میں خرابی:', error);
  }
}

// 2. WETH کو واپس ETH میں لانے کا فنکشن (Unwrap)
async function unwrapWeth(amountInWeth: string) {
  try {
    console.log(`🔄 ${amountInWeth} WETH کو واپس ETH میں لایا جا رہا ہے...`);
    
    const txHash = await walletClient.writeContract({
      address: WETH_ADDRESS,
      abi: WETH_ABI,
      functionName: 'withdraw',
      args: [parseEther(amountInWeth)],
    });

    console.log(`✅ کامیابی سے Unwrap ہو گیا! Transaction Hash: ${txHash}`);
  } catch (error) {
    console.error('❌ Unwrap کرنے میں خرابی:', error);
  }
}

// اسکرپٹ چلانے کی مثال (مثال کے طور پر 0.01 ETH کو Wrap کرنا)
async function run() {
  // بیلنس چیک کریں
  const balance = await publicClient.readContract({
    address: WETH_ADDRESS,
    abi: WETH_ABI,
    functionName: 'balanceOf',
    args: [account.address],
  });
  console.log(`💰 موجودہ WETH بیلنس: ${formatEther(balance)} WETH`);

  // یہاں فنکشن کال کریں (ضرورت کے مطابق uncomment کریں)
  // await wrapEth("0.01");  // ETH سے WETH بنانے کے لیے
  // await unwrapWeth("0.01"); // WETH سے واپس ETH بنانے کے لیے
}

run();
