// utils/jupiterScreener.js - Jupiter Screener & Token Discovery Helper

/**
 * Jupiter API سے ٹرینڈنگ/اسٹاکس ٹوکنز کا ڈیٹا منگوانے کا فنکشن
 */
export async function getStocksScreenerData() {
  try {
    // Jupiter کی کیٹیگری اور ٹرینڈنگ API
    const response = await fetch('https://token.jup.ag/all');
    const tokens = await response.json();

    // تمام ٹوکنز میں سے ڈیٹا کی فلٹرنگ
    return {
      success: true,
      totalTokens: tokens.length,
      tokens: tokens.slice(0, 50) // پہلے 50 اہم ٹوکنز
    };
  } catch (error) {
    console.error("اسکرینر ڈیٹا منگوانے میں غلطی:", error);
    return { success: false, error: error.message };
  }
}
