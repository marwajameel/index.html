def evaluate_token_safety(token_data):
    """ٹوکن کے ٹیکس اور سیکیورٹی کا جائزہ لینے کا فنکشن"""
    buy_tax = token_data.get('buyTax', 0)
    sell_tax = token_data.get('sellTax', 0)
    
    # زیادہ سے زیادہ قابلِ قبول ٹیکس (مثلاً 1%)
    MAX_TAX_LIMIT = 1.0 
    
    if buy_tax <= MAX_TAX_LIMIT and sell_tax <= MAX_TAX_LIMIT:
        print(لگ رہا ہے کہ ٹوکن محفوظ ہے: بائے ٹیکس {buy_tax}%، سیل ٹیکس {sell_tax}% ✅)
        return True
    else:
        print(⚠️ **وارننگ:** اس ٹوکن کا ٹیکس زیادہ ہے (بائے: {buy_tax}%, سیل: {sell_tax}%) - نقصان سے بچنے کے لیے اسے چھوڑ دیا گیا ہے۔)
        return False
