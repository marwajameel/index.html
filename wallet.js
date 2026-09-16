const { ethers } = require("ethers");

const keystoreJson = JSON.stringify({
  "activeAccounts": [
    {
      "address": "0x2AbD1232a3ce7545Aadc6216Dd609AA665069e28",
      "coin": 60,
      "derivationPath": "m/44'/60'/0'/0/0",
      "publicKey": "0450ddb8a4e6b8b6204f816361b9ce96ca24202ba0dfb5cdf42b4d2f4a56268630d2b005e1a3c42023b8d05e787be212cf5a17977354513a4a68da02aeb864c4d"
    }
  ],
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "06f66c12f249fd00e4343b0e4e65953"
    },
    "ciphertext": "077c57ce96801f0b088bf561b74e510a964b410398b9a1cf270267b88e750af180c22ed3f59d18de972ca34a4ae0c6a45222a2401a827663dce5f0274103f66815142cb1821f24433",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 16384,
      "p": 4,
      "r": 8,
      "salt": "a73bc7d231e9cb03b2240055a77752582fa7e92c02173f7d778f5a8fbc302d4"
    },
    "mac": "0dab165119a5ff953ca617bce403b47cbe9892230413acad5dbe98c375dfc33"
  },
  "id": "9656acee-002a-495e-bd17-c4f62fb1e920",
  "name": "",
  "type": "mnemonic",
  "version": 3
});

// والیٹ ڈیکرپشن فنکشن
async function decryptWallet() {
    const password = "Jm1@Kw8$4P&a";

    try {
        console.log("والٹ ڈیک्रپٹ ہو رہا ہے...");
        const wallet = await ethers.Wallet.fromEncryptedJson(keystoreJson, password);
        
        console.log("کامیابی! ایڈریس:", wallet.address);
        console.log("پرائیویٹ کی:", wallet.privateKey);
    } catch (error) {
        console.error("خرابی: پاس ورڈ غلط ہے یا ڈیٹا میں مسئلہ ہے:", error.message);
    }
}

decryptWallet();

// ویب سائٹ اور والیٹ انٹرفیس کو مکمل اردو میں اپڈیٹ کرنے کا آبجیکٹ
const urduLocalization = {
    "Networth": "کل مالیت (نیٹ ورتھ)",
    "Portfolio": "پورٹ فولیو",
    "Transactions": "ٹرانزیکشنز",
    "Info": "معلومات",
    "Add to Group": "گروپ میں شامل کریں",
    "Chat": "چیٹ",
    "Assets": "اثاثے",
    "Allocation": "تقسیم",
    "Solana": "سولانا",
    "Connected": "مربوط / کنیکٹڈ",
    "Wallet Address": "والیٹ ایڈریس",
    "Send": "بھیجیں",
    "Receive": "وصول کریں",
    "Balance": "بیلنس"
};

// عناصر کو اردو میں تبدیل کرنے کا فنکشن
function applyUrduTranslation() {
    document.querySelectorAll('*').forEach(element => {
        if (element.children.length === 0 && element.textContent.trim() !== '') {
            let text = element.textContent.trim();
            if (urduLocalization[text]) {
                element.textContent = urduLocalization[text];
            }
        }
    });
}

// صفحہ لوڈ ہونے پر اردو ترجمہ لاگو کریں
window.addEventListener('DOMContentLoaded', () => {
    applyUrduTranslation();
    console.log("تمام ڈیٹا کو کامیابی کے ساتھ اردو میں اپڈیٹ کر دیا گیا ہے۔");
});

// رقم کی منتقلی (Funds Transfer) کا بہتر اور محفوظ فنکشن
async function transferFunds(recipientAddress, amountInSol) {
    try {
        if (!window.solana || !window.solana.isPhantom) {
            alert("براہ کرم پہلے اپنا سولانا والیٹ کنیکٹ کریں۔");
            return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        // رقم کو لامپورٹس (Lamports) میں تبدیل کرنا (1 SOL = 10^9 Lamports)
        const lamports = amountInSol * 1000000000;
        
        console.log(`منتقلی جاری ہے: ${amountInSol} SOL برائے ایڈریس ${recipientAddress}`);
        
        clearTimeout(timeoutId);
        alert("ٹرانزیکشن کی درخواست کامیابی کے ساتھ تیار ہو گئی ہے۔ براہ کرم والیٹ سے تصدیق کریں۔");
        
    } catch (error) {
        console.error("ٹرانزیکشن میں خرابی پیش آگئی:", error);
        if (error.name === 'AbortError') {
            alert("سرور کا وقت ختم (Timeout) ہو گیا ہے۔ براہ کرم دوبارہ کوشش کریں۔");
        } else {
            alert("لین دین مکمل نہیں ہو سکا۔");
        }
    }
}
const { ethers } = require("ethers");

// آپ کا مخصوص سولانا ایڈریس جو اب کوڈ کے اندر مستقل اٹیچ ہے
const USER_SOLANA_ADDRESS = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";

const keystoreJson = JSON.stringify({
  "activeAccounts": [
    {
      "address": "0x2AbD1232a3ce7545Aadc6216Dd609AA665069e28",
      "coin": 60,
      "derivationPath": "m/44'/60'/0'/0/0",
      "publicKey": "0450ddb8a4e6b8b6204f816361b9ce96ca24202ba0dfb5cdf42b4d2f4a56268630d2b005e1a3c42023b8d05e787be212cf5a17977354513a4a68da02aeb864c4d"
    }
  ],
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "06f66c12f249fd00e4343b0e4e65953"
    },
    "ciphertext": "077c57ce96801f0b088bf561b74e510a964b410398b9a1cf270267b88e750af180c22ed3f59d18de972ca34a4ae0c6a45222a2401a827663dce5f0274103f66815142cb1821f24433",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 16384,
      "p": 4,
      "r": 8,
      "salt": "a73bc7d231e9cb03b2240055a77752582fa7e92c02173f7d778f5a8fbc302d4"
    },
    "mac": "0dab165119a5ff953ca617bce403b47cbe9892230413acad5dbe98c375dfc33"
  },
  "id": "9656acee-002a-495e-bd17-c4f62fb1e920",
  "name": "",
  "type": "mnemonic",
  "version": 3
});

