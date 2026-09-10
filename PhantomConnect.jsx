import React from 'react';
import { PhantomProvider, useModal, darkTheme, AddressType, usePhantom } from "@phantom/react-sdk";

export default function PhantomWalletSetup() {
  return (
    <PhantomProvider
      config={{
        providers: ["google", "apple", "injected"],
        appId: "64086fc4-ccdd-4be3-8e60-6a0f7d863d7a",
        addressTypes: [
          AddressType.ethereum,
          AddressType.solana,
          AddressType.sui
        ],
        authOptions: {
          redirectUrl: "https://your-domain.vercel.app/auth/callback" // اپنی ویب سائٹ کا اصلی ڈومین یہاں درج کریں
        }
      }}
      theme={darkTheme}
      appName="SDN News"
    >
      <WalletComponent />
    </PhantomProvider>
  );
}

function WalletComponent() {
  const { open, isOpened } = useModal();
  const { isConnected, user } = usePhantom();

  if (isConnected) {
    return (
      <div style={{ padding: '10px', backgroundColor: '#dcfce7', borderRadius: '8px', color: '#15803d' }}>
        <p>✓ والٹ کنیکٹ ہو گیا (Connected)</p>
      </div>
    );
  }

  return (
    <button 
      onClick={open}
      style={{
        padding: '10px 20px',
        backgroundColor: '#ab9ff2',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      Phantom والٹ کنیکٹ کریں
    </button>
  );
}
