import React, { useState, useEffect } from 'react';

export default function TokenLiveStats({ mintAddress }) {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLivePrice() {
      try {
        // DexScreener یا Birdeye لائیو API
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mintAddress}`);
        const data = await response.json();
        if (data.pairs && data.pairs.length > 0) {
          setTokenData(data.pairs[0]);
        }
      } catch (error) {
        console.error("لائیو ڈیٹا فیچ کرنے میں خرابی:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLivePrice();
    // ہر 10 سیکنڈ بعد لائیو ریفریش (Real-time updates)
    const interval = setInterval(fetchLivePrice, 10000);
    return () => clearInterval(interval);
  }, [mintAddress]);

  if (loading) return <div>لائیو ڈیٹا لوڈ ہو رہا ہے...</div>;

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{tokenData?.baseToken?.name} ({tokenData?.baseToken?.symbol})</h2>
      <div className="flex justify-between mt-2">
        <span>قیمت (Price):</span>
        <span className="text-green-400 font-semibold">${tokenData?.priceUsd}</span>
      </div>
      <div className="flex justify-between mt-1">
        <span>24H والیم (Volume):</span>
        <span>${tokenData?.volume?.h24?.toLocaleString()}</span>
      </div>
      <div className="flex justify-between mt-1">
        <span>لیکویڈیٹی (Liquidity):</span>
        <span>${tokenData?.liquidity?.usd?.toLocaleString()}</span>
      </div>
    </div>
  );
}
