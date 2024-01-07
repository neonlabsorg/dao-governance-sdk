"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTransactionInstruction = exports.signOffProposalInstruction = exports.insertTransactionInstruction = exports.removeTransactionInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const models_1 = require("../models");
const registry_1 = require("../../registry");
function removeTransactionInstruction(programId, proposalKey, tokenOwnerRecordKey, governanceAuthorityKey, proposalTransactionKey, walletKey) {
    const args = new models_1.RemoveTransactionArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const keys = [
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: tokenOwnerRecordKey, isWritable: false, isSigner: false },
        { pubkey: governanceAuthorityKey, isWritable: false, isSigner: true },
        { pubkey: proposalTransactionKey, isWritable: true, isSigner: false },
        { pubkey: walletKey, isWritable: true, isSigner: false }
    ];
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.removeTransactionInstruction = removeTransactionInstruction;
function insertTransactionInstruction(programId, programVersion, governanceKey, proposalKey, tokenOwnerRecordKey, governanceAuthorityKey, payerKey, transactionInstructions, index, optionIndex, holdUpTime) {
    const args = new models_1.InsertTransactionArgs({
        index,
        optionIndex,
        holdUpTime,
        instructionData: programVersion === registry_1.PROGRAM_VERSION_V1 ? transactionInstructions[0] : undefined,
        instructions: programVersion >= registry_1.PROGRAM_VERSION_V2 ? transactionInstructions : undefined
    });
    const data = Buffer.from((0, borsh_1.serialize)((0, models_1.getGovernanceSchema)(programVersion), args));
    const proposalTransactionAddress = (0, models_1.getProposalTransactionAddress)(programId, programVersion, proposalKey, optionIndex, index);
    const keys = [
        { pubkey: governanceKey, isWritable: false, isSigner: false },
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: tokenOwnerRecordKey, isWritable: false, isSigner: false },
        { pubkey: governanceAuthorityKey, isWritable: false, isSigner: true },
        { pubkey: proposalTransactionAddress, isWritable: true, isSigner: false },
        { pubkey: payerKey, isWritable: true, isSigner: true },
        { pubkey: registry_1.SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false }
    ];
    return new web3_js_1.TransactionInstruction({ programId, keys, data });
}
exports.insertTransactionInstruction = insertTransactionInstruction;
function signOffProposalInstruction(programId, programVersion, realmKey, governanceKey, proposalKey, signatoryKey, signatoryRecordKey, proposalOwnerRecordKey) {
    const args = new models_1.SignOffProposalArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const keys = [];
    if (programVersion > registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: realmKey, isWritable: true, isSigner: false }, { pubkey: governanceKey, isWritable: true, isSigner: false });
    }
    keys.push({ pubkey: proposalKey, isWritable: true, isSigner: false });
    if (programVersion === registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: signatoryRecordKey, isWritable: true, isSigner: false }, { pubkey: signatoryKey, isWritable: false, isSigner: true }, { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
    }
    else {
        keys.push({ pubkey: signatoryKey, isWritable: false, isSigner: true });
        if (proposalOwnerRecordKey) {
            keys.push({ pubkey: proposalOwnerRecordKey, isWritable: false, isSigner: false });
        }
        else {
            keys.push({ pubkey: signatoryRecordKey, isWritable: true, isSigner: false });
        }
    }
    return new web3_js_1.TransactionInstruction({ programId, keys, data });
}
exports.signOffProposalInstruction = signOffProposalInstruction;
function executeTransactionInstruction(programId, programVersion, governanceKey, proposalKey, transactionAddressKey, transactionInstructions) {
    const args = new models_1.ExecuteTransactionArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const nativeTreasury = (0, models_1.getNativeTreasuryAddress)(programId, governanceKey);
    const keys = [
        { pubkey: governanceKey, isWritable: false, isSigner: false },
        { pubkey: proposalKey, isWritable: true, isSigner: false },
        { pubkey: transactionAddressKey, isWritable: true, isSigner: false }
    ];
    if (programVersion === registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false });
    }
    // When an instruction needs to be signed by the Governance PDA or the Native treasury then its isSigner flag has to be reset on AccountMeta
    // because the signature will be required during cpi call invoke_signed() and not when we send ExecuteInstruction
    for (let instruction of transactionInstructions) {
        instruction.accounts = instruction.accounts.map(a => {
            if ((a.pubkey.equals(governanceKey) || a.pubkey.equals(nativeTreasury)) && a.isSigner) {
                return new models_1.AccountMetaData({ pubkey: a.pubkey, isWritable: a.isWritable, isSigner: false });
            }
            return a;
        });
        keys.push({
            pubkey: instruction.programId,
            isWritable: false,
            isSigner: false
        }, ...instruction.accounts);
    }
    return new web3_js_1.TransactionInstruction({ programId, keys, data });
}
exports.executeTransactionInstruction = executeTransactionInstruction;
