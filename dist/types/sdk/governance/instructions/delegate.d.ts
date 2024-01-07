import { PublicKey, TransactionInstruction } from '@solana/web3.js';
export declare function governanceDelegateInstruction(programId: PublicKey, programVersion: number, realmKey: PublicKey, governingTokenMint: PublicKey, governingTokenOwner: PublicKey, governanceAuthority: PublicKey, newGovernanceDelegate?: PublicKey): TransactionInstruction;
