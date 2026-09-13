// utils/baseWallet.js - Base/EVM Wallet Integration

// آپ کا محفوظ Base/EVM والٹ ایڈریس
export const BASE_WALLET_ADDRESS = "0xAF75CE406DFFa916E1c6297B00E36";

/**
 * والٹ ایڈریس کی صحت اور کاپی چیک کرنے کا فنکشن
 */
export function getBaseWalletDetails() {
  return {
    address: BASE_WALLET_ADDRESS,
    network: "Base / Ethereum",
    security: "Google Authenticator (2FA) Protected",
    isReady: true
  };
}

/**
 * ٹرانسفر یا پیمنٹ کی تفصیل تیار کرنے کا فنکشن
 */
export function createBasePaymentPayload(amountInUSDC, recipientAddress) {
  return {
    from: BASE_WALLET_ADDRESS,
    to: recipientAddress,
    amount: amountInUSDC,
    currency: "USDC",
    timestamp: new Date().toISOString()
  };
}
