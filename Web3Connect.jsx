import { useState, useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { ethers } from "ethers";

export default function Web3Connect() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: "YOUR_WEB3AUTH_CLIENT_ID", // Web3Auth Dashboard سے حاصل کریں
          web3AuthNetwork: "sapphire_mainnet",
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x38", // BSC Mainnet (56)
            rpcTarget: "https://bsc-dataseed.binance.org/",
          },
        });

        await web3auth.initModal();
        setWeb3auth(web3auth);

        if (web3auth.provider) {
          setProvider(web3auth.provider);
          await getUserInfo(web3auth.provider);
        }
      } catch (error) {
        console.error("Initialization Error:", error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) return;
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    await getUserInfo(web3authProvider);
  };

  const getUserInfo = async (web3Provider) => {
    const ethersProvider = new ethers.BrowserProvider(web3Provider);
    const signer = await ethersProvider.getSigner();
    const userAddress = await signer.getAddress();
    setAddress(userAddress);

    const userBalance = await ethersProvider.getBalance(userAddress);
    setBalance(ethers.formatEther(userBalance));
  };

  const logout = async () => {
    if (!web3auth) return;
    await web3auth.logout();
    setProvider(null);
    setAddress("");
    setBalance("0");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {!address ? (
        <button onClick={login} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p><strong>Wallet Address:</strong> {address}</p>
          <p><strong>BNB Balance:</strong> {balance} BNB</p>
          <button onClick={logout} style={{ padding: "8px 16px", cursor: "pointer" }}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
