import { createWalletClient, createPublicClient, http, parseUnits, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import * as dotenv from 'dotenv';

dotenv.config();

// 1. ماحول (Environment) سے محفوظ پرائیویٹ کی اور ترتیبات
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

// اہم ایڈریسز (آپ کے اسکرین شاٹ اور سیٹ اپ کے مطابق)
const TARGET_RECIPIENT = '0x056e4D003E89934231DA26e04835D112056250c4'; // منزل کا والٹ ایڈریس
const DEX_ROUTER_ADDRESS = '0xb300000b72DEAEb607a12d5f54773D1C19c7028d'; // DEX روٹر ایڈریس
const MJ04_TOKEN_ADDRESS = '0xdac17000000000000000000000000000000003a5'; // آپ کا ٹوکن کانٹریکٹ

/**
 * فنکشن 1: ٹوکن ڈائریکٹ ٹرانسفر (Transfer Tokens)
 */
async function transferTokens(tokenAddress: `0x${string}`, recipient: `0x${string}`, amount: string) {
  try {
    console.log(`[ٹرانسفر] ${amount} ٹوکنز ${recipient} کو بھیجے جا رہے ہیں...`);
    const parsedAmount = parseUnits(amount, 18); // اگر ٹوکن کے 18 ڈیسیمل ہوں

    const txHash = await walletClient.writeContract({
      address: tokenAddress,
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
      args: [recipient, parsedAmount],
    });

    console.log(`✅ ٹرانزیکشن کامیاب! ٹرانسفر ہیش: ${txHash}`);
    return txHash;
  } catch (error) {
    console.error('❌ ٹرانسفر میں خرابی:', error);
  }
}

/**
 * فنکشن 2: ٹوکن خریدنا / سویپ کرنا (Buy/Swap Tokens via Router)
 */
async function buyTokensWithETH(amountInETH: string, minTokensOut: string) {
  try {
    console.log(`[خریداری] ${amountInETH} ETH کے ذریعے ٹوکنز خریدے جا رہے ہیں...`);
    
    // Router کو ETH بھیج کر ٹوکن خریدنے کی آن چین ٹرانزیکشن
    const txHash = await walletClient.writeContract({
      address: DEX_ROUTER_ADDRESS,
      abi: [
        {
          name: 'swapExactETHForTokens',
          type: 'function',
          stateMutability: 'payable',
          inputs: [
            { name: 'amountOutMin', type: 'uint256' },
            { name: 'path', type: 'address[]' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' }
          ],
          outputs: [{ type: 'uint256[]' }]
        }
      ],
      functionName: 'swapExactETHForTokens',
      args: [
        parseUnits(minTokensOut, 18),
        ['0x4200000000000000000000000000000000000006', MJ04_TOKEN_ADDRESS], // WETH -> Target Token
        account.address,
        BigInt(Math.floor(Date.now() / 1000) + 60 * 20) // 20 منٹ کی ڈید لائن
      ],
      value: parseEther(amountInETH),
    });

    console.log(`✅ خرید مکمل! ٹرانزیکشن ہیش: ${txHash}`);
    return txHash;
  } catch (error) {
    console.error('❌ خرید میں خرابی:', error);
  }
}

// مین ایگزیکیوشن فنکشن
async function main() {
  console.log('--- آن چین آپریشن کا آغاز ---');
  
  // 1. خریدنے کا طریقہ (مثال: 0.001 ETH سے ٹوکن بائے کرنا)
  // await buyTokensWithETH('0.001', '100');

  // 2. ٹرانسفر کا طریقہ (مثال: 1000 ٹوکنز بھیجنا)
  await transferTokens(MJ04_TOKEN_ADDRESS, TARGET_RECIPIENT, '1000');
}

main();
