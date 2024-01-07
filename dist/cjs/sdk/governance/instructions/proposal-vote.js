"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizeVoteInstruction = exports.relinquishVoteInstruction = exports.castVoteInstructions = exports.realmConfigKeys = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const models_1 = require("../models");
const registry_1 = require("../../registry");
function realmConfigKeys(programId, realm, voterWeightRecord, maxVoterWeightRecord) {
    const keys = [];
    const realmConfigAddress = (0, models_1.getRealmConfigAddress)(programId, realm);
    keys.push({ pubkey: realmConfigAddress, isWritable: false, isSigner: false });
    if (voterWeightRecord) {
        keys.push({ pubkey: voterWeightRecord, isWritable: false, isSigner: false });
    }
    if (maxVoterWeightRecord) {
        keys.push({ pubkey: maxVoterWeightRecord, isWritable: false, isSigner: false });
    }
    return keys;
}
exports.realmConfigKeys = realmConfigKeys;
function castVoteInstructions(programId, programVersion, realmKey, governanceKey, proposalKey, proposalOwnerRecordKey, tokenOwnerRecordKey, governanceAuthorityKey, governingTokenMint, payerKey, vote, voterWeightRecord, maxVoterWeightRecordKey) {
    const args = new models_1.CastVoteArgs(programVersion === registry_1.PROGRAM_VERSION_V1 ?
        { yesNoVote: vote.toYesNoVote(), vote: undefined } :
        { yesNoVote: undefined, vote: vote });
    const data = Buffer.from((0, borsh_1.serialize)((0, models_1.getGovernanceSchema)(programVersion), args));
    const voteRecordAddress = (0, models_1.getVoteRecordAddress)(programId, proposalKey, tokenOwnerRecordKey);
    const [realmIsWritable, governanceIsWritable] = programVersion === registry_1.PROGRAM_VERSION_V1 ? [false, false] : [true, true];
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
        { pubkey: registry_1.SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false }
    ];
    if (programVersion === registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false }, { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
    }
    keys.push(...realmConfigKeys(programId, realmKey, voterWeightRecord, maxVoterWeightRecordKey));
    return [voteRecordAddress, new web3_js_1.TransactionInstruction({ programId, keys, data })];
}
exports.castVoteInstructions = castVoteInstructions;
function relinquishVoteInstruction(programId, governanceKey, proposalKey, tokenOwnerRecord, governingTokenMint, voteRecordKey, governanceAuthority, walletKey) {
    const args = new models_1.RelinquishVoteArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
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
    return new web3_js_1.TransactionInstruction({ programId, keys, data });
}
exports.relinquishVoteInstruction = relinquishVoteInstruction;
function finalizeVoteInstruction(programId, programVersion, realmKey, governanceKey, proposalKey, proposalOwnerRecordKey, governingTokenMintKey, voterWeightRecordKey, maxVoterWeightRecordKey) {
    const args = new models_1.FinalizeVoteArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const [realmIsWritable, governanceIsWritable] = programVersion === registry_1.PROGRAM_VERSION_V1 ? [false, false] : [true, true];
    const keys = [
        { pubkey: realmKey, isWritable: realmIsWritable, isSigner: false },
        { pubkey: governanceKey, isWritable: governanceIsWritable, isSigner: false },
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: proposalOwnerRecordKey, isWritable: true, isSigner: false },
        { pubkey: governingTokenMintKey, isWritable: false, isSigner: false }
    ];
    if (programVersion === registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
    }
    keys.push(...realmConfigKeys(programId, realmKey, voterWeightRecordKey, maxVoterWeightRecordKey));
    return new web3_js_1.TransactionInstruction({ programId, keys, data });
}
exports.finalizeVoteInstruction = finalizeVoteInstruction;
