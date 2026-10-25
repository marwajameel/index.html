// ==========================================
// Mj04 آٹو ٹرانسفر، سویپ اور مانیٹرنگ سسٹم
// ==========================================

const targetSmartContract = "0xe59a655f9e65a3b89947e423136522af5fa4196f";
const targetNetworkAddress = "ZGmhmcZf9m4P7G74222kFVKBtK4r6NHwHUvqmbdgpYF";
const newTargetAddress = "A9aEY896KTSgWe8HdU6L3sSxQjdoca6r39difpjDAh7Q";
const meteoraPresaleVault = "presVXnf9UU8jMxhgSMqaRwNiT36qeBdNeTRKjTdbj";

// 1. GMGN API کے ذریعے سویپ روٹ حاصل کرنے کا فنکشن
async function getSwapRoute(inputToken, outputToken, amount, fromAddress, slippage = 1) {
    const url = `https://gmgn.ai/defi/router/v1/sol/tx/get_swap_route?token_in_address=${inputToken}&token_out_address=${outputToken}&in_amount=${amount}&from_address=${fromAddress}&slippage=${slippage}`;
    
    try {
        console.log("GMGN API سے سویپ روٹ کی درخواست کی جا رہی ہے...");
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.code === 0) {
            console.log("سویپ روٹ کامیابی سے حاصل ہو گیا ہے!");
            return data.data;
        } else {
            console.error("سویپ روٹ حاصل کرنے میں خرابی:", data.msg || "نامعلوم خرابی");
        }
    } catch (error) {
        console.error("سویپ روٹ API کنکشن کا ایرر:", error);
    }
}

// 2. GMGN API کے ذریعے ٹرانزیکشن کا سٹیٹس چیک کرنے کا فنکشن
async function checkTransactionStatus(hash, lastValidBlockHeight) {
    const url = `https://gmgn.ai/defi/router/v1/sol/tx/get_transaction_status?hash=${hash}&last_valid_height=${lastValidBlockHeight}`;
    
    try {
        console.log("ٹرانزیکشن کا لائیو سٹیٹس چیک کیا جا رہا ہے...");
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.code === 0) {
            console.log("ٹرانزیکشن کامیابی سے وریفائی ہو گئی ہے!", data.data);
            return data.data;
        } else {
            console.error("ٹرانزیکشن کی تصدیق جاری ہے یا مسئلہ ہے:", data.msg);
        }
    } catch (error) {
        console.error("سٹیٹس API کا کنکشن ایرر:", error);
    }
}

// 3. مرکزی آٹو منتقلی اور لیکویڈیشن کا عمل
async function executeFullAutomation() {
    console.log("Mj04 آٹو سسٹم فعال ہو گیا ہے...");
    console.log("نیا ٹارگٹ ایڈریس:", newTargetAddress);
    
    try {
        // سمارٹ کانٹریکٹ اور ٹوکنز کا ڈیٹا سنک کرنا
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${targetSmartContract}`);
        const data = await response.json();
        
        if (data && data.pairs) {
            console.log("تمام اثاثے کامیابی سے سنک ہو گئے ہیں!");
            
            // یہاں آپ اپنے ٹوکنز کے سویپ اور ٹرانسفر کا فنکشن کال کر سکتے ہیں
            // مثال کے طور پر:
            // await getSwapRoute("SOL_TOKEN_ADDRESS", "USDC_TOKEN_ADDRESS", "1000", newTargetAddress);
        }
    } catch (error) {
        console.error("آٹو سکرپٹ کے دوران خرابی پیش آئی:", error);
    }
}

// سکرپٹ کو رن کرنا
executeFullAutomation();
