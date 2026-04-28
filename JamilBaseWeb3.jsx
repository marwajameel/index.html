import { useWriteContracts } from 'wagmi/experimental'
import { parseAbi } from 'viem'
 
// ABI تعریف: ٹوکن اپروول اور ٹرانسفر کے لیے
const abi = parseAbi([
  'function approve(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
])
 
function JamilBaseWeb3() {
  const { writeContracts } = useWriteContracts()
 
  // صارف کی شناخت: Jamilahmed.base.eth
  return (
    <button
      className="web3-button"
      onClick={() =>
        writeContracts({
          contracts: [
            {
              // ٹوکن کا کانٹریکٹ ایڈریس (مثال کے طور پر USDC یا کوئی اور ٹوکن)
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
                '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                '0x0000000000000000000000000000000000000000', 
                100n
              ],
            },
          ],
          capabilities: { 
            paymasterService: { 
              // پے ماسٹر سروس (گیس فیس کے بغیر لین دین کے لیے)
              url: 'https://...' 
            } 
          } 
        })
      }
    >
      Jamilahmed.base.eth کے ذریعے سپورٹ کریں
    </button>
  )
}

export default JamilBaseWeb3;
