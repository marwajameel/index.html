import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';
import { clusterApiUrl } from '@solana/web3.js';

export const SDNWalletProvider = ({ children, network = 'mainnet-beta' }) => {
    // Solana RPC Endpoint Dynamic Setup
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    
    // Backpack Wallet Adapter Configuration
    const wallets = useMemo(() => [new BackpackWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
};
