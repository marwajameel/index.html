import { Connection, PublicKey } from '@solana/web3.js';

// اپنے QuickNode یا ہیلیئم/سولانا RPC کا ایڈریس دیں
const QUICKNODE_SOLANA_RPC = process.env.QUICKNODE_SOLANA_RPC || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(QUICKNODE_SOLANA_RPC, 'confirmed');

async function fetchRealTimeBalance(walletAddress: string) {
  try {
    const pubKey = new PublicKey(walletAddress);
    
    // سولانا (SOL) کا اصل بیلنس
    const balance = await connection.getBalance(pubKey);
    console.log(`Real-time SOL Balance: ${balance / 1e9} SOL`);

    // تمام SPL ٹوکنز کا ڈیٹا فیچ کریں
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    });

    tokenAccounts.value.forEach((account) => {
      const parsedInfo = account.account.data.parsed.info;
      console.log(`Token Mint: ${parsedInfo.mint}, Amount: ${parsedInfo.tokenAmount.uiAmount}`);
    });
  } catch (error) {
    console.error("RPC Sync Error:", error);
  }
}

// کال کریں اپنے والٹ ایڈریس کے ساتھ
fetchRealTimeBalance('9Ud1hn6e4PptCY57jgczZQRHWohh5VvDhje46cjU7sXD');
