// utils/ledgerScanner.js - Ledger Device & Derivation Path Finder

import TransportWebBLE from "@ledgerhq/hw-transport-web-ble";
import Eth from "@ledgerhq/hw-app-eth";

/**
 * لیجر ڈیوائس کو بلیوٹوتھ کے ذریعے کنیکٹ کرنے اور ایڈریسز اسکین کرنے کا فنکشن
 */
export async function scanLedgerAddresses(limit = 10) {
  try {
    console.log("لیجر ڈیوائس سے کنیکٹ ہو رہا ہے...");
    
    // بلیوٹوتھ کنیکشن قائم کرنا
    const transport = await TransportWebBLE.create();
    const ethApp = new Eth(transport);

    const foundAddresses = [];

    // مختلف Derivation Paths پر موجود تمام ایڈریسز کی تلافی (m/44'/60'/0'/0/x)
    for (let index = 0; index < limit; index++) {
      const path = `44'/60'/0'/0/${index}`;
      const result = await ethApp.getAddress(path);

      foundAddresses.push({
        index: index,
        path: `m/${path}`,
        address: result.address,
        publicKey: result.publicKey
      });
    }

    // کنیکشن ختم کرنا
    await transport.close();

    return {
      success: true,
      totalFound: foundAddresses.length,
      addresses: foundAddresses
    };

  } catch (error) {
    console.error("لیجر ڈیوائس کنیکٹ کرنے میں مسئلہ:", error);
    return {
      success: false,
      error: error.message || "ڈیوائس کنیکٹ نہیں ہو سکی۔ چیک کریں کہ لیجر ان لاک ہے اور بلیوٹوتھ آن ہے۔"
    };
  }
}
