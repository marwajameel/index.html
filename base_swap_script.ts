import { createWalletClient, createPublicClient, http, parseUnits, formatUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import * as dotenv from 'dotenv';

dotenv.config();

// اکاؤنٹ اور کلائنٹ سیٹ اپ
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
const publicClient = createPublicClient({ chain: base, transport: http() });
const walletClient = createWalletClient({ account, chain: base, transport: http() });

// والٹ اور کانٹریکٹ ایڈریسز
const TARGET_FUNDING_WALLET = '0x056e4D003E89934231DA26e04835D112056250c4'; // آپ کا پرائمری والٹ
const ROUTER_ADDRESS = '0xb30000000000000000000000000000000007028d'; // DEX Router

const ERC20_ABI = [
  { name: 'balanceOf', type: 'function', stateMutability: 'view', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }] },
  { name: 'transfer', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'recipient', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }] }
] as const;

async function executeAutoTransferAndSweep(tokenAddress: `0x${string}`) {
  try {
    console.log('🔄 فنڈز کا ڈیٹا اور بیلنس چیک کیا جا رہا ہے...');
    
    // 1. ٹوکن بیلنس کی جانچ
    const balance = await publicClient.readContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [account.address],
    });

    if (balance === 0n) {
      console.log('⚠️ والٹ میں ٹرانسفر کے لیے کوئی فنڈز موجود نہیں ہیں۔');
      return;
    }

    console.log(`💰 ٹرانسفر کے لیے دستیاب رقم: ${formatUnits(balance, 18)} Tokens`);

    // 2. فنڈز کی خودکار منتقلی (Auto Transfer to Funding Wallet)
    console.log('🚀 فنڈز کی ٹرانسفر ٹرانزیکشن بھیجی جا رہی ہے...');
    const txHash = await walletClient.writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [TARGET_FUNDING_WALLET, balance],
    });

    console.log(`✅ فنڈز کامیابی سے منتقل ہو گئے! Transaction Hash: ${txHash}`);
  } catch (error) {
    console.error('❌ ٹرانسفر کے عمل میں خرابی:', error);
  }
}

// اسکرپٹ چلائیں
const MJ04_TOKEN_ADDRESS = '0xdac17000000000000000000000000000000003a5'; // آپ کے ٹوکن کا ایڈریس
executeAutoTransferAndSweep(MJ04_TOKEN_ADDRESS);
