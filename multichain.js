// ملٹی چین ڈیٹا مانیٹرنگ اسکرپٹ
async function fetchMultiChainData() {
  console.log("--- بلاک چین نیٹ ورکس سے ڈیٹا حاصل کیا جا رہا ہے ---...\n");

  try {
    // 1. Ethereum (ایتھریم) کا تازہ ترین بلاک حاصل کرنا
    const ethPromise = fetch("https://eth-mainnet.g.alchemy.com/v2/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 })
    }).then(res => res.json());

    // 2. Base (بیس) کا تازہ ترین بلاک حاصل کرنا
    const basePromise = fetch("https://mainnet.base.org", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 })
    }).then(res => res.json());

    // 3. Solana (سولانا) کا تازہ ترین سلاٹ حاصل کرنا
    const solPromise = fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "getSlot", params: [], id: 1 })
    }).then(res => res.json());

    // تینوں ریکوئسٹس کو ایک ساتھ پروسیس کرنا
    const [ethData, baseData, solData] = await Promise.all([ethPromise, basePromise, solPromise]);

    // ہیکسا ڈెسمل کو نمبر میں تبدیل کرنا اور نتائج دکھانا
    const ethBlock = parseInt(ethData.result, 16);
    const baseBlock = parseInt(baseData.result, 16);
    const solSlot = solData.result;

    console.log("========================================");
    console.log(`🔷 Ethereum (ایتھریم) لیٹسٹ بلاک : ${ethBlock}`);
    console.log(`🔵 Base (بیس) لیٹسٹ بلاک       : ${baseBlock}`);
    console.log(`🟣 Solana (سولانا) لیٹسٹ سلاٹ  : ${solSlot}`);
    console.log("========================================");

  } catch (error) {
    console.error("ڈیٹا فیچ کرنے میں ایرر آ گیا:", error);
  }
}

// فنکشن کو رن کریں
fetchMultiChainData();
