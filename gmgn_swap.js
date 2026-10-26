import { Wallet } from '@project-serum/anchor';
import { Connection, Keypair, VersionedTransaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import bs58 from 'bs58';
import fetch from 'node-fetch';
import sleep from './util/sleep.js';

const inputToken = 'So11111111111111111111111111111111111111112'; // WSOL / SOL
const outputToken = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';
const amount = '50000000'; // 0.05 SOL
const fromAddress = '2kpJ5QRh16aRQ4oLZ5LnucHFDAZtEFz6omqWWMzDSNrx';
const slippage = 0.5;

// GMGN API domain
const API_HOST = 'https://gmgn.ai';

async function main() {
  // Wallet initialization - Environment variable se private key uthayega
  const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || '')));
  console.log(`wallet address: ${wallet.publicKey.toString()}`);

  // Get quote and unsigned transaction (AdPI_HOST ki jagah API_HOST kar diya gaya hai)
  const quoteUrl = `${API_HOST}/defi/router/v1/sol/tx/get_swap_route?token_in_address=${inputToken}&token_out_address=${outputToken}&in_amount=${amount}&from_address=${fromAddress}&slippage=${slippage}`;
  
  let route = await fetch(quoteUrl);
  route = await route.json();
  console.log(route);

  if (!route || !route.data || !route.data.raw_tx) {
    console.error("سوپ روٹ حاصل کرنے میں خرابی پیش آگئی ہے۔");
    return;
  }

  // Sign transaction
  const swapTransactionBuf = Buffer.from(route.data.raw_tx.swapTransaction, 'base64');
  const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
  transaction.sign([wallet.payer]);
  const signedTx = Buffer.from(transaction.serialize()).toString('base64');
  console.log("دستخط شدہ ٹرانزیکشن:", signedTx);

  // Submit transaction
  let res = await fetch(`${API_HOST}/defi/router/v1/sol/tx/submit_signed_transaction`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      "signed_tx": signedTx
    })
  });
  
  res = await res.json();
  console.log(res);

  if (!res || !res.data || !res.data.hash) {
    console.error("ٹرانزیکشن سبمٹ کرنے میں ناکامی۔");
    return;
  }

  // Check transaction status
  while (true) {
    const hash = res.data.hash;
    const lastValidBlockHeight = route.data.raw_tx.lastValidBlockHeight;
    const statusUrl = `${API_HOST}/defi/router/v1/sol/tx/get_transaction_status?hash=${hash}&last_valid_height=${lastValidBlockHeight}`;
    
    let status = await fetch(statusUrl);
    status = await status.json();
    console.log("ٹرانزیکشن اسٹیтус:", status);

    if (status && status.data && (status.data.success === true || status.data.expired === true)) {
      break;
    }
    
    await sleep(1000);
  }
}

main();
