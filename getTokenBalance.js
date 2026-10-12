import { Connection, PublicKey } from "@solana/web3.js";

// سولانا نیٹ ورک سے کنکشن بنائیں (لوکل ہوسٹ یا ڈیور نیٹ)
const connection = new Connection("http://localhost:8899", "confirmed");

// ٹوکن اکاؤنٹ کا پبلک کی ایڈریس
const accountPubKey = new PublicKey("2uuvxpnEKw52aTqNerHiQ3WeSqZriCMNVt8LhWfrkbPk");

// اکاؤنٹ کی تمام معلومات حاصل کریں
const accountInfo = await connection.getParsedAccountInfo(accountPubKey);

console.log("Account Info:", JSON.stringify(accountInfo, null, 2));
