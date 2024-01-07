import { SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { serialize } from 'borsh';
import { CastVoteArgs, FinalizeVoteArgs, getGovernanceSchema, getRealmConfigAddress, getVoteRecordAddress, GOVERNANCE_SCHEMA, RelinquishVoteArgs } from '../models';
import { PROGRAM_VERSION_V1, SYSTEM_PROGRAM_ID } from '../../registry';
export function realmConfigKeys(programId, realm, voterWeightRecord, maxVoterWeightRecord) {
    const keys = [];
    const realmConfigAddress = getRealmConfigAddress(programId, realm);
    keys.push({ pubkey: realmConfigAddress, isWritable: false, isSigner: false });
    if (voterWeightRecord) {
        keys.push({ pubkey: voterWeightRecord, isWritable: false, isSigner: false });
    }
    if (maxVoterWeightRecord) {
        keys.push({ pubkey: maxVoterWeightRecord, isWritable: false, isSigner: false });
    }
    return keys;
}
export function castVoteInstructions(programId, programVersion, realmKey, governanceKey, proposalKey, proposalOwnerRecordKey, tokenOwnerRecordKey, governanceAuthorityKey, governingTokenMint, payerKey, vote, voterWeightRecord, maxVoterWeightRecordKey) {
    const args = new CastVoteArgs(programVersion === PROGRAM_VERSION_V1 ?
        { yesNoVote: vote.toYesNoVote(), vote: undefined } :
        { yesNoVote: undefined, vote: vote });
    const data = Buffer.from(serialize(getGovernanceSchema(programVersion), args));
    const voteRecordAddress = getVoteRecordAddress(programId, proposalKey, tokenOwnerRecordKey);
    const [realmIsWritable, governanceIsWritable] = programVersion === PROGRAM_VERSION_V1 ? [false, false] : [true, true];
    const keys = [
        { pubkey: realmKey, isWritable: realmIsWritable, isSigner: false },
        { pubkey: governanceKey, isWritable: governanceIsWritable, isSigner: false },
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: proposalOwnerRecordKey, isWritable: true, isSigner: false },
        { pubkey: tokenOwnerRecordKey, isWritable: true, isSigner: false },
        { pubkey: governanceAuthorityKey, isWritable: false, isSigner: true },
        { pubkey: voteRecordAddress, isWritable: true, isSigner: false },
        { pubkey: governingTokenMint, isWritable: false, isSigner: false },
        { pubkey: payerKey, isWritable: false, isSigner: true },
        { pubkey: SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false }
    ];
    if (programVersion === PROGRAM_VERSION_V1) {
        keys.push({ pubkey: SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false }, { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
    }
    keys.push(...realmConfigKeys(programId, realmKey, voterWeightRecord, maxVoterWeightRecordKey));
    return [voteRecordAddress, new TransactionInstruction({ programId, keys, data })];
}
export function relinquishVoteInstruction(programId, governanceKey, proposalKey, tokenOwnerRecord, governingTokenMint, voteRecordKey, governanceAuthority, walletKey) {
    const args = new RelinquishVoteArgs();
    const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
    const keys = [
        { pubkey: governanceKey, isWritable: false, isSigner: false },
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: tokenOwnerRecord, isWritable: true, isSigner: false },
        { pubkey: voteRecordKey, isWritable: true, isSigner: false },
        { pubkey: governingTokenMint, isWritable: false, isSigner: false }
    ];
    if (governanceAuthority && walletKey) {
        keys.push({ pubkey: governanceAuthority, isWritable: false, isSigner: true }, { pubkey: walletKey, isWritable: true, isSigner: false });
    }
    return new TransactionInstruction({ programId, keys, data });
}
export function finalizeVoteInstruction(programId, programVersion, realmKey, governanceKey, proposalKey, proposalOwnerRecordKey, governingTokenMintKey, voterWeightRecordKey, maxVoterWeightRecordKey) {
    const args = new FinalizeVoteArgs();
    const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));
    const [realmIsWritable, governanceIsWritable] = programVersion === PROGRAM_VERSION_V1 ? [false, false] : [true, true];
    const keys = [
        { pubkey: realmKey, isWritable: realmIsWritable, isSigner: false },
        { pubkey: governanceKey, isWritable: governanceIsWritable, isSigner: false },
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: proposalOwnerRecordKey, isWritable: true, isSigner: false },
        { pubkey: governingTokenMintKey, isWritable: false, isSigner: false }
    ];
    if (programVersion === PROGRAM_VERSION_V1) {
        keys.push({ pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
    }
    keys.push(...realmConfigKeys(programId, realmKey, voterWeightRecordKey, maxVoterWeightRecordKey));
    return new TransactionInstruction({ programId, keys, data });
}
