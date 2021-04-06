import { Client, Environment, kinToQuarks, PrivateKey, PublicKey, TransactionType } from '@kinecosystem/kin-sdk-v2'
import { EventsHandler, SignTransactionHandler, SignTransactionRequest, SignTransactionResponse } from '@kinecosystem/kin-sdk-v2/dist/webhook';
import express from 'express'

export class Kin {

  static generateKey() {
    return PrivateKey.random()
  }

  readonly client: Client
  readonly app: any;

  constructor(env: Environment, appIndex?: number) {
    this.client = new Client(env, { appIndex, kinVersion: 4 })
    this.app = express()
  }

  async registerEventsHook(webhookSecret: string, callback: (e: any) => any) {
    this.app.use('/kinTransactionEvents', express.json());
    this.app.use(
      '/kinTransactionEvents',
      EventsHandler((events) => {
        callback(events);
      }, webhookSecret)
    );
  }

  async registerSignTxHook(webhookSecret: string, env: Environment, callback: (req: SignTransactionRequest, resp: SignTransactionResponse) => any) {
    this.app.use('/signTransaction', express.json());
    this.app.use(
      '/signTransaction',
      SignTransactionHandler(
        env,
        (SignTransactionRequest, SignTransactionResponse) => {
          callback(SignTransactionRequest, SignTransactionResponse);
        },
        webhookSecret
      )
    );
  }

  async createAccount(privateKey: PrivateKey): Promise<PublicKey[]> {
    // Create Account
    await this.client.createAccount(privateKey)
    // Resolve Token Account
    return this.client.resolveTokenAccounts(privateKey.publicKey())
  }

  async getBalance(account: PublicKey) {
    return this.client.getBalance(account)
  }

  async requestAirdrop(publicKey: PublicKey, amount: string) {
    return this.client.requestAirdrop(publicKey, kinToQuarks(amount))
  }

  async submitPayment(
    sender: PrivateKey,
    destination: PublicKey,
    amount: string,
    type: TransactionType,
    memo?: string,
  ) {
    return this.client.submitPayment({
      sender,
      destination,
      type,
      memo,
      quarks: kinToQuarks(amount),
    })
  }

  async submitEarn(sender: PrivateKey, destination: PublicKey, amount: string, memo?: string) {
    return this.submitPayment(sender, destination, amount, TransactionType.Earn, memo)
  }

  async submitSpend(sender: PrivateKey, destination: PublicKey, amount: string, memo?: string) {
    return this.submitPayment(sender, destination, amount, TransactionType.Spend, memo)
  }

  async submitP2P(sender: PrivateKey, destination: PublicKey, amount: string, memo?: string) {
    return this.submitPayment(sender, destination, amount, TransactionType.P2P, memo)
  }
}
