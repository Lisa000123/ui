import { okxLogo } from '../assets/okx';
import { WalletNetwork } from '../types';

import { PsbtInputAccounts, SatsConnector } from './base';

const getLibNetwork = (network: Network): WalletNetwork => {
  switch (network) {
    case 'livenet':
      return 'mainnet';
    case 'testnet':
      return 'testnet';
  }
};

type AccountChangeEventParams = { address: string; publicKey: string; compressedPublicKey: string };

type AccountChangedEvent = (event: 'accountChanged', handler: (account: AccountChangeEventParams) => void) => void;

type Inscription = {
  inscriptionId: string;
  inscriptionNumber: string;
  address: string;
  outputValue: string;
  content: string;
  contentLength: string;
  contentType: string;
  preview: string;
  timestamp: number;
  offset: number;
  genesisTransaction: string;
  location: string;
};

type getInscriptionsResult = { total: number; list: Inscription[] };

type SendInscriptionsResult = { txid: string };

type Balance = { confirmed: number; unconfirmed: number; total: number };

type Network = 'livenet' | 'testnet';

type OKXWallet = {
  connect: () => Promise<{
    address: string;
    publicKey: string;
  }>;
  requestAccounts: () => Promise<string[]>;
  getAccounts: () => Promise<string[]>;
  getNetwork: () => Promise<Network>;
  getPublicKey: () => Promise<string>;
  getBalance: () => Promise<Balance>;
  sendBitcoin: (address: string, atomicAmount: number, options?: { feeRate: number }) => Promise<string>;
  on: AccountChangedEvent;
  getInscriptions: (cursor: number, size: number) => Promise<getInscriptionsResult>;
  sendInscription: (
    address: string,
    inscriptionId: string,
    options?: { feeRate: number }
  ) => Promise<SendInscriptionsResult>;
  signMessage: (msg: string, type?: 'ecdsa' | 'bip322-simple') => Promise<string>;
  signPsbt: (
    psbtHex: string,
    options?: {
      autoFinalized?: boolean;
      toSignInputs: {
        index: number;
        address?: string;
        publicKey?: string;
        sighashTypes?: number[];
        disableTweakSigner?: boolean;
      }[];
    }
  ) => Promise<string>;
};

declare global {
  interface Window {
    okxwallet: {
      bitcoin: OKXWallet;
    };
  }
}

class OKXConnector extends SatsConnector {
  constructor(network: WalletNetwork) {
    super(network, 'OKX Wallet', 'OKX Wallet', 'https://www.okx.com/web3', okxLogo);
  }

  async connect(): Promise<void> {
    const network = await window.okxwallet.bitcoin.getNetwork();
    const mappedNetwork = getLibNetwork(network);

    if (mappedNetwork !== this.network) {
      throw new Error(`Invalid Network. Please switch to bitcoin ${this.network}.`);
    }

    const [accounts, publickKey] = await Promise.all([
      window.okxwallet.bitcoin.requestAccounts(),
      window.okxwallet.bitcoin.getPublicKey()
    ]);

    this.address = accounts[0];
    this.paymentAddress = accounts[0];
    this.ordinalsAddress = accounts[0];
    this.publicKey = publickKey;

    window.okxwallet.bitcoin.on('accountChanged', this.changeAccount);
  }

  signMessage(message: string) {
    return window.okxwallet.bitcoin.signMessage(message);
  }

  async changeAccount({ address, publicKey }: AccountChangeEventParams) {
    this.address = address;
    this.publicKey = publicKey;
  }

  async isReady() {
    this.ready = typeof window.okxwallet?.bitcoin !== 'undefined';

    return this.ready;
  }

  async sendToAddress(toAddress: string, amount: number): Promise<string> {
    return window.okxwallet.bitcoin.sendBitcoin(toAddress, amount);
  }

  async signPsbt(psbtHex: string, psbtInputAccounts: PsbtInputAccounts[]): Promise<string> {
    // https://docs.unisat.io/dev/unisat-developer-service/unisat-wallet#signpsbt
    const publicKey = await this.getPublicKey();

    // Extract all inputs to be signed
    let inputs: number[] = [];

    for (const input of psbtInputAccounts) {
      for (const index of input.signingIndexes) {
        inputs.push(index);
      }
    }

    const toSignInputs = inputs.map((index) => {
      return {
        index,
        publicKey,
        disableTweakSigner: true
      };
    });

    const signedPsbtHex = await window.okxwallet.bitcoin.signPsbt(psbtHex, {
      autoFinalized: false,
      toSignInputs: toSignInputs
    });

    return signedPsbtHex;
  }
}

export { OKXConnector };
