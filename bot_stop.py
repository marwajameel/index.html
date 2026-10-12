import ccxt

# {"apiKey":"bg_aedf4ff6e168bf83aaafddbfd6e61690","secretKey":"425c9ca12cc4550fe5328ce857859a9a00c5b2c5dc75889460ea0438991bae59"}
# ایکسچینج کنیکٹ کریں (Bitget)
exchange = ccxt.bitget({
    'apiKey': api_key,
    'secret': secret_key,
    'enableRateLimit': True,
})

def close_all_and_transfer_to_spot():
    try:
        # 1. تمام اوپن پوزیشنز حاصل کریں
        positions = exchange.fetch_positions()
        for pos in positions:
            symbol = pos['symbol']
            contracts = float(pos['contracts'])
            side = pos['side']
            
            if contracts > 0:
                print(f"Closing position: {symbol} | Side: {side} | Amount: {contracts}")
                # تمام اوپن پوزیشنز کو مارکیٹ آرڈر پر بند کرنا
                opposite_side = 'sell' if side == 'long' else 'buy'
                exchange.create_order(symbol, 'market', opposite_side, contracts, params={'reduceOnly': True})
                print(f"Successfully closed {symbol}")

        print("تمام فیوچرز/بوٹ پوزیشنز بند کر دی گئی ہیں۔")

        # 2. فنڈز کو Futures/USDT-M سے Spot والٹ میں منتقل کرنا
        # (یہاں سے آپ فنڈز کو اسپاٹ والٹ میں موو کر سکتے ہیں)
        balance = exchange.fetch_balance()
        usdt_free = balance['USDT']['free']
        
        if usdt_free > 0:
            print(f"Transferring {usdt_free} USDT from Futures to Spot...")
            # ایکسچینج ٹرانسفر API
            exchange.transfer('USDT', usdt_free, 'future', 'spot')
            print("فنڈز کامیابی سے اسپاٹ والٹ میں منتقل کر دیے گئے ہیں!")
            
    except Exception as e:
        print(f"Error occurred: {str(e)}")

# کوڈ چلائیں
close_all_and_transfer_to_spot()
