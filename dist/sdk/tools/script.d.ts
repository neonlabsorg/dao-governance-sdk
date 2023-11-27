import { AccountMeta, PublicKey } from '@solana/web3.js';
export declare function getErrorMessage(ex: any): string;
export declare function shortMeta(pubkey: PublicKey, isWritable?: boolean, isSigner?: boolean): AccountMeta;
