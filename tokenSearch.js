// tokenSearch.js - Jupiter Token List & Search Helper

// 1. تمام تصدیق شدہ ٹوکنز کی فہرست حاصل کرنا
export async function getAllTokens() {
  try {
    const response = await fetch('https://token.jup.ag/strict');
    const tokens = await response.json();
    return tokens;
  } catch (error) {
    console.error("ٹوکنز لسٹ منگوانے میں غلطی:", error);
    return [];
  }
}

// 2. کسی مخصوص ٹوکن کو نام یا سمبل سے تلاش کرنا
export async function searchToken(query) {
  try {
    const tokens = await getAllTokens();
    const matchedTokens = tokens.filter(t => 
      t.symbol.toLowerCase().includes(query.toLowerCase()) || 
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.address.toLowerCase() === query.toLowerCase()
    );
    return matchedTokens;
  } catch (error) {
    console.error("ٹوکن تلاش کرنے میں غلطی:", error);
    return [];
  }
}
