"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVoterWeightRecordByVestingAddinInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const buffer_1 = require("buffer");
const borsh_1 = require("borsh");
const registry_1 = require("../../registry");
const models_1 = require("../models");
function createVoterWeightRecordByVestingAddinInstruction(params) {
    const { vestingProgramKey: programId, realmKey, governingTokenMintKey, walletKey, payerKey, voterWeightRecordKey } = params;
    const args = new models_1.CreateVoterWeightRecordVestingArgs();
    const data = buffer_1.Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const keys = [
        { pubkey: registry_1.SYSTEM_PROGRAM_ID, isWritable: false, isSigner: false },
        { pubkey: walletKey, isWritable: false, isSigner: false },
        { pubkey: payerKey, isWritable: false, isSigner: true },
        { pubkey: realmKey, isWritable: false, isSigner: false },
        { pubkey: governingTokenMintKey, isWritable: false, isSigner: false },
        { pubkey: voterWeightRecordKey, isWritable: true, isSigner: false }
    ];
    return new web3_js_1.TransactionInstruction({ programId, keys, data });
}
exports.createVoterWeightRecordByVestingAddinInstruction = createVoterWeightRecordByVestingAddinInstruction;
