import { TransactionInstruction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { serialize } from 'borsh';
import { SYSTEM_PROGRAM_ID } from '../../registry';
import { CreateVoterWeightRecordVestingArgs, GOVERNANCE_SCHEMA } from '../models';
export function createVoterWeightRecordByVestingAddinInstruction(params) {
    const { vestingProgramKey: programId, realmKey, governingTokenMintKey, walletKey, payerKey, voterWeightRecordKey } = params;
    const args = new CreateVoterWeightRecordVestingArgs();
    const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
    const keys = [
        { pubkey: SYSTEM_PROGRAM_ID, isWritable: false, isSigner: false },
        { pubkey: walletKey, isWritable: false, isSigner: false },
        { pubkey: payerKey, isWritable: false, isSigner: true },
        { pubkey: realmKey, isWritable: false, isSigner: false },
        { pubkey: governingTokenMintKey, isWritable: false, isSigner: false },
        { pubkey: voterWeightRecordKey, isWritable: true, isSigner: false }
    ];
    return new TransactionInstruction({ programId, keys, data });
}
