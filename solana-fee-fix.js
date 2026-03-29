/**
 * سولانا اسٹیک پول فیس کیلکولیٹر
 * @param {number} amt - ٹوکنز کی مقدار
 * @param {number} numerator - فیس کی شرح کا اوپر والا حصہ (مثلاً 2)
 * @param {number} denominator - فیس کی شرح کا نیچے والا حصہ (مثلاً 100)
 * @returns {number} - حساب شدہ فیس
 */
function calculateFee(amt, numerator, denominator) {
    if (denominator === 0) {
        return 0;
    }

    // فیس کا حساب لگائیں
    let fee = Math.floor((amt * numerator) / denominator);

    // اہم حل (Rounding Up Logic): 
    // اگر رقم (amt) موجود ہے اور فیس کی شرح (numerator) بھی ہے،
    // لیکن حساب کے بعد فیس 0 آ رہی ہے، تو اسے 1 کر دیں۔
    if (amt > 0 && fee === 0 && numerator > 0) {
        fee = 1;
    }

    return fee;
}

// مثال کے طور پر چیک کریں:
const tokens = 2; // بہت کم رقم
const feeRateNum = 2; // 2% فیس
const feeRateDen = 100;

const result = calculateFee(tokens, feeRateNum, feeRateDen);
console.log("حساب شدہ فیس:", result); // اس کا نتیجہ اب '1' آئے گا، '0' نہیں
