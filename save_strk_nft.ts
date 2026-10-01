import * as fs from 'fs';

// تیسرے این ایف ٹی کا ڈیٹا جو تصویر میں موجود ہے
const strkNftData = {
  name: "strksurge.com Airdrop",
  message: "Starknet - 90.000 STRK - strksurge.com",
  collection: "strksurge.com",
  network: "Optimism",
  contractAddress: "0xfcc070fb27a7c53239fb17cf82a84806c6278bac",
  tokenId: 1,
  attributes: {
    level: 1,
    type: "Seed phrase",
    background: "Blue"
  },
  savedAt: new Date().toISOString()
};

// ڈیٹا کو JSON فائل میں محفوظ کرنے کا فنکشن
function saveStrkNftToFile() {
  try {
    const fileName = `strk_nft_${strkNftData.tokenId}.json`;
    fs.writeFileSync(fileName, JSON.stringify(strkNftData, null, 2), 'utf-8');
    console.log(`✅ تیسرے این ایف ٹی کا ڈیٹا کامیابی سے محفوظ ہو گیا ہے: ${fileName}`);
  } catch (error) {
    console.error("❌ فائل محفوظ کرنے میں خرابی:", error);
  }
}

saveStrkNftToFile();
