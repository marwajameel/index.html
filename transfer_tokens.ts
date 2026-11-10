import { createWalletClient, createPublicClient, http, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import * as dotenv from 'dotenv';

dotenv.config();

// ماحول (Environment) سے محفوظ طریقے سے پرائیویٹ کی لوڈ کرنا
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http(),
});

// ٹوکن کا کانٹریکٹ ایڈریس (یہاں آپ اپنا مطلوبہ USDT یا NVDAc ایڈریس درج کر سکتے ہیں)
const TOKEN_ADDRESS = '0xdac17000000000000000000000000000000003a5'; // مثال کے طور پر USDT کانٹریکٹ
const RECIPIENT_ADDRESS = '0xاپنا_منزل_والٹ_ایڈریس_یہاں_لکھیں'; // جہاں فنڈز بھیجنے ہیں

async function transferTokens() {
  try {
    console.log('ٹرানزیکشن کی تیاری کی جا رہی ہے...');
    
    // 1,000 ٹوکن کی رقم (USDT کے لیے 6 ڈیسیملز استعمال ہوتے ہیں)
    // اگر آپ دوسرے ٹوکن (جیسے 8 ڈیسیمل والے NVDAc) کے لیے کر رہے ہیں تو ڈیسیملز کی تعداد 8 کر لیں
    const amountToTransfer = parseUnits('1000', 6);

    const hash = await walletClient.writeContract({
      address: TOKEN_ADDRESS,
      abi: [
        {
          name: 'transfer',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'recipient', type: 'address' },
            { name: 'amount', type: 'uint256' }
          ],
          outputs: [{ type: 'bool' }]
        }
      ],
      functionName: 'transfer',
      args: [RECIPIENT_ADDRESS, amountToTransfer],
    });

    console.log(`1,000 ٹوکن کامیابی سے ٹرانسفر ہو گئے! ٹرانزیکشن ہیش: ${hash}`);
  } catch (error) {
    console.error('ٹکن ٹرانسفر میں خرابی پیش آگئی:', error);
  }
}

transferTokens();
