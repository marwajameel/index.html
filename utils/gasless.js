import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';

// 1. Account 5 کا پبلک اور پرائیویٹ کی سیٹ اپ
export const FEE_PAYER_PUBKEY = new PublicKey('9ujAEDhbzA7DSEiABC8bKD6qtemMmD8bQ7fp6GyuQAeQ');

const FEE_PAYER_SECRET = [5,171,5,109,75,54,87,106,67,77,56,100,78,51,80,67,119,85,99,51,55,103,116,111,78,90,107,69,118,56,85,102,106,56,77,85,74,54,56,104,80,107,105,89,118,77,106,67,115,106,110,50,122,90,121,56,113,119,90,71,51,109,52,83,66,122,78,81,49,117,51,78,111,71,76,52,111,50,101,119,57,100,83,85];

const feePayerKeypair = Keypair.fromSecretKey(Uint8Array.from(FEE_PAYER_SECRET));
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// 2. گیس فیس پے کرنے کا فنکشن
export async function processGaslessTransaction(userSignedTxBase64) {
  try {
    const transaction = Transaction.from(Buffer.from(userSignedTxBase64, 'base64'));

    // Account 5 سے فیس سائن کرنا
    transaction.partialSign(feePayerKeypair);

    // نیٹ ورک پر بھیجنا
    const rawTx = transaction.serialize();
    const txid = await connection.sendRawTransaction(rawTx, {
      skipPreflight: false,
      maxRetries: 3,
    });

    return { success: true, txid };
  } catch (error) {
    console.error("Gasless processing error:", error);
    return { success: false, error: error.message };
  }
}
