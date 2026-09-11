import React from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function SolanaPayButton() {
  const handleSolanaPayment = async () => {
    try {
      const provider = window.solana; // Phantom Wallet کا استعمال

      if (provider && provider.isPhantom) {
        // والٹ کنیکٹ کرنا
        await provider.connect();

        // اصلی سولانا مین نیٹ (Mainnet) کنکشن
        const connection = new Connection("https://api.mainnet-beta.solana.com");
        const senderPublicKey = provider.publicKey;
        
        // یہاں اپنا سولانا پبلک والٹ ایڈریس درج کریں
        const receiverPublicKey = new PublicKey("آپ_کا_سولانا_والیٹ_ایڈریس");

        // 0.1 SOL کا ٹرانسفر بنانا (اپنی مرضی کے مطابق رقم تبدیل کر سکتے ہیں)
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: senderPublicKey,
            toPubkey: receiverPublicKey,
            lamports: 0.1 * LAMPORTS_PER_SOL
          })
        );

        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = senderPublicKey;

        // ٹرانزیکشن سائن اور بھیجنا
        const signedTransaction = await provider.signAndSendTransaction(transaction);
        
        console.log("ٹرانزیکشن سگنیچر:", signedTransaction.signature);
        alert(`ادائیگی مکمل ہو گئی! ٹرانزیکشن آئی ڈی: ${signedTransaction.signature}`);
      } else {
        alert("برائے مہربانی پہلے Phantom Wallet انسٹال کریں!");
      }
    } catch (error) {
      console.error("سولانا ادائیگی میں مسئلہ آیا:", error);
      alert("ٹرانزیکشن ناکام ہو گئی یا منسوخ کر دی گئی۔");
    }
  };

  return (
    <button
      onClick={handleSolanaPayment}
      style={{
        backgroundColor: '#512DA8',
        color: '#FFFFFF',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      Solana (Phantom) کے ذریعے ادائیگی کریں (0.1 SOL)
    </button>
  );
}
