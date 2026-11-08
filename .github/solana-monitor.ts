import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// آپ کا سولانا ریسیونگ اور ودڈرا والٹ ایڈریس
const SOLANA_RECEIVING_ADDRESS = 'A9aEY896KTSgWe8HdU6L3sSxQjdoca6r39difpjDAh7Q';

// سولانا مین نیٹ کا پبلک کنکشن (بغیر کسی پیڈ API کے)
const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

async function checkSolanaWalletBalance() {
  try {
    const publicKey = new PublicKey(SOLANA_RECEIVING_ADDRESS);
    const balanceInLamports = await connection.getBalance(publicKey);
    
    // Lamports کو SOL میں تبدیل کرنا (1 SOL = 10^9 Lamports)
    const balanceInSol = balanceInLamports / 1e9;
    
    console.log(`Solana Wallet Address: ${SOLANA_RECEIVING_ADDRESS}`);
    console.log(`Current Balance: ${balanceInSol} SOL`);
    
    return balanceInSol;
  } catch (error) {
    console.error('Error fetching Solana balance:', error);
  }
}

// والٹ کا بیلنس چیک کرنے کے لیے فنکشن کال کریں
checkSolanaWalletBalance();
