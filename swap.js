// Solana Web3.js اور Jupiter API کے ذریعے آٹو سویپ اور والٹ کنکشن کا بنیادی کوڈ
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

// سولانا نیٹ ورک کا کنکشن قائم کریں
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// والٹ کنیکٹ کرنے کا فنکشن
async function connectWallet() {
    try {
        const provider = window.solana;
        if (provider && provider.isPhantom) {
            const response = await provider.connect();
            console.log("والٹ کنیکٹ ہو گیا، ایڈریس:", response.publicKey.toString());
            return response.publicKey;
        } else {
            alert("براہ کرم فینٹم (Phantom) یا سولفلیر والٹ انسٹال کریں!");
        }
    } catch (err) {
        console.error("والٹ کنکشن کی خرابی:", err);
    }
}

// ٹوکن سویپ کرنے کا خودکار فنکشن (Jupiter API کے تحت)
async function executeSwap(inputMint, outputMint, amount, userWalletPublicKey) {
    try {
        console.log("سویپ کا عمل شروع ہو رہا ہے...");
        // 1. کوٹ (Quote) حاصل کریں
        const quoteResponse = await (
            await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`)
        ).json();

        // 2. سویپ ٹرانزیکشن حاصل کریں
        const { swapTransaction } = await (
            await fetch('https://quote-api.jup.ag/v6/swap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quoteResponse,
                    userPublicKey: userWalletPublicKey.toString(),
                    wrapAndUnwrapSol: true,
                })
            })
        ).json();

        // 3. ٹرانزیکشن پر دستخط اور سینڈ کرنا
        console.log("ٹرانزیکشن تیار ہے، براہ کرم تصدیق کریں...");
        return swapTransaction;
    } catch (error) {
        console.error("سویپ میں خرابی:", error);
    }
}
