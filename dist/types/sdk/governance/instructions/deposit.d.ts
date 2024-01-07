import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import BN from 'bn.js';
export declare function depositGoverningTokensInstruction(programId: PublicKey, programVersion: number, realmKey: PublicKey, governingTokenSource: PublicKey, governingTokenMint: PublicKey, governingTokenOwner: PublicKey, payerKey: PublicKey, amount: BN, vestingProgramId?: PublicKey, voterWeightRecord?: PublicKey, maxVoterWeightRecord?: PublicKey, vestingTokenPubkey?: PublicKey, vestingPubkey?: PublicKey): TransactionInstruction;
