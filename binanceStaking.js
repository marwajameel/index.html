// utils/binanceStaking.js - Binance Staking & WBETH Helper

/**
 * WBETH اور ETH کا لائیو ریٹ حاصل کرنے کا فنکشن
 */
export async function getWBETHConversionRate() {
  try {
    // بائنانس پرائس API سے WBETH کی قیمت فیچ کرنا
    const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=WBETHETH");
    const data = await response.json();

    return {
      success: true,
      symbol: "WBETH/ETH",
      conversionRatio: parseFloat(data.price), // جیسے 1.10633753
      referenceAPR: "2.24%"
    };
  } catch (error) {
    console.error("WBETH ریٹ حاصل کرنے میں مسئلہ:", error);
    return { success: false, error: error.message };
  }
}
