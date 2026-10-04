import json

def save_transfer_note(wallet_address, tx_amount):
    note_data = {
        "wallet": wallet_address,
        "amount": tx_amount,
        "status": "Transferred successfully with gas fee"
    }
    
    with open("transfer_notes.json", "a", encoding="utf-8") as f:
        json.dump(note_data, f, ensure_ascii=False, indent=4)
        f.write("\n")
    print("والیٹ ایڈریس اور نوٹ کامیابی کے ساتھ محفوظ ہو گیا ہے!")

# آپ کا مصدقہ والیٹ ایڈریس جو ریکارڈ میں لگایا گیا ہے
save_transfer_note("iGgNJhmyQEnSMean7NfHgEm4RAU72hSNBWvYb1ybynq", "0.01 SOL")
