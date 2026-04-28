import { useWriteContracts } from 'wagmi/experimental'
import { parseAbi } from 'viem'
 
// یہ ABI آپ کے اسمارٹ اکاؤنٹ سے ٹوکنز کی منظوری اور منتقلی کے لیے ہے
const abi = parseAbi([
  'function approve(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
])
 
function App() {
  const { writeContracts } = useWriteContracts()
 
  // صارف کی شناخت: Jamilahmed.base.eth
  return (
    <button
      onClick={() =>
        writeContracts({
          contracts: [
            {
              // ٹوکن کا کانٹریکٹ ایڈریس
              address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
              abi,
              functionName: 'approve',
              args: [
                '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 
                100n
              ],
            },
            {
              address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
              abi,
              functionName: 'transferFrom',
              args: [
                '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // بھیجنے والا
                '0x0000000000000000000000000000000000000000', // وصول کرنے والا
                100n
              ],
            },
          ],
          capabilities: { 
            paymasterService: { 
              // پے ماسٹر کی مدد سے Jamilahmed.base.eth بغیر گیس فیس کے یہ کال کر سکے گا
              url: 'https://...' 
            } 
          } 
        })
      }
    >
      Jamilahmed.base.eth کے ذریعے بھیجیں
    </button>
  )
}