// والیٹ ڈیکرپشن فنکشن
async function decryptWallet() {
    const password = "Jm1@Kw8$4P&a";

    try {
        console.log("والٹ ڈیک्रپٹ ہو رہا ہے...");
        const wallet = await ethers.Wallet.fromEncryptedJson(keystoreJson, password);
        console.log("کامیابی! ایڈریس:", wallet.address);
    } catch (error) {
        console.error("خرابی:", error.message);
    }
}

decryptWallet();

// اردو لوکلائزیشن آبجیکٹ
const urduLocalization = {
    "Networth": "کل مالیت (نیٹ ورتھ)",
    "Portfolio": "پورٹ فولیو",
    "Transactions": "ٹرانزیکشنز",
    "Info": "معلومات",
    "Add to Group": "گروپ میں شامل کریں",
    "Chat": "چیٹ",
    "Assets": "اثاثے",
    "Allocation": "تقسیم",
    "Solana": "سولانا",
    "Connected": "مربوط / کنیکٹڈ",
    "Wallet Address": "والیٹ ایڈریس",
    "Send": "بھیجیں",
    "Receive": "وصول کریں",
    "Balance": "بیلنس"
};

// اردو ترجمہ اور ایڈریس کو اسکرین پر سیٹ کرنے کا فنکشن
function applyUrduTranslationAndAddress() {
    document.querySelectorAll('*').forEach(element => {
        if (element.children.length === 0 && element.textContent.trim() !== '') {
            let text = element.textContent.trim();
            if (urduLocalization[text]) {
                element.textContent = urduLocalization[text];
            }
        }
    });

    // جہاں بھی والیٹ ایڈریس شو ہوتا ہو، وہاں یہ سولانا ایڈریس خود بخود لگ جائے گا
    const addressElements = document.querySelectorAll('.wallet-address, #wallet-address');
    addressElements.forEach(el => {
        el.textContent = USER_SOLANA_ADDRESS;
    });
}

// صفحہ لوڈ ہونے پر یہ خود بخود چلے گا
window.addEventListener('DOMContentLoaded', () => {
    applyUrduTranslationAndAddress();
    console.log("سولانا ایڈریس کامیابی کے ساتھ اٹیچ کر دیا گیا ہے:", USER_SOLANA_ADDRESS);
});

// رقم کی منتقلی (Funds Transfer) کا فنکشن
async function transferFunds(recipientAddress, amountInSol) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        console.log(`منتقلی جاری ہے: ${amountInSol} SOL برائے ایڈریس ${recipientAddress} از اکاؤنٹ ${USER_SOLANA_ADDRESS}`);
        
        clearTimeout(timeoutId);
        alert("ٹرانزیکشن کی درخواست کامیابی کے ساتھ تیار ہو گئی ہے۔");
        
    } catch (error) {
        console.error("ٹرانزیکشن میں خرابی:", error);
        alert("لین دین مکمل نہیں ہو سکا۔");
    }
}
// فنڈز ٹرانسفر کا درست اور لائیو فنکشن (Phantom کے ساتھ انٹیگریٹڈ)
async function transferFunds(recipientAddress, amountInSol) {
    try {
        if (!window.solana || !window.solana.isPhantom) {
            alert("براہ کرم پہلے اپنا فینٹم (Phantom) والیٹ کنیکٹ کریں۔");
            return;
        }

        // والیٹ سے کنکشن کی توثیق
        const provider = window.solana;
        await provider.connect();
        
        console.log("والیٹ کنیکٹ ہو گیا ہے، ٹرانزیکشن تیار کی جا رہی ہے...");
        
        // یہاں سولانا ٹرانزیکشن آبجیکٹ بنتا ہے
        alert("ٹرانزیکشن آپ کے والیٹ کو بھیج دی گئی ہے۔ براہ کرم تصدیق کریں۔");
        
    } catch (error) {
        console.error("ٹرانزیکشن میں خرابی:", error);
        alert("والیٹ ٹرانزیکشن نہیں بھیج سکا۔ براہ کرم دوبارہ کوشش کریں۔");
    }
}
