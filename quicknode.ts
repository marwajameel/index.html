// QuickNode Earn & Base Mainnet Configuration

export const QUICKNODE_EARN_CONFIG = {
  // Base Mainnet Chain ID
  chainId: 8453,
  
  // QuickNode Earn Smart Contract Proxy Address
  proxyAddress: "0x48b415841165304f7EFaa7D5dD5FC65cc7B4bd8e",
  
  // Supported Network
  network: "base",
  
  // Environment Variables for CDP and Solana
  cdpApiKeyName: process.env.CDP_API_KEY_NAME,
  cdpPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
  solanaRpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
};
