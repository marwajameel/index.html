import React from 'react';
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  clusterApiUrl 
} from '@solana/web3.js';

export default function SolanaPayButton() {
  // آپ کا مین والٹ ایڈریس
  const RECIPIENT_WALLET = 'C3qnNG8veMCgZrpTaGDWpq87QXSfn3778McNgakw84PZ';

  const handleSolanaPayment = async () => {
    try {
      const provider = window.solana;

      if (!provider || !provider.isPhantom) {
        alert('براہ کرم پہلے Phantom Wallet انسٹال یا کنیکٹ کریں!');
        return;
      }

      // والٹ کنیکٹ کریں
      const resp = await provider.connect();
      const senderPublicKey = resp.publicKey;

      // Mainnet RPC کنکشن
      const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

      // ٹرانزیکشن کی رقم (SOL میں)
      const amountInSol = 0.1;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: new PublicKey(RECIPIENT_WALLET),
          lamports: amountInSol * LAMPORTS_PER_SOL,
        })
      );

      transaction.feePayer = senderPublicKey;
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      // سائن اور سینڈ کریں
      const signed = await provider.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signed.signature);

      alert(`ٹرانزیکشن کامیاب ہو گئی! ہیش: ${signed.signature}`);
    } catch (error) {
      console.error('پیمنٹ میں خرابی:', error);
      alert('ٹرانزیکشن میں کوئی مسئلہ پیش آیا ہے۔');
    }
  };

  return (
    <button 
      onClick={handleSolanaPayment}
      style={{
        padding: '12px 24px',
        backgroundColor: '#512da8',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      SOL ٹرانسفر کریں (Solana Pay)
    </button>
  );
}
