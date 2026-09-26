import React from 'react';
import { SDNWalletProvider } from '@sdn/solana-wallet-provider';

// 1. آپ کا ٹوکن اور نیٹ ورک سیٹ اپ
const SOLANA_NETWORK = "mainnet-beta"; // لائیو سولانا مین نیٹ
const MJ04_TOKEN_ADDRESS = "YOUR_MJ04_SOLANA_CONTRACT_ADDRESS"; // یہاں اپنا MJ04 کانٹریکٹ ایڈریس رکھیں

// 2. بیک اینڈ فیس (Paymaster) اور ٹوکن ہینڈلر کی بنیادی کنفیگریشن
const paymasterConfig = {
  feeToken: MJ04_TOKEN_ADDRESS,
  autoConvertGas: true, // یوزر سے MJ04 لے کر بیک اینڈ پر فیس ایڈجسٹ کرے گا
  appSource: "SDN News Digital Ecosystem"
};

function App({ Component, pageProps }) {
  return (
    // SDN Wallet Provider پورے پورٹل اور والٹ ایپ کو آپس میں جوڑتا ہے
    <SDNWalletProvider 
      network={SOLANA_NETWORK}
      config={paymasterConfig}
    >
      {/* تمام صفحات اور کمپوننٹس کو خودکار طریقے سے لائیو والٹ سپورٹ مل جائے گی */}
      <Component {...pageProps} tokenAddress={MJ04_TOKEN_ADDRESS} />
    </SDNWalletProvider>
  );
}

export default App;
