<div id="contract-details">ڈیٹا لوڈ ہو رہا ہے...</div>

<script>
  // آپ کی پرو API کی اور نیا کانٹریکٹ ایڈریس
  const apiKey = "Proapi_eiBJefkBTRnfKxZLaL9omx8HbXY35eL0ybbKhYqN3SJQ6v2GUxie0dISMqBFqEOwS_bwwaBN";
  const contractAddress = "0x128cC466B61f542da60c70e3aA11c10e19B84EDB";
  const chainId = "arc"; // Arc Mainnet کی Chain ID

  // API URL
  const url = `https://api.blockscout.com/${chainId}/api/v2/addresses/${contractAddress}/transactions?apikey=${apiKey}`;

  async function fetchContractData() {
    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Arc Contract Data:", data);

      if (data.items) {
        document.getElementById("contract-details").innerHTML = `
          <h3>Wrapped Ether (WETH) - پروکسی کانٹریکٹ</h3>
          <p><strong>ایڈریس:</strong> ${contractAddress}</p>
          <p><strong>حالیہ ٹرانزیکشنز:</strong> ${data.items.length}</p>
        `;
      }
    } catch (error) {
      console.error("خطا:", error);
      document.getElementById("contract-details").innerText = "ڈیٹا لوڈ کرنے میں ناکامی ہوئی۔";
    }
  }

  fetchContractData();
</script>
