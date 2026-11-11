import { createWalletClient, createPublicClient, http, parseUnits, formatUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import * as dotenv from 'dotenv';

dotenv.config();

// پرائیویٹ کی سے والٹ کا خودکار انتخاب
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

// آپ کا والٹ ایڈریس
const WALLET_ADDRESS = account.address;

// جس ٹوکن کو چیک/مینج کرنا ہے اس کا کانٹریکٹ ایڈریس
const TOKEN_ADDRESS = '0xYOUR_TOKEN_CONTRACT_ADDRESS' as `0x${string}`;

const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint8' }],
  },
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
] as const;

async function main() {
  try {
    console.log(`🔗 منسلک والٹ: ${WALLET_ADDRESS}`);

    const decimals = await publicClient.readContract({
      address: TOKEN_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'decimals',
    });

    const balance = await publicClient.readContract({
      address: TOKEN_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [WALLET_ADDRESS],
    });

    console.log(`💰 ٹوکن بیلنس: ${formatUnits(balance, decimals)}`);

  } catch (error) {
    console.error('❌ خرابی:', error);
  }
}

main();
