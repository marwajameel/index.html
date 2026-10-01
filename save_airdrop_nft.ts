import * as fs from 'fs';

// دوسرے این ایف ٹی کا ڈیٹا جو تصویر میں موجود ہے
const airdropNftData = {
  name: "www.privgate.sbs Airdrop",
  message: "YOU'VE WON THE ETH AIRDROP",
  collection: "www.privgate.sbs",
  network: "Optimism",
  contractAddress: "0x8e493c68e2042e3db4a30232f388bc1f26617b28",
  tokenId: 1,
  attributes: {
    level: 1,
    type: "Seed phrase",
    background: "Blue"
  },
  savedAt: new Date().toISOString()
};

// ڈیٹا کو JSON فائل میں محفوظ کرنے کا فنکشن
function saveAirdropNftToFile() {
  try {
    const fileName = `airdrop_nft_${airdropNftData.tokenId}.json`;
    fs.writeFileSync(fileName, JSON.stringify(airdropNftData, null, 2), 'utf-8');
    console.log(`✅ دوسرے این ایف ٹی کا ڈیٹا کامیابی سے محفوظ ہو گیا ہے: ${fileName}`);
  } catch (error) {
    console.error("❌ فائل محفوظ کرنے میں خرابی:", error);
  }
}

saveAirdropNftToFile();
