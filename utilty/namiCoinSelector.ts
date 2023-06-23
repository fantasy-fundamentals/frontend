const isBrowser = () => typeof window !== "undefined";

export const getCardano = (): Cardano | undefined => {
  const cardano = isBrowser() && window?.cardano;
  return cardano;
};

export type Cardano = {
  [key: string]: {
    name: string;
    icon: string;
    version: string;
    api?: WalletApi;
    enable: () => Promise<WalletApi>;
    isEnabled: () => Promise<boolean>;
  };
};

export interface WalletApi {
  getNetworkId: () => Promise<number>;
  getUtxos: () => Promise<string[] | undefined>;
  getBalance: () => Promise<string>;
  getUsedAddresses: () => Promise<string[]>;
  getUnusedAddresses: () => Promise<string[]>;
  getChangeAddress: () => Promise<string>;
  getRewardAddresses: () => Promise<string[]>;
  signTx: (tx: string, partialSign: boolean) => Promise<string>;
  signData: (
    address: string,
    payload: string
  ) => Promise<{ signature: string; key: string }>;
  submitTx: (tx: string) => Promise<string>;
  getCollateral: () => Promise<string[]>;
  experimental: {
    getCollateral: () => Promise<string[]>;
    on: (eventName: string, callback: Function) => void;
    off: (eventName: string, callback: Function) => void;
  };
}
