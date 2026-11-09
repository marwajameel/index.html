const params = new URLSearchParams({
  tradeType: "minOutput",
  originChainId: "42161",        // Arbitrum
  destinationChainId: "8453",    // Base
  inputToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",  // USDC on Arbitrum
  outputToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
  amount: "1000000000",          // 1000 USDC (6 decimals)
  depositor: "0xcBcA630521176E76D8a5F55F78703B92336A1411",  // آپ کا SDN News ریسیونگ والٹ
  integratorId: "0xdead",        // آپ کی انٹیگریٹر آئی ڈی
});

const response = await fetch(
  `https://app.across.to/api/swap/approval?${params}`,
  {
    headers: {
      Authorization: "Bearer YOUR_API_KEY", // یہاں اپنی Across API Key درج کریں
    },
  }
);
const quote = await response.json();
console.log(quote);
