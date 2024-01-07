import { TransactionInstruction } from '@solana/web3.js';
import { serialize } from 'borsh';
import { CreateTokenOwnerRecordArgs, GOVERNANCE_SCHEMA } from '../models';
import { SYSTEM_PROGRAM_ID } from '../../registry';
export function createTokenOwnerRecordInstruction(programId, realmKey, governingTokenOwnerKey, governingTokenMintKey, tokenOwnerRecordKey, payerKey) {
    const args = new CreateTokenOwnerRecordArgs();
    const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
    const keys = [
        { pubkey: realmKey, isWritable: false, isSigner: false },
        { pubkey: governingTokenOwnerKey, isWritable: false, isSigner: false },
        { pubkey: tokenOwnerRecordKey, isWritable: true, isSigner: false },
        { pubkey: governingTokenMintKey, isWritable: false, isSigner: false },
        { pubkey: payerKey, isWritable: true, isSigner: true },
        { pubkey: SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false }
    ];
    return new TransactionInstruction({ keys, programId, data });
}
