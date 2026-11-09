import { createWalletClient, createPublicClient, http, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import * as dotenv from 'dotenv';

dotenv.config();

// پرائیویٹ کی کو ماحول (Environment) سے محفوظ طریقے سے لوڈ کرنا
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

// ERC20 USDT کانٹریکٹ کا ایڈریس اور ABI
const USDT_ADDRESS = '0xdac17000000000000000000000000000000003a5'; // مثال کے طور پر کانٹریکٹ
const recipientAddress = '0xআপনার_منزل_ایڈریس'; // جہاں فنڈز بھیجنے ہیں

async function executeAutomatedWithdrawal(amount: string) {
  try {
    console.log('محفوظ ٹرانزیکشن کی جانچ کی جا رہی ہے...');
    
    // فنڈز ٹرانسفر کا خودکار عمل
    const hash = await walletClient.writeContract({
      address: USDT_ADDRESS,
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
      args: [recipientAddress, parseUnits(amount, 6)], // USDT کے لیے 6 ڈیسیملز
    });

    console.log(`ٹرانزیکشن کامیابی سے سبمٹ ہو گئی! ہیش: ${hash}`);
  } catch (error) {
    console.error('خودکار ٹرانسفر میں خرابی:', error);
  }
}

// مثال کے طور پر 10 USDT ودڈرا کرنا
executeAutomatedWithdrawal('10');
