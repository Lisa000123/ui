import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  sendBtcTransaction,
  signTransaction,
  signMessage
} from 'sats-connect';
import { isValidBTCAddress } from '@gobob/utils';
import { base64, hex } from '@scure/base';

import { WalletNetwork } from '../types';

import { PsbtInputAccounts, SatsConnector } from './base';

const getWalletNetwork = (network: WalletNetwork) => ({
  type: network === 'mainnet' ? BitcoinNetworkType.Mainnet : BitcoinNetworkType.Testnet
});

declare global {
  interface Window {
    /* @ts-ignore */
    XverseProviders: any;
  }
}

class XverseConnector extends SatsConnector {
  id = 'xverse';
  name = 'Xverse';
  homepage = 'https://www.xverse.app/';

  constructor(network: WalletNetwork) {
    super(network);
  }

  async connect(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await getAddress({
        payload: {
          purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
          message: 'Address for receiving Ordinals and payments',
          network: getWalletNetwork(this.network)
        },
        onFinish: (res) => {
          const { address: ordinalsAddress } = res.addresses.find(
            (address) => address.purpose === AddressPurpose.Ordinals
          ) as {
            address: string;
            publicKey: string;
            purpose: string;
          };

          const { address: paymentAddress, publicKey } = res.addresses.find(
            (address) => address.purpose === AddressPurpose.Payment
          ) as {
            address: string;
            publicKey: string;
            purpose: string;
          };

          if (!isValidBTCAddress(this.network as any, paymentAddress)) {
            throw new Error(`Invalid Network. Please switch to bitcoin ${this.network}.`);
          }

          // P2SH
          this.address = paymentAddress;
          // P2TR
          this.ordinalsAddress = ordinalsAddress;
          // P2SH
          this.paymentAddress = paymentAddress;
          this.publicKey = publicKey;
          resolve();
        },
        onCancel: () => {
          reject(new Error('User rejected connect'));
        }
      });
    });
  }

  async isReady() {
    this.ready = !!window.XverseProviders;

    return this.ready;
  }

  async signMessage(message: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!this.address) {
        return reject(new Error('Something went wrong while connecting'));
      }

      await signMessage({
        payload: {
          address: this.address,
          message,
          network: getWalletNetwork(this.network)
        },
        onFinish: (response) => {
          resolve(response);
        },
        onCancel: () => reject(new Error('Canceled'))
      });
    });
  }

  async sendToAddress(toAddress: string, amount: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!this.paymentAddress) {
        return reject(new Error('Something went wrong while connecting'));
      }
      await sendBtcTransaction({
        payload: {
          network: getWalletNetwork(this.network),
          recipients: [{ address: toAddress, amountSats: BigInt(amount) }],
          senderAddress: this.paymentAddress
        },
        onFinish: (response) => {
          resolve(response);
        },
        onCancel: () => {
          reject(new Error('Send BTC Transaction canceled'));
        }
      });
    });
  }

  // async inscribe(contentType: 'text' | 'image', content: string): Promise<string> {
  //   return new Promise(async (resolve, reject) => {
  //     await createInscription({
  //       payload: {
  //         network: getWalletNetwork(this.network),
  //         content,
  //         contentType: contentType === 'text' ? 'text/plain;charset=utf-8' : 'image/jpeg',
  //         payloadType: contentType === 'text' ? 'PLAIN_TEXT' : 'BASE_64'
  //       },
  //       onFinish: (response) => {
  //         resolve(response.txId);
  //       },
  //       onCancel: () => reject(new Error('Canceled'))
  //     });
  //   });
  // }

  async signPsbt(psbtHex: string, psbtInputAccounts: PsbtInputAccounts[]): Promise<string> {
    // https://docs.xverse.app/sats-connect/bitcoin-methods/signpsbt
    return new Promise(async (resolve, reject) => {
      if (!this.ordinalsAddress) {
        return reject(new Error('Something went wrong while connecting'));
      }

      const psbtBase64 = base64.encode(hex.decode(psbtHex));

      await signTransaction({
        payload: {
          network: getWalletNetwork(this.network),
          message: 'Sign Transaction',
          psbtBase64: psbtBase64,
          broadcast: false,
          inputsToSign: psbtInputAccounts
        },
        onFinish: (response) => {
          resolve(hex.encode(base64.decode(response.psbtBase64)));
        },
        onCancel: () => reject(new Error('Canceled'))
      });
    });
  }
}

export { XverseConnector };
