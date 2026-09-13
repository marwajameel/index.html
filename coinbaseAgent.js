// utils/coinbaseAgent.js - Coinbase Agent & MPC Wallet Helper
import { Coinbase } from "@coinbase/coinbase-sdk";

// API کیز کو انوائرنمنٹ سے فیچ کرنا
const apiKeyName = process.env.API_KEY_NAME;
const privateKey = process.env.API_KEY_PRIVATE_KEY;

export async function initCoinbaseAgent() {
  try {
    // Coinbase CDP کو انیشیلائز کرنا
    Coinbase.configure({ apiKeyName, privateKey });
    
    // نیا MPC والٹ تخلیق کرنا
    const wallet = await Coinbase.createWallet();
    console.log("MPC والٹ کامیابی سے بن گیا! ایڈریس:", await wallet.getDefaultAddress());
    
    return { success: true, wallet };
  } catch (error) {
    console.error("Coinbase Agent انیشیلائزیشن میں غلطی:", error);
    return { success: false, error: error.message };
  }
}
