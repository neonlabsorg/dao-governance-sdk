import { Keypair, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { RawAccount } from '@solana/spl-token';
import BN from 'bn.js';
import { getVoterWeightRecordAddress, MaxVoterWeightRecord, VoterWeightRecord } from '../addins';
import {
  createVestingAccountInstructions,
  createVoterWeightRecordByVestingAddinInstruction,
  depositGoverningTokensInstruction
} from '../governance';
import { PROGRAM_VERSION } from '../registry';
import { ProgramAccount, TokenAccount } from '../models';

export function depositTransaction(
  realmKey: PublicKey,
  vestingProgramKey: PublicKey,
  governingTokenMintKey: PublicKey,
  payerKey: PublicKey,
  depositAmount: BN,
  governingToken: TokenAccount<RawAccount>,
  voterWeight?: ProgramAccount<VoterWeightRecord>,
  maxVoterWeight?: ProgramAccount<MaxVoterWeightRecord>,
  accountRentExempt: number = 0,
  programVersion: number = PROGRAM_VERSION
): [Keypair[], Transaction] {
  const transaction = new Transaction();
  const instructions: TransactionInstruction[] = [];
  const signers: Keypair[] = [];
  const voterWeightRecordKey = getVoterWeightRecordAddress(vestingProgramKey, realmKey, governingTokenMintKey, payerKey);

  if (!voterWeight) {
    const instruction = createVoterWeightRecordByVestingAddinInstruction({
      governingTokenMintKey,
      voterWeightRecordKey,
      realmKey,
      walletKey: payerKey,
      payerKey: payerKey,
      vestingProgramKey
    });

    instructions.push(instruction);
  }

  const [vestingAccount, vestingTokenKeypair, vestingInstructions] = createVestingAccountInstructions(
    vestingProgramKey,
    governingTokenMintKey,
    payerKey,
    accountRentExempt);
  instructions.push(...vestingInstructions);
  signers.push(vestingTokenKeypair);

  instructions.push(depositGoverningTokensInstruction(
    voterWeightRecordKey,
    programVersion,
    realmKey,
    governingToken!.pubkey,
    governingTokenMintKey,
    payerKey,
    payerKey,
    depositAmount as BN,
    vestingProgramKey,
    voterWeight?.pubkey ?? voterWeightRecordKey,
    maxVoterWeight?.pubkey,
    vestingTokenKeypair.publicKey,
    vestingAccount
  ));

  return [signers, transaction];
}
