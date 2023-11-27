import { PublicKey, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { serialize } from 'borsh';
import { PROGRAM_VERSION_V1, SYSTEM_PROGRAM_ID } from '../../registry';
import { AddSignatoryArgs, CancelProposalArgs, CreateProposalArgs, CreateVotePercentage, getGovernanceSchema, getRealmConfigAddress, getSignatoryRecordAddress, GOVERNANCE_PROGRAM_SEED, GOVERNANCE_SCHEMA, VOTE_PERCENTAGE_SCHEMA } from '../models';
export const VOTE_PERCENTAGE_MAX = 10000;
export function createProposalInstruction(name, description, programId, programVersion, realmKey, governanceKey, tokenOwnerRecordKey, governingTokenMint, governanceAuthority, proposalIndex, voteType, options, useDenyOption, payerKey, voterWeightRecord, maxVoterWeightRecord) {
    const args = new CreateProposalArgs({
        name,
        description,
        governingTokenMint,
        voteType,
        options,
        useDenyOption
    });
    const data = Buffer.from(serialize(getGovernanceSchema(programVersion), args));
    const proposalIndexBuffer = Buffer.alloc(4);
    proposalIndexBuffer.writeInt32LE(proposalIndex, 0);
    const seeds = [Buffer.from(GOVERNANCE_PROGRAM_SEED), governanceKey.toBuffer(), governingTokenMint.toBuffer(), proposalIndexBuffer];
    const [proposalKey] = PublicKey.findProgramAddressSync(seeds, programId);
    const programKey = programVersion > PROGRAM_VERSION_V1 ?
        [{ pubkey: governingTokenMint, isWritable: false, isSigner: false }] : [];
    const keys = [
        { pubkey: realmKey, isWritable: false, isSigner: false },
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: governanceKey, isWritable: true, isSigner: false },
        { pubkey: tokenOwnerRecordKey, isWritable: true, isSigner: false },
        ...programKey,
        { pubkey: governanceAuthority, isWritable: false, isSigner: true },
        { pubkey: payerKey, isWritable: true, isSigner: true },
        { pubkey: SYSTEM_PROGRAM_ID, isWritable: false, isSigner: false }
    ];
    if (programVersion === PROGRAM_VERSION_V1) {
        keys.push({ pubkey: SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false });
        keys.push({ pubkey: SYSVAR_CLOCK_PUBKEY, isWritable: false, isSigner: false });
    }
    keys.push(...realmConfigAccountsKeys(programId, realmKey, voterWeightRecord, maxVoterWeightRecord));
    return [proposalKey, new TransactionInstruction({ programId, keys, data })];
}
export function realmConfigAccountsKeys(programId, realmKey, voterWeightRecord, maxVoterWeightRecord) {
    const keys = [];
    const realmConfigAddress = getRealmConfigAddress(programId, realmKey);
    keys.push({ pubkey: realmConfigAddress, isWritable: false, isSigner: false });
    if (voterWeightRecord) {
        keys.push({ pubkey: voterWeightRecord, isWritable: false, isSigner: false });
    }
    if (maxVoterWeightRecord) {
        keys.push({ pubkey: maxVoterWeightRecord, isWritable: false, isSigner: false });
    }
    return keys;
}
export function proposalSignatoryInstruction(programId, programVersion, proposalKey, tokenOwnerRecordKey, governanceAuthority, signatory, payerKey) {
    const args = new AddSignatoryArgs({ signatory });
    const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
    const signatoryRecordAddress = getSignatoryRecordAddress(programId, proposalKey, signatory);
    const keys = [
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: tokenOwnerRecordKey, isWritable: false, isSigner: false },
        { pubkey: governanceAuthority, isWritable: false, isSigner: true },
        { pubkey: signatoryRecordAddress, isWritable: true, isSigner: false },
        { pubkey: payerKey, isWritable: false, isSigner: true },
        { pubkey: SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false }
    ];
    if (programVersion === PROGRAM_VERSION_V1) {
        keys.push({ pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false });
    }
    return new TransactionInstruction({ programId, keys, data });
}
export function votePercentageInstruction(programId, governingOwnerRecord, realmPublicKey, communityMint, payerKey, voterWeightRecord, communityVoterWeightAddin, votePercentage = VOTE_PERCENTAGE_MAX) {
    const voteArgs = new CreateVotePercentage({ vote_percentage: votePercentage });
    const keys = [
        { pubkey: communityMint, isWritable: false, isSigner: false }, // 0. `[]` Governing Token mint
        { pubkey: payerKey, isWritable: false, isSigner: false }, // 1. `[]` Governing token owner
        { pubkey: payerKey, isWritable: false, isSigner: true }, // 2. `[signer]` Authority account
        { pubkey: programId, isWritable: false, isSigner: false }, // 3. `[]` The Governance program account
        { pubkey: realmPublicKey, isWritable: false, isSigner: false }, // 4. `[]` Realm account
        { pubkey: governingOwnerRecord, isWritable: false, isSigner: false }, // 5. `[]` Governing Owner Record. PDA seeds (governance program): ['governance', realm, token_mint, token_owner]
        { pubkey: voterWeightRecord, isWritable: true, isSigner: false } // 6. `[writable]` VoterWeightRecord
    ];
    const data = Buffer.from([2, ...serialize(VOTE_PERCENTAGE_SCHEMA, voteArgs)]);
    return new TransactionInstruction({ keys, programId: communityVoterWeightAddin, data });
}
export const cancelProposalInstruction = (programId, programVersion, realmKey, governanceKey, proposalKey, proposalOwnerRecordKey, governanceAuthority) => {
    const args = new CancelProposalArgs();
    const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
    const keys = [];
    if (programVersion > PROGRAM_VERSION_V1) {
        keys.push({ pubkey: realmKey, isWritable: true, isSigner: false }, { pubkey: governanceKey, isWritable: true, isSigner: false });
    }
    keys.push({ pubkey: proposalKey, isWritable: true, isSigner: false }, { pubkey: proposalOwnerRecordKey, isWritable: true, isSigner: false }, { pubkey: governanceAuthority, isWritable: false, isSigner: true });
    if (programVersion === PROGRAM_VERSION_V1) {
        keys.push({ pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
    }
    return new TransactionInstruction({ keys, programId, data });
};
//# sourceMappingURL=proposal.js.map