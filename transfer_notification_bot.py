import logging

# لاگنگ کا نظام فعال کرنا
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def send_transfer_notification(amount, asset, destination_address):
    """فنڈز کی منتقلی کے بعد نوٹیفیکیشن جاری کرنے کا فنکشن"""
    try:
        logging.info("--- SDN News Transfer Notification System Active ---")
        
        # کامیاب ٹرانزیکیشن کا پیغام
        print(f"🔔 **نوٹیفیکیشن:** کامیابی!")
        print(f"💰 رقم: {amount} {asset}")
        print(f"🎯 ہدف ایڈریس: {destination_address[:6]}...{destination_address[-4:]}")
        print(f"✅ آپ کے ویب تھری فنڈز کامیابی کے ساتھ ایکسچینج اسپاٹ والٹ میں منتقل ہو چکے ہیں اور اب استعمال کے لیے تیار ہیں۔")
        
    except Exception as e:
        logging.error(f"نوٹیفیکیشن بھیجنے میں خرابی: {e}")

if __name__ == "__main__":
    # ٹرانسفر کی حتمی تفصیلات
    transferred_amount = 100.0
    token_symbol = "USDC"
    exchange_deposit = "0xA0b869...3606eB48"
    
    # نوٹیفیکیشن فنکشن کال کرنا
    send_transfer_notification(transferred_amount, token_symbol, exchange_deposit)
