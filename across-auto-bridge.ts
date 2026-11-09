// Across API سے حاصل شدہ swapTx کو Viem والٹ کے ذریعے ایگزیکیوٹ کرنا
if (quote.swapTx) {
  try {
    const hash = await walletClient.sendTransaction({
      to: quote.swapTx.to as `0x${string}`,
      data: quote.swapTx.data as `0x${string}`,
      value: BigInt(quote.swapTx.value || "0"),
      gas: BigInt(quote.swapTx.gas || "250000"),
    });

    console.log("برجنگ ٹرانزیکشن کامیابی سے سینڈ ہو گئی ہے!");
    console.log("Transaction Hash:", hash);
  } catch (error) {
    console.error("برجنگ ٹرانزیکشن میں مسئلہ آیا:", error);
  }
}
