"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelProposalInstruction = exports.votePercentageInstruction = exports.proposalSignatoryInstruction = exports.realmConfigAccountsKeys = exports.createProposalInstruction = exports.VOTE_PERCENTAGE_MAX = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const registry_1 = require("../../registry");
const models_1 = require("../models");
exports.VOTE_PERCENTAGE_MAX = 10000;
function createProposalInstruction(name, description, programId, programVersion, realmKey, governanceKey, tokenOwnerRecordKey, governingTokenMint, governanceAuthority, proposalIndex, voteType, options, useDenyOption, payerKey, voterWeightRecord, maxVoterWeightRecord) {
    const args = new models_1.CreateProposalArgs({
        name,
        description,
        governingTokenMint,
        voteType,
        options,
        useDenyOption
    });
    const data = Buffer.from((0, borsh_1.serialize)((0, models_1.getGovernanceSchema)(programVersion), args));
    const proposalIndexBuffer = Buffer.alloc(4);
    proposalIndexBuffer.writeInt32LE(proposalIndex, 0);
    const seeds = [Buffer.from(models_1.GOVERNANCE_PROGRAM_SEED), governanceKey.toBuffer(), governingTokenMint.toBuffer(), proposalIndexBuffer];
    const [proposalKey] = web3_js_1.PublicKey.findProgramAddressSync(seeds, programId);
    const programKey = programVersion > registry_1.PROGRAM_VERSION_V1 ?
        [{ pubkey: governingTokenMint, isWritable: false, isSigner: false }] : [];
    const keys = [
        { pubkey: realmKey, isWritable: false, isSigner: false },
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: governanceKey, isWritable: true, isSigner: false },
        { pubkey: tokenOwnerRecordKey, isWritable: true, isSigner: false },
        ...programKey,
        { pubkey: governanceAuthority, isWritable: false, isSigner: true },
        { pubkey: payerKey, isWritable: true, isSigner: true },
        { pubkey: registry_1.SYSTEM_PROGRAM_ID, isWritable: false, isSigner: false }
    ];
    if (programVersion === registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false });
        keys.push({ pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isWritable: false, isSigner: false });
    }
    keys.push(...realmConfigAccountsKeys(programId, realmKey, voterWeightRecord, maxVoterWeightRecord));
    return [proposalKey, new web3_js_1.TransactionInstruction({ programId, keys, data })];
}
exports.createProposalInstruction = createProposalInstruction;
function realmConfigAccountsKeys(programId, realmKey, voterWeightRecord, maxVoterWeightRecord) {
    const keys = [];
    const realmConfigAddress = (0, models_1.getRealmConfigAddress)(programId, realmKey);
    keys.push({ pubkey: realmConfigAddress, isWritable: false, isSigner: false });
    if (voterWeightRecord) {
        keys.push({ pubkey: voterWeightRecord, isWritable: false, isSigner: false });
    }
    if (maxVoterWeightRecord) {
        keys.push({ pubkey: maxVoterWeightRecord, isWritable: false, isSigner: false });
    }
    return keys;
}
exports.realmConfigAccountsKeys = realmConfigAccountsKeys;
function proposalSignatoryInstruction(programId, programVersion, proposalKey, tokenOwnerRecordKey, governanceAuthority, signatory, payerKey) {
    const args = new models_1.AddSignatoryArgs({ signatory });
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const signatoryRecordAddress = (0, models_1.getSignatoryRecordAddress)(programId, proposalKey, signatory);
    const keys = [
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: tokenOwnerRecordKey, isWritable: false, isSigner: false },
        { pubkey: governanceAuthority, isWritable: false, isSigner: true },
        { pubkey: signatoryRecordAddress, isWritable: true, isSigner: false },
        { pubkey: payerKey, isWritable: false, isSigner: true },
        { pubkey: registry_1.SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false }
    ];
    if (programVersion === registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false });
    }
    return new web3_js_1.TransactionInstruction({ programId, keys, data });
}
exports.proposalSignatoryInstruction = proposalSignatoryInstruction;
function votePercentageInstruction(programId, governingOwnerRecord, realmPublicKey, communityMint, payerKey, voterWeightRecord, communityVoterWeightAddin, votePercentage = exports.VOTE_PERCENTAGE_MAX) {
    const voteArgs = new models_1.CreateVotePercentage({ vote_percentage: votePercentage });
    const keys = [
        { pubkey: communityMint, isWritable: false, isSigner: false }, // 0. `[]` Governing Token mint
        { pubkey: payerKey, isWritable: false, isSigner: false }, // 1. `[]` Governing token owner
        { pubkey: payerKey, isWritable: false, isSigner: true }, // 2. `[signer]` Authority account
        { pubkey: programId, isWritable: false, isSigner: false }, // 3. `[]` The Governance program account
        { pubkey: realmPublicKey, isWritable: false, isSigner: false }, // 4. `[]` Realm account
        { pubkey: governingOwnerRecord, isWritable: false, isSigner: false }, // 5. `[]` Governing Owner Record. PDA seeds (governance program): ['governance', realm, token_mint, token_owner]
        { pubkey: voterWeightRecord, isWritable: true, isSigner: false } // 6. `[writable]` VoterWeightRecord
    ];
    const data = Buffer.from([2, ...(0, borsh_1.serialize)(models_1.VOTE_PERCENTAGE_SCHEMA, voteArgs)]);
    return new web3_js_1.TransactionInstruction({ keys, programId: communityVoterWeightAddin, data });
}
exports.votePercentageInstruction = votePercentageInstruction;
const cancelProposalInstruction = (programId, programVersion, realmKey, governanceKey, proposalKey, proposalOwnerRecordKey, governanceAuthority) => {
    const args = new models_1.CancelProposalArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const keys = [];
    if (programVersion > registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: realmKey, isWritable: true, isSigner: false }, { pubkey: governanceKey, isWritable: true, isSigner: false });
    }
    keys.push({ pubkey: proposalKey, isWritable: true, isSigner: false }, { pubkey: proposalOwnerRecordKey, isWritable: true, isSigner: false }, { pubkey: governanceAuthority, isWritable: false, isSigner: true });
    if (programVersion === registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
    }
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
};
exports.cancelProposalInstruction = cancelProposalInstruction;
