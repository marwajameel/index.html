import { useState } from 'react';
import { useAccount, useSignTypedData, useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';

const ESCROW_CONTRACT_ADDRESS = "0xYourEscrowContractAddressHere";
const PERMIT2_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3"; // سٹینڈرڈ Permit2 ایڈریس

const ESCROW_ABI = [/* پچھلا ABI یہاں استعمال کریں */];

export function Permit2EscrowPayment() {
  const { address } = { useAccount() };
  const { signTypedDataAsync } = useSignTypedData();
  const { writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState(false);

  const handlePermitAndPay = async (tokenAddress: string, amount: string, payee: string) => {
    try {
      setLoading(true);
      const nonce = BigInt(Math.floor(Date.now() / 1000));
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 1 گھنٹہ میعاد
      const parsedAmount = parseUnits(amount, 6); // USDC یا دیگر ٹوکنز کے لیے
      const escrowId = `0x${Math.random().toString(16).slice(2)}` as `0x${string}`;

      // 1. Permit2 ٹائپڈ ڈیٹا (EIP-712 Signature)
      const domain = {
        name: "Permit2",
        chainId: 8453, // Base Mainnet chainId
        verifyingContract: PERMIT2_ADDRESS as `0x${string}`,
      };

      const types = {
        TokenPermissions: [
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        PermitTransferFrom: [
          { name: "permitted", type: "TokenPermissions" },
          { name: "spender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      };

      const value = {
        permitted: {
          token: tokenAddress as `0x${string}`,
          amount: parsedAmount,
        },
        spender: ESCROW_CONTRACT_ADDRESS as `0x${string}`,
        nonce: nonce,
        deadline: deadline,
      };

      // صارف سے سگنیچر لینا
      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: "PermitTransferFrom",
        message: value,
      });

      // 2. اسمارٹ کانٹریکٹ کو کال کرنا
      const tx = await writeContractAsync({
        address: ESCROW_CONTRACT_ADDRESS,
        abi: ESCROW_ABI,
        functionName: "createEscrowWithPermit2",
        args: [
          escrowId,
          payee as `0x${string}`,
          tokenAddress as `0x${string}`,
          parsedAmount,
          nonce,
          deadline,
          signature,
        ],
      });

      console.log("پیمنٹ کامیاب! ٹرانزیکشن ہیش:", tx);
      alert("ادائیگی کامیابی سے اسکرو میں جمع ہو گئی ہے!");
    } catch (error) {
      console.error("ادائیگی میں خامی:", error);
      alert("ادائیگی ناکام ہو گئی۔ کنسول چیک کریں۔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={() => handlePermitAndPay("0xYourTokenAddress", "10", "0xPayeeAddress")}
        disabled={loading}
      >
        {loading ? "پروسیس ہو رہا ہے..." : "Permit2 کے ذریعے ادائیگی کریں"}
      </button>
    </div>
  );
}
