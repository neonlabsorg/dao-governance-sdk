import { PublicKey, TransactionInstruction } from '@solana/web3.js';
export declare function createTokenOwnerRecordInstruction(programId: PublicKey, realmKey: PublicKey, governingTokenOwnerKey: PublicKey, governingTokenMintKey: PublicKey, tokenOwnerRecordKey: PublicKey, payerKey: PublicKey): TransactionInstruction;
