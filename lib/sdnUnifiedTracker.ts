import { ethers } from 'ethers';
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum';

const TATUM_API_KEY = 'T-6aada5ee2e4a995e01b3fdf6-edd59d5d95ee46688291765c';
const VITALIK_WALLET = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

export async function getVitalikFullPortfolio() {
  try {
    // 1. ETH لائیو بیلنس فیچ کریں
    const provider = new ethers.JsonRpcProvider({
      url: 'https://ethereum-mainnet.gateway.tatum.io',
      headers: { 'x-api-key': TATUM_API_KEY },
    });
    
    const rawBalance = await provider.getBalance(VITALIK_WALLET);
    const ethBalance = ethers.formatEther(rawBalance);

    // 2. Tatum SDK کے ذریعے NFTs اور ٹوکنز کا ڈیٹا فیچ کریں
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: TATUM_API_KEY },
    });

    const nftBalances = await tatum.nft.getBalance({
      addresses: [VITALIK_WALLET],
    });

    console.log(`[Vitalik Wallet Data] Address: ${VITALIK_WALLET}`);
    console.log(`[ETH Balance]: ${ethBalance} ETH`);
    console.log(`[NFT Holdings Count]:`, nftBalances.data?.length || 0);

    return {
      address: VITALIK_WALLET,
      ens: 'vitalik.eth',
      ethBalance,
      nfts: nftBalances.data,
    };
  } catch (error) {
    console.error('❌ Data Fetch Error:', error);
  }
}
