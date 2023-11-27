import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { serialize } from 'borsh';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { CloseVestingAccountData, WithdrawDepositedTokensData } from '../../models';
import {
  CloseVestingAccountArgs,
  GOVERNANCE_PROGRAM_SEED,
  GOVERNANCE_SCHEMA,
  WithdrawGoverningTokensArgs
} from '../models';
import { shortMeta } from '../../tools';

export function withdrawGoverningTokensInstruction(params: WithdrawDepositedTokensData): TransactionInstruction {
  const {
    programKey, realmKey, governingTokenDestinationKey, governingTokenMintKey, vestingTokenOwnerKey,
    vestingProgramKey, voterWeightRecordKey, maxVoterWeightRecordKey, vestingTokenAddressKey, vestingTokenAccountKey
  } = params;
  const args = new WithdrawGoverningTokensArgs();
  const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
  const seeds = [Buffer.from(GOVERNANCE_PROGRAM_SEED), realmKey.toBuffer(), governingTokenMintKey.toBuffer(), vestingTokenOwnerKey.toBuffer()];
  const [tokenOwnerRecordAddress] = PublicKey.findProgramAddressSync(seeds, programKey);

  // According to schema https://github.com/neonlabsorg/neon-spl-governance/blob/main/addin-vesting/program/src/instruction.rs#L47-L62
  const keys = [
    shortMeta(TOKEN_PROGRAM_ID),  // 0. `[]` The spl-token program account
    shortMeta(vestingTokenAccountKey, true), // 1. `[writable]` The vesting account. PDA seeds: [vesting spl-token account]
    shortMeta(vestingTokenAddressKey, true), // 2. `[writable]` The vesting spl-token account
    shortMeta(governingTokenDestinationKey, true), // 3. `[writable]` The destination spl-token account
    shortMeta(vestingTokenOwnerKey, true, true), // 4. `[signer]` The Vesting Owner account + writable
    shortMeta(programKey), // 5. `[]` The Governance program account
    shortMeta(realmKey), // 6. `[]` The Realm account
    shortMeta(tokenOwnerRecordAddress), // 7. `[]` Governing Owner Record. PDA seeds (governance program): ['governance', realm, token_mint, vesting_owner]
    shortMeta(voterWeightRecordKey!, true), // 8. `[writable]` The VoterWeightRecord. PDA seeds: ['voter_weight', realm, token_mint, vesting_owner]
    shortMeta(maxVoterWeightRecordKey!, true) // 9. `[writable]` The MaxVoterWeightRecord. PDA seeds: ['max_voter_weight', realm, token_mint]
  ];

  const programId = vestingProgramKey || programKey;
  return new TransactionInstruction({ keys, programId, data });
}

/// Close vesting account
export function closeVestingAccountInstruction(params: CloseVestingAccountData): TransactionInstruction {
  const { vestingProgramKey, vestingTokenAddressKey, vestingTokenOwnerKey, spillKey } = params;
  const args = new CloseVestingAccountArgs();
  const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
  const [vestingAccountKey] = PublicKey.findProgramAddressSync([vestingTokenAddressKey.toBuffer()], vestingProgramKey);

  const keys = [
    shortMeta(TOKEN_PROGRAM_ID), // 0. `[]` The spl-token program account
    shortMeta(vestingAccountKey, true), // 1. `[writable]` The Vesting account. PDA seeds: [vesting spl-token account]
    shortMeta(vestingTokenAddressKey, true), // 2. `[writable]` The vesting spl-token account
    shortMeta(vestingTokenOwnerKey, true, true), // 3. `[signer]` The vesting Owner account
    shortMeta(spillKey, true) // 4. `[writable]` Spill account
  ];

  return new TransactionInstruction({ programId: vestingProgramKey, keys, data });
}
