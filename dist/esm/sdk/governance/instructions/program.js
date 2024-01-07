import { TransactionInstruction } from '@solana/web3.js';
import { serialize } from 'borsh';
import { getProgramMetadataAddress, GOVERNANCE_SCHEMA, UpdateProgramMetadataArgs } from '../models';
import { SYSTEM_PROGRAM_ID } from '../../registry';
export function updateProgramMetadataInstruction(programId, payer) {
    const programMetadataAddress = getProgramMetadataAddress(programId);
    const args = new UpdateProgramMetadataArgs();
    const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
    const keys = [
        { pubkey: programMetadataAddress, isWritable: true, isSigner: false },
        { pubkey: payer, isWritable: true, isSigner: true },
        { pubkey: SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false }
    ];
    return new TransactionInstruction({ keys, programId, data });
}
