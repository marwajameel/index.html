// gate_wallet_manager.ts

export type NetworkInfo = {
  chainId: string;
  name: string;
  explorer: string;
  symbol: string;
  rpc: string;
};

export interface GateAccountInfo {
  walletName: string;
  accountName: string;
  accountNetworkArr: Array<{
    network: string;
    address: string;
    accountFormat?: string;
    accountFormatName?: string;
  }>;
  walletId: string;
  newVersionWalletId: string;
  newVersionAccountId: string;
  moreAddressSort: string[];
  walletCreateType: number;
  typeSource?: string;
}

export interface GateWindowProvider {
  chainId: string;
  selectedAddress?: string;
  gateAccountInfo?: GateAccountInfo;
  connected: boolean;
  version: string;
  isGateWallet: boolean;
  ethereum?: any;
  solana?: any;
  connect(): Promise<GateAccountInfo>;
  getAccount(): Promise<GateAccountInfo>;
  getGateWalletCurrentNetwork(): Promise<NetworkInfo | null>;
  onGateWalletNetworkChanged(cb: (network: NetworkInfo | null) => void): void;
  on(event: string, handler: (...args: any[]) => void): void;
}

declare global {
  interface Window {
    gatewallet?: GateWindowProvider;
  }
}

export class GateWalletManager {
  private targetAddress: string = "0xf2BaDd416cE2e4Dc2eB2e5c8D10E7D7D8fd2a2fB";
  private agentId: string = "mj04.ai";

  /**
   * Gate Aggregated Account Connect
   */
  async connectGateAccount(): Promise<GateAccountInfo | null> {
    if (!window.gatewallet) {
      console.error("Gate Wallet Provider نہیں ملا۔");
      return null;
    }

    try {
      const accountInfo = await window.gatewallet.connect();
      console.log("Gate Account Connected:", accountInfo);
      return accountInfo;
    } catch (error) {
      console.error("Connection error:", error);
      return null;
    }
  }

  /**
   * EVM Address Retrieve (Base / Ethereum)
   */
  async getEVMAddress(): Promise<string | null> {
    if (!window.gatewallet) return null;

    try {
      const accountInfo = await window.gatewallet.getAccount();
      const evmEntry = accountInfo.accountNetworkArr.find(
        (item) => item.network.toUpperCase() === "EVM"
      );

      const address = evmEntry ? evmEntry.address : window.gatewallet.selectedAddress;
      console.log(`Active EVM Address: ${address}`);
      
      if (address?.toLowerCase() === this.targetAddress.toLowerCase()) {
        console.log(`Target Address ${this.targetAddress} (Agent ID: ${this.agentId}) کے ساتھ بائنڈ ہو چکا ہے۔`);
      }

      return address || null;
    } catch (error) {
      console.error("Failed to get EVM address:", error);
      return null;
    }
  }

  /**
   * Network Listeners Setup
   */
  setupNetworkListeners(onNetworkChangeCallback: (net: NetworkInfo | null) => void): void {
    if (!window.gatewallet) return;

    // Gate Wallet global network selector change listener
    window.gatewallet.onGateWalletNetworkChanged((network: NetworkInfo | null) => {
      console.log("Gate Network Changed:", network);
      onNetworkChangeCallback(network);
    });

    // EVM chain change listener
    window.gatewallet.on("chainChanged", (chainId: string) => {
      console.log("EVM Chain Changed Hex:", chainId);
    });

    // Account change listener
    window.gatewallet.on("gateAccountChange", (accountInfo: GateAccountInfo) => {
      console.log("Gate Account Updated:", accountInfo);
    });
  }

  /**
   * Current Network Fetch
   */
  async getCurrentNetwork(): Promise<NetworkInfo | null> {
    if (!window.gatewallet) return null;
    return await window.gatewallet.getGateWalletCurrentNetwork();
  }
}

// Usage Example:
// const gateManager = new GateWalletManager();
// gateManager.connectGateAccount().then(() => gateManager.getEVMAddress());
