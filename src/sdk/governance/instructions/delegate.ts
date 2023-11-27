import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { serialize } from 'borsh';
import {
  getGovernanceSchema,
  getTokenOwnerRecordAddress,
  SetGovernanceDelegateArgs
} from '../models';

export function governanceDelegateInstruction(
  programId: PublicKey,
  programVersion: number,
  realmKey: PublicKey,
  governingTokenMint: PublicKey,
  governingTokenOwner: PublicKey,
  governanceAuthority: PublicKey,
  newGovernanceDelegate?: PublicKey
): TransactionInstruction {
  const args = new SetGovernanceDelegateArgs({ newGovernanceDelegate });
  const data = Buffer.from(serialize(getGovernanceSchema(programVersion), args));
  const tokenOwnerRecordAddress = getTokenOwnerRecordAddress(programId, realmKey, governingTokenMint, governingTokenOwner);

  const keys = [
    { pubkey: governanceAuthority, isWritable: false, isSigner: true },
    { pubkey: tokenOwnerRecordAddress, isWritable: true, isSigner: false }
  ];

  return new TransactionInstruction({ programId, keys, data });
}
