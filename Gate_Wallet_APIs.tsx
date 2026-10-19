import React, { useState, useEffect } from 'react';

// Types definition
interface NetworkInfo {
  chainId: string;
  name: string;
  explorer: string;
  symbol: string;
  rpc: string;
}

interface AccountNetworkItem {
  network: string;
  address: string;
  accountFormat?: string;
  accountFormatName?: string;
}

interface GateAccountInfo {
  walletName: string;
  accountName: string;
  accountNetworkArr: AccountNetworkItem[];
  walletId: string;
  newVersionWalletId: string;
  newVersionAccountId: string;
}

export default function GateWalletIntegration() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accountInfo, setAccountInfo] = useState<GateAccountInfo | null>(null);
  const [currentNetwork, setCurrentNetwork] = useState<NetworkInfo | null>(null);
  const [walletVersion, setWalletVersion] = useState<string>('');

  useEffect(() => {
    // 1. Check if Gate Wallet exists
    if (typeof window !== 'undefined' && (window as any).gatewallet) {
      const gate = (window as any).gatewallet;
      setWalletVersion(gate.version || 'Unknown');

      // 2. Fetch Initial Network
      gate.getGateWalletCurrentNetwork().then((net: NetworkInfo | null) => {
        setCurrentNetwork(net);
      });

      // 3. Listen to Network Changes
      gate.onGateWalletNetworkChanged((net: NetworkInfo | null) => {
        console.log('Network changed:', net);
        setCurrentNetwork(net);
      });

      // 4. Listen to Account Changes
      if (typeof gate.on === 'function') {
        gate.on('gateAccountChange', (info: GateAccountInfo) => {
          console.log('Account changed:', info);
          setAccountInfo(info);
        });
      }
    }
  }, []);

  // Connect Wallet Function
  const connectWallet = async () => {
    try {
      if (!(window as any).gatewallet) {
        alert('Gate Wallet انسٹال نہیں ہے!');
        return;
      }
      const gate = (window as any).gatewallet;
      const res: GateAccountInfo = await gate.connect();
      setAccountInfo(res);
      setIsConnected(true);
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxW: '600px', margin: 'auto' }}>
      <h2>Gate Wallet Integration</h2>
      
      <p><strong>Extension Version:</strong> {walletVersion || 'Not detected'}</p>

      {/* Connection Button */}
      {!isConnected ? (
        <button 
          onClick={connectWallet}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Connect Gate Wallet
        </button>
      ) : (
        <p style={{ color: 'green', fontWeight: 'bold' }}> Wallet Connected</p>
      )}

      <hr style={{ margin: '20px 0' }} />

      {/* Network Information */}
      <h3>Network Details</h3>
      {currentNetwork ? (
        <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          <p><strong>Network Name:</strong> {currentNetwork.name}</p>
          <p><strong>Chain ID:</strong> {currentNetwork.chainId}</p>
          <p><strong>Symbol:</strong> {currentNetwork.symbol}</p>
          <p><strong>RPC:</strong> {currentNetwork.rpc}</p>
          <p><strong>Explorer:</strong> {currentNetwork.explorer}</p>
        </div>
      ) : (
        <p>All Networks Selected / No Specific Network Selected</p>
      )}

      {/* Account Information */}
      <h3>Account Details</h3>
      {accountInfo ? (
        <div style={{ background: '#eef6ff', padding: '10px', borderRadius: '5px' }}>
          <p><strong>Wallet Name:</strong> {accountInfo.walletName}</p>
          <p><strong>Account Name:</strong> {accountInfo.accountName}</p>
          <p><strong>Wallet ID:</strong> {accountInfo.newVersionWalletId || accountInfo.walletId}</p>
          
          <h4>Multi-chain Addresses:</h4>
          <ul>
            {accountInfo.accountNetworkArr?.map((item, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <strong>[{item.network}]</strong>: {item.address}
                {item.accountFormatName && <span> ({item.accountFormatName})</span>}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No Account Connected</p>
      )}
    </div>
  );
}
