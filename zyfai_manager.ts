import { createWalletClient, createPublicClient, http, parseUnits, formatUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import * as dotenv from 'dotenv';

dotenv.config();

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
const publicClient = createPublicClient({ chain: base, transport: http() });
const walletClient = createWalletClient({ account, chain: base, transport: http() });

// آپ کا مخصوص والٹ ایڈریس
const WALLET_ADDRESS = '0xcBcA630521176E76D8a5F55F78703B92336A1411' as `0x${string}`;

// ٹوکن کا کانٹریکٹ ایڈریس یہاں درج کریں
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
] as const;

async function checkBalance() {
  try {
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

    console.log(`💰 والٹ (${WALLET_ADDRESS}) کا ٹوکن بیلنس: ${formatUnits(balance, decimals)}`);
  } catch (error) {
    console.error('❌ خرابی:', error);
  }
}

checkBalance();
