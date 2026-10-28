const BASE = "https://public-api.birdeye.so";
const HEADERS = {
  "X-API-KEY": process.env.BIRDEYE_API_KEY,
  "x-chain": "solana"
};

async function loadPortfolio(wallet) {
  try {
    const [networthRes, chartRes, pnlRes] = await Promise.all([
      fetch(`${BASE}/wallet/v2/current-net-worth?wallet=${wallet}&sort_type=desc&limit=100`, { headers: HEADERS }),
      fetch(`${BASE}/wallet/v2/net-worth?wallet=${wallet}&count=30&type=1d&sort_type=asc`, { headers: HEADERS }),
      fetch(`${BASE}/wallet/v2/pnl/details`, {
        method: "POST",
        headers: { ...HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, duration: "30d", limit: 100 })
      })
    ]);

    // ایچ ٹی ٹی پی رسپانس چیک
    if (!networthRes.ok || !chartRes.ok || !pnlRes.ok) {
      throw new Error(`Birdeye API Error: ${networthRes.status} / ${chartRes.status} / ${pnlRes.status}`);
    }

    const [networth, chart, pnl] = await Promise.all([
      networthRes.json(),
      chartRes.json(),
      pnlRes.json()
    ]);

    return {
      totalValue: networth?.data?.total_value || 0,
      holdings: networth?.data?.items || [],
      history: chart?.data?.history || [],
      pnlSummary: pnl?.data?.summary || {},
      pnlPerToken: pnl?.data?.tokens || []
    };
  } catch (error) {
    console.error("loadPortfolio Error:", error.message);
    throw error;
  }
}
