import { TransactionInstruction } from '@solana/web3.js';
import { serialize } from 'borsh';
import { getGovernanceSchema, getTokenOwnerRecordAddress, SetGovernanceDelegateArgs } from '../models';
export function governanceDelegateInstruction(programId, programVersion, realmKey, governingTokenMint, governingTokenOwner, governanceAuthority, newGovernanceDelegate) {
    const args = new SetGovernanceDelegateArgs({ newGovernanceDelegate });
    const data = Buffer.from(serialize(getGovernanceSchema(programVersion), args));
    const tokenOwnerRecordAddress = getTokenOwnerRecordAddress(programId, realmKey, governingTokenMint, governingTokenOwner);
    const keys = [
        { pubkey: governanceAuthority, isWritable: false, isSigner: true },
        { pubkey: tokenOwnerRecordAddress, isWritable: true, isSigner: false }
    ];
    return new TransactionInstruction({ programId, keys, data });
}
//# sourceMappingURL=delegate.js.map