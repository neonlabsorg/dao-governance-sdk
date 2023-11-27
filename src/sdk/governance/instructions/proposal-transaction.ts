import {
  AccountMeta,
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction
} from '@solana/web3.js';
import { serialize } from 'borsh';
import {
  AccountMetaData,
  ExecuteTransactionArgs,
  getGovernanceSchema,
  getNativeTreasuryAddress,
  getProposalTransactionAddress,
  GOVERNANCE_SCHEMA,
  InsertTransactionArgs,
  InstructionData,
  RemoveTransactionArgs,
  SignOffProposalArgs
} from '../models';
import { PROGRAM_VERSION_V1, PROGRAM_VERSION_V2, SYSTEM_PROGRAM_ID } from '../../registry';

export function removeTransactionInstruction(
  programId: PublicKey,
  proposalKey: PublicKey,
  tokenOwnerRecordKey: PublicKey,
  governanceAuthorityKey: PublicKey,
  proposalTransactionKey: PublicKey,
  walletKey: PublicKey
): TransactionInstruction {
  const args = new RemoveTransactionArgs();
  const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));

  const keys: AccountMeta[] = [
    { pubkey: proposalKey, isWritable: true, isSigner: false },
    { pubkey: tokenOwnerRecordKey, isWritable: false, isSigner: false },
    { pubkey: governanceAuthorityKey, isWritable: false, isSigner: true },
    { pubkey: proposalTransactionKey, isWritable: true, isSigner: false },
    { pubkey: walletKey, isWritable: true, isSigner: false }
  ];

  return new TransactionInstruction({ keys, programId, data });
}

export function insertTransactionInstruction(
  programId: PublicKey,
  programVersion: number,
  governanceKey: PublicKey,
  proposalKey: PublicKey,
  tokenOwnerRecordKey: PublicKey,
  governanceAuthorityKey: PublicKey,
  payerKey: PublicKey,
  transactionInstructions: InstructionData[],
  index: number,
  optionIndex: number,
  holdUpTime: number
): TransactionInstruction {
  const args = new InsertTransactionArgs({
    index,
    optionIndex,
    holdUpTime,
    instructionData: programVersion === PROGRAM_VERSION_V1 ? transactionInstructions[0] : undefined,
    instructions: programVersion >= PROGRAM_VERSION_V2 ? transactionInstructions : undefined
  });
  const data = Buffer.from(serialize(getGovernanceSchema(programVersion), args));
  const proposalTransactionAddress = getProposalTransactionAddress(programId, programVersion, proposalKey, optionIndex, index);

  const keys: AccountMeta[] = [
    { pubkey: governanceKey, isWritable: false, isSigner: false },
    { pubkey: proposalKey, isWritable: true, isSigner: false },
    { pubkey: tokenOwnerRecordKey, isWritable: false, isSigner: false },
    { pubkey: governanceAuthorityKey, isWritable: false, isSigner: true },
    { pubkey: proposalTransactionAddress, isWritable: true, isSigner: false },
    { pubkey: payerKey, isWritable: true, isSigner: true },
    { pubkey: SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false }
  ];

  return new TransactionInstruction({ programId, keys, data });
}

export function signOffProposalInstruction(
  programId: PublicKey,
  programVersion: number,
  realmKey: PublicKey,
  governanceKey: PublicKey,
  proposalKey: PublicKey,
  signatoryKey: PublicKey,
  signatoryRecordKey?: PublicKey,
  proposalOwnerRecordKey?: PublicKey
): TransactionInstruction {
  const args = new SignOffProposalArgs();
  const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
  const keys: AccountMeta[] = [];

  if (programVersion > PROGRAM_VERSION_V1) {
    keys.push({ pubkey: realmKey, isWritable: true, isSigner: false },
      { pubkey: governanceKey, isWritable: true, isSigner: false });
  }

  keys.push({ pubkey: proposalKey, isWritable: true, isSigner: false });

  if (programVersion === PROGRAM_VERSION_V1) {
    keys.push({ pubkey: signatoryRecordKey!, isWritable: true, isSigner: false },
      { pubkey: signatoryKey, isWritable: false, isSigner: true },
      { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
  } else {
    keys.push({ pubkey: signatoryKey, isWritable: false, isSigner: true });
    if (proposalOwnerRecordKey) {
      keys.push({ pubkey: proposalOwnerRecordKey, isWritable: false, isSigner: false });
    } else {
      keys.push({ pubkey: signatoryRecordKey!, isWritable: true, isSigner: false });
    }
  }

  return new TransactionInstruction({ programId, keys, data });
}

export function executeTransactionInstruction(
  programId: PublicKey,
  programVersion: number,
  governanceKey: PublicKey,
  proposalKey: PublicKey,
  transactionAddressKey: PublicKey,
  transactionInstructions: InstructionData[]
): TransactionInstruction {
  const args = new ExecuteTransactionArgs();
  const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
  const nativeTreasury = getNativeTreasuryAddress(programId, governanceKey);

  const keys = [
    { pubkey: governanceKey, isWritable: false, isSigner: false },
    { pubkey: proposalKey, isWritable: true, isSigner: false },
    { pubkey: transactionAddressKey, isWritable: true, isSigner: false }
  ];

  if (programVersion === PROGRAM_VERSION_V1) {
    keys.push({ pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
  }

  // When an instruction needs to be signed by the Governance PDA or the Native treasury then its isSigner flag has to be reset on AccountMeta
  // because the signature will be required during cpi call invoke_signed() and not when we send ExecuteInstruction
  for (let instruction of transactionInstructions) {
    instruction.accounts = instruction.accounts.map(a => {
      if ((a.pubkey.equals(governanceKey) || a.pubkey.equals(nativeTreasury)) && a.isSigner) {
        return new AccountMetaData({ pubkey: a.pubkey, isWritable: a.isWritable, isSigner: false });
      }
      return a;
    });

    keys.push({
      pubkey: instruction.programId,
      isWritable: false,
      isSigner: false
    }, ...instruction.accounts);
  }

  return new TransactionInstruction({ programId, keys, data });
}
