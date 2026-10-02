import { ethers } from "ethers";

const BASE_COMMERCE_COLLECTOR = "0x8612dfdc421f80336cd14E8EF9cb1E765dB5ab88";
const LIVE_TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS_HERE"; // اپنا ٹوکن ایڈریس یہاں درج کریں

async function completeTransactionWithMinimalFees(signer) {
    try {
        const contractABI = [
            "function charge(address token, uint256 amount) external returns (bool)"
        ];

        const commerceContract = new ethers.Contract(
            BASE_COMMERCE_COLLECTOR,
            contractABI,
            signer
        );

        // کم سے کم ٹوکن کی مقدار (مثلاً 1 ٹوکن یا مطلوبہ کم سے کم ویلیو)
        const minimalTokenAmount = ethers.utils.parseUnits("1", 18);

        console.log("کم سے کم فیس کے ساتھ ٹرانزیکشن پروسیس کی جا رہی ہے...");

        // نیٹ ورک سے گیس کی قیمت کا تخمینہ لگا کر اس میں 20% بفر شامل کرنا تاکہ ٹرانزیکشن نہ رکے
        const feeData = await signer.provider.getFeeData();
        const adjustedGasPrice = feeData.gasPrice ? feeData.gasPrice.mul(120).div(100) : undefined;

        const tx = await commerceContract.charge(LIVE_TOKEN_ADDRESS, minimalTokenAmount, {
            gasLimit: 150000,
            gasPrice: adjustedGasPrice
        });

        console.log("ٹرانزیکشن ہیش:", tx.hash);
        
        const receipt = await tx.wait();
        console.log("ٹرانزیکشن کامیابی کے ساتھ مکمل ہو گئی ہے!", receipt);
        
        return receipt;
    } catch (error) {
        console.error("پروسیس میں خرابی:", error);
        throw error;
    }
}
