import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';

// ==========================================
// 1. عمومی کنفیگریشن اور API کیی
// ==========================================
const TATUM_API_KEY = 'T-6aada5ee2e4a995e01b3fdf6-edd59d5d95ee46688291765c';

const ENDPOINTS = {
  SOLANA: 'https://solana-mainnet.gateway.tatum.io',
  BSC: 'https://bsc-mainnet.gateway.tatum.io',
  BASE: 'https://base-mainnet.gateway.tatum.io',
  ETHEREUM: 'https://ethereum-mainnet.gateway.tatum.io',
  HYPEREVM: 'https://hyperevm-mainnet.gateway.tatum.io',
  ROBINHOOD: 'https://robinhood-mainnet.gateway.tatum.io',
  XLAYER: 'https://xlayer-mainnet.gateway.tatum.io',
};

// EVM Provider بنانے کا مددگار فنکشن
function createEvmProvider(url: string) {
  return new ethers.JsonRpcProvider({
    url: url,
    headers: { 'x-api-key': TATUM_API_KEY },
  });
}

// ==========================================
// 2. EVM چینز کا بیلنس فیچ کرنے کا فنکشن
// ==========================================
export async function getEvmNativeBalance(chainName: keyof typeof ENDPOINTS, walletAddress: string) {
  try {
    const provider = createEvmProvider(ENDPOINTS[chainName]);
    const balance = await provider.getBalance(walletAddress);
    const formatted = ethers.formatEther(balance);
    console.log(`[${chainName}] ${walletAddress} -> Balance: ${formatted}`);
    return formatted;
  } catch (error) {
    console.error(`❌ [${chainName}] Fetch Error:`, error);
    return '0';
  }
}

// ==========================================
// 3. Solana کا بیلنس فیچ کرنے کا فنکشن
// ==========================================
export async function getSolanaBalance(solWalletAddress: string) {
  try {
    const connection = new Connection(ENDPOINTS.SOLANA, {
      commitment: 'confirmed',
      httpHeaders: { 'x-api-key': TATUM_API_KEY },
    });
    const pubKey = new PublicKey(solWalletAddress);
    const balance = await connection.getBalance(pubKey);
    const sol = balance / 1e9;
    console.log(`[SOLANA] ${solWalletAddress} -> Balance: ${sol} SOL`);
    return sol;
  } catch (error) {
    console.error(`❌ [SOLANA] Fetch Error:`, error);
    return 0;
  }
}

// ==========================================
// 4. تمام چینز کا ملٹی چین ڈیٹا ایک ساتھ حاصل کریں
// ==========================================
export async function fetchAllChainsPortfolio(evmAddress: string, solAddress: string) {
  console.log('\n🌐 --- SDN News Unified Multi-Chain Tracking --- 🌐\n');

  // EVM چینز کی لسٹ
  const evmChains: (keyof typeof ENDPOINTS)[] = ['BSC', 'BASE', 'ETHEREUM', 'HYPEREVM', 'ROBINHOOD', 'XLAYER'];

  // تمام EVM ریکویسٹس ایک ساتھ چلائیں
  const evmResults = await Promise.all(
    evmChains.map(async (chain) => {
      const bal = await getEvmNativeBalance(chain, evmAddress);
      return { chain, balance: bal };
    })
  );

  // سولانا کا بیلنس حاصل کریں
  const solBalance = await getSolanaBalance(solAddress);

  return {
    evmAddress,
    solAddress,
    solana: solBalance,
    evmBalances: evmResults,
  };
}

// ==========================================
// 5. ایگزیکیوشن (Testing)
// ==========================================
async function main() {
  const sampleEvmWallet = '0xac3b582a93902187f5492d3b24d7756f84d6a92f'; // EVM / Base Wallet
  const sampleSolWallet = '9Ud1hn6e4PptCY57jgczZQRHWohh5VvDhje46cjU7sXD'; // Solana Wallet

  await fetchAllChainsPortfolio(sampleEvmWallet, sampleSolWallet);
}

main();
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum';

const TATUM_API_KEY = 'T-6aada5ee2e4a995e01b3fdf6-edd59d5d95ee46688291765c';

export async function getEnsWalletInsights(ensDomain: string) {
  try {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: TATUM_API_KEY },
    });

    // 1. ENS سے والیٹ کا لائیو پورٹ فولیو اور بیلنس فیچ کریں
    const balance = await tatum.address.getBalance({
      addresses: [ensDomain],
    });

    console.log(`[Data Insights] ${ensDomain} Balance:`, balance.data);
    return balance.data;
  } catch (error) {
    console.error('❌ Data Insights Fetch Error:', error);
  }
}

// استعمال کرنے کا طریقہ:
// getEnsWalletInsights('punk6529.eth');
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum';

const TATUM_API_KEY = 'T-6aada5ee2e4a995e01b3fdf6-edd59d5d95ee46688291765c';

export async function getWalletNfts(walletAddress: string) {
  try {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: TATUM_API_KEY },
    });

    // والٹ میں موجود تمام NFTs کا لائیو ڈیٹا فیچ کریں
    const nftBalances = await tatum.nft.getBalance({
      addresses: [walletAddress],
    });

    console.log(`[NFT Holdings] ${walletAddress}:`, nftBalances.data);
    return nftBalances.data;
  } catch (error) {
    console.error('❌ NFT Fetch Error:', error);
  }
}
NEXT_PUBLIC_APP_URL=https://jamil-wallet-app.vercel.app
NEXT_PUBLIC_TATUM_API_KEY=T-6aada5ee2e4a995e01b3fdf6-edd59d5d95ee46688291765c
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum';

const TATUM_API_KEY = 'T-6aada5ee2e4a995e01b3fdf6-edd59d5d95ee46688291765c';

export async function getNftMetadataDetails(contractAddress: string, tokenId: string) {
  try {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: TATUM_API_KEY },
    });

    // NFT کا مکمل میٹا ڈیٹا فیچ کریں
    const nftData = await tatum.nft.getNftMetadata({
      contractAddress: contractAddress,
      tokenId: tokenId,
    });

    console.log('[NFT Metadata]:', nftData.data);
    return nftData.data;
  } catch (error) {
    console.error('❌ Metadata Fetch Error:', error);
  }
}
import { ethers } from 'ethers';

const TATUM_ETH_RPC = 'https://ethereum-mainnet.gateway.tatum.io';
const TATUM_API_KEY = 'T-6aada5ee2e4a995e01b3fdf6-edd59d5d95ee46688291765c';

// Tatum Provider
const provider = new ethers.JsonRpcProvider({
  url: TATUM_ETH_RPC,
  headers: { 'x-api-key': TATUM_API_KEY },
});

export async function resolveEnsAndFetchBalance(ensName: string) {
  try {
    // 1. ENS ڈومین سے اصل 0x والٹ ایڈریس حاصل کریں
    const walletAddress = await provider.resolveName(ensName);
    
    if (!walletAddress) {
      console.log(`❌ ENS Domain ${ensName} ناٹ فاؤنڈ!`);
      return null;
    }

    // 2. والٹ کا لائیو ETH بیلنس حاصل کریں
    const balance = await provider.getBalance(walletAddress);
    const formattedBalance = ethers.formatEther(balance);

    console.log(`[ENS Insight] ${ensName} (${walletAddress}) -> Balance: ${formattedBalance} ETH`);
    
    return {
      ensName,
      walletAddress,
      balance: formattedBalance,
    };
  } catch (error) {
    console.error('❌ ENS Resolve Error:', error);
  }
}

// استعمال کرنے کی مثال:
// resolveEnsAndFetchBalance('vitalik.eth');



