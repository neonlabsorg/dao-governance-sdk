import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { RawAccount } from '@solana/spl-token';
import BN from 'bn.js';
import { MaxVoterWeightRecord, VoterWeightRecord } from '../addins';
import { ProgramAccount, TokenAccount } from '../models';
export declare function depositTransaction(realmKey: PublicKey, vestingProgramKey: PublicKey, governingTokenMintKey: PublicKey, payerKey: PublicKey, depositAmount: BN, governingToken: TokenAccount<RawAccount>, voterWeight?: ProgramAccount<VoterWeightRecord>, maxVoterWeight?: ProgramAccount<MaxVoterWeightRecord>, accountRentExempt?: number, programVersion?: number): [Keypair[], Transaction];
