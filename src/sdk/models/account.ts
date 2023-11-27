import { AccountInfo, PublicKey } from '@solana/web3.js';

export interface ProgramAccountWithType {
  accountType: number;
}

export interface ProgramAccount<T> {
  pubkey: PublicKey;
  account: T;
  owner: PublicKey;
}

export interface TokenAccount<T> {
  pubkey: PublicKey;
  account: T;
  data: AccountInfo<Buffer>;
}
