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

async function decryptWallet() {
    const password = "Jm1@Kw8$4P&a";

    try {
        console.log("والٹ ڈیک্রپٹ ہو رہا ہے...");
        const wallet = await ethers.Wallet.fromEncryptedJson(keystoreJson, password);
        
        console.log("کامیابی! ایڈریس:", wallet.address);
        console.log("پرائیویٹ کی:", wallet.privateKey);
    } catch (error) {
        console.error("خرابی: پاس ورڈ غلط ہے یا ڈیٹا میں مسئلہ ہے:", error.message);
    }
}

decryptWallet();
