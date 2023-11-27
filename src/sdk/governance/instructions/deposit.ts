import { PublicKey, SYSVAR_RENT_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { serialize } from 'borsh';
import BN from 'bn.js';
import {
  DepositGoverningTokensArgs,
  DepositGoverningTokensMultiArgs,
  getGovernanceSchema,
  getTokenOwnerRecordAddress,
  GOVERNANCE_PROGRAM_SEED
} from '../models';
import { shortMeta } from '../../tools';
import { PROGRAM_VERSION_V1, SYSTEM_PROGRAM_ID } from '../../registry';

export function depositGoverningTokensInstruction(
  programId: PublicKey,
  programVersion: number,
  realmKey: PublicKey,
  governingTokenSource: PublicKey,
  governingTokenMint: PublicKey,
  governingTokenOwner: PublicKey,
  payerKey: PublicKey,
  amount: BN,
  vestingProgramId?: PublicKey,
  voterWeightRecord?: PublicKey,
  maxVoterWeightRecord?: PublicKey,
  vestingTokenPubkey?: PublicKey,
  vestingPubkey?: PublicKey
): TransactionInstruction {
  let data: Buffer;
  if (!vestingProgramId) {
    // obsolete governance workflow
    data = Buffer.from(serialize(getGovernanceSchema(programVersion), new DepositGoverningTokensArgs({ amount })));
    const tokenOwnerRecordAddress = getTokenOwnerRecordAddress(programId, realmKey, governingTokenMint, governingTokenOwner);
    const [governingTokenHoldingAddress] = PublicKey.findProgramAddressSync([Buffer.from(GOVERNANCE_PROGRAM_SEED), realmKey.toBuffer(), governingTokenMint.toBuffer()], programId);
    vestingTokenPubkey = tokenOwnerRecordAddress;
    vestingPubkey = governingTokenHoldingAddress;
  } else {
    // generate correct deposit payload
    const obj = new DepositGoverningTokensMultiArgs([{ amount, release_time: 0 }]);
    data = Buffer.from(serialize(getGovernanceSchema(programVersion), obj));
  }

  // According to schema https://github.com/neonlabsorg/neon-spl-governance/blob/main/addin-vesting/program/src/instruction.rs#L21-L44
  const keys = [
    shortMeta(SYSTEM_PROGRAM_ID), // 0. `[]` The system program account
    shortMeta(TOKEN_PROGRAM_ID),  // 1. `[]` The spl-token program account
    shortMeta(vestingPubkey!, true),  // 2. `[writable]` The vesting account. PDA seeds: [vesting spl-token account]
    shortMeta(vestingTokenPubkey!, true, true), // 3. `[writable]` The vesting spl-token account    // + signer, it's new account
    shortMeta(governingTokenOwner, true, true), // 4. `[signer]` The source spl-token account owner    // + writable
    shortMeta(governingTokenSource, true),  // 5. `[writable]` The source spl-token account
    shortMeta(governingTokenOwner), // 6. `[]` The Vesting Owner account    // 💛 = 4
    shortMeta(payerKey, true, true),  // 7. `[signer]` Payer    // 💛 = 4    // + writable
    shortMeta(realmKey),  // 9. `[]` The Realm account
    shortMeta(voterWeightRecord!, true),  // 10. `[writable]` The VoterWeightRecord. PDA seeds: ['voter_weight', realm, token_mint, token_owner]
    shortMeta(maxVoterWeightRecord!, true)  // 11. `[writable]` The MaxVoterWeightRecord. PDA seeds: ['max_voter_weight', realm, token_mint]
  ];

  if (programVersion === PROGRAM_VERSION_V1) {
    keys.push({ pubkey: SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false });
  }

  return new TransactionInstruction({ programId: vestingProgramId!, keys, data });
}
