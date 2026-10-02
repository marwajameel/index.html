app.jsgit init
git add .
git commit -m "Add Base Pay integration code"
git branch -M main
git remote add origin آپ_کی_گیٹ_ہب_ریپوزیٹری_کا_لنک
git push -u origin main
import LombardStakingWidget from './LombardStakingWidget';

function App() {
  return (
    <div>
      <LombardStakingWidget />
    </div>
  );
}

export default App;
// لائیو بیس نیٹ ورک اور ٹوکن کانٹریکٹ کی ترتیبات
const BASE_COMMERCE_COLLECTOR = "0x8612dfdc421f80336cd14E8EF9cb1E765dB5ab88"; // ERC3009PaymentCollector ایڈریس
const LIVE_TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS_HERE"; // یہاں اپنا اصل ٹوکن ایڈریس محفوظ کریں

async function saveAndExecuteLiveTransaction(signer) {
    try {
        const contractABI = [
            "function charge(address token, uint256 amount) external returns (bool)"
        ];

        const commerceContract = new ethers.Contract(
            BASE_COMMERCE_COLLECTOR,
            contractABI,
            signer
        );

        // ٹوکن کی طے شدہ مقدار (مثلاً 5 ٹوکنز)
        const tokenAmount = ethers.utils.parseUnits("5", 18);

        console.log("لائیو ٹرانزیکشن سیو اور پروسیس کی جا رہی ہے...");
        
        const tx = await commerceContract.charge(LIVE_TOKEN_ADDRESS, tokenAmount, {
            gasLimit: 150000
        });

        console.log("کامیاب ٹرانزیکشن ہیش:", tx.hash);
        await tx.wait();
        
        console.log("پیمنٹ کامیابی کے ساتھ محفوظ اور مکمل ہو گئی ہے!");
    } catch (error) {
        console.error("خرابی کا سامنا:", error);
    }
}

