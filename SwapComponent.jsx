  const handleAutomaticTransfer = async () => {
    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toAddress: '0xRecipientAddressHere', // جس کو فنڈز بھیجنے ہیں
          amountHex: '0xde0b6b3a7640000',     // مثال کے طور پر 1 ETH (Wei میں ہیکس)
          chainId: '0x2105',                    // Base نیٹ ورک
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('خودکار ٹرانسفر کامیاب ہو گیا!');
        console.log('Tx Params:', data.transactionParameters);
      } else {
        alert(`خرابی: ${data.error}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
    }
  };
