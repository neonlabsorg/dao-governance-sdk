import { PublicKey } from '@solana/web3.js';
export interface ProgramAccountWithType {
    accountType: number;
}
export interface ProgramAccount<T> {
    pubkey: PublicKey;
    account: T;
    owner: PublicKey;
}
