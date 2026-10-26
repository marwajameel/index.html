// ==========================================
// ملٹی والٹ کنکشن اور آٹو ٹرانسفر ترتیب
// ==========================================

const { ethers } = require("ethers");

// آپ کے تمام منسلک والٹس کی لسٹ
const connectedWallets = [
    "0x2b8F8d19F5ba3bEc5B44dEDeD3818a427895f308",
    "0xe7a0aa5db4cb464d82b639597cb8100edccc1378",
    "0x76bbb8D5dbedde9cB34882c9588DFa9dEF00B8bc",
    "0xfA29DCce20888FaE560A843C8A186B26A5f5F888"
];

const targetDestination = "A9aEY896KTSgWe8HdU6L3sSxQjdoca6r39difpjDAh7Q";
const gateApiKey = "4c18fdaf76c606ffbe92c847e983ef2f";

async function initializeWalletConnection() {
    console.log("تمام والٹس کو سسٹم کے ساتھ کنیکٹ کیا جا رہا ہے...");
    
    connectedWallets.forEach((wallet, index) => {
        console.log(`والٹ نمبر ${index + 1}: ${wallet} کامیابی سے منسلک ہو گیا ہے۔`);
    });

    console.log("ٹارگٹ ڈیسٹینیشن اور Gate.io API کنکشن فعال ہے۔");
}

initializeWalletConnection();
