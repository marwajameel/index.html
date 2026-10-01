import * as fs from 'fs';

// این ایف ٹی کی معلومات جو آپ کی تصویر میں دی گئی ہیں
const nftData = {
  name: "NeonGames.fun",
  collection: "NeonGames.fun",
  network: "Optimism",
  contractAddress: "0x1de...3801",
  tokenId: 1,
  attributes: {
    level: 1,
    type: "Seed phrase",
    background: "Blue"
  },
  savedAt: new Date().toISOString()
};

// این ایف ٹی کے ڈیٹا کو JSON فائل میں محفوظ کرنے کا فنکشن
function saveNftToFile() {
  try {
    const fileName = `nft_metadata_${nftData.tokenId}.json`;
    fs.writeFileSync(fileName, JSON.stringify(nftData, null, 2), 'utf-8');
    console.log(`✅ این ایف ٹی کا ڈیٹا کامیابی سے محفوظ ہو گیا ہے: ${fileName}`);
  } catch (error) {
    console.error("❌ فائل محفوظ کرنے میں خرابی:", error);
  }
}

saveNftToFile();
