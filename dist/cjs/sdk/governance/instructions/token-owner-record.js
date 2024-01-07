"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenOwnerRecordInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const models_1 = require("../models");
const registry_1 = require("../../registry");
function createTokenOwnerRecordInstruction(programId, realmKey, governingTokenOwnerKey, governingTokenMintKey, tokenOwnerRecordKey, payerKey) {
    const args = new models_1.CreateTokenOwnerRecordArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const keys = [
        { pubkey: realmKey, isWritable: false, isSigner: false },
        { pubkey: governingTokenOwnerKey, isWritable: false, isSigner: false },
        { pubkey: tokenOwnerRecordKey, isWritable: true, isSigner: false },
        { pubkey: governingTokenMintKey, isWritable: false, isSigner: false },
        { pubkey: payerKey, isWritable: true, isSigner: true },
        { pubkey: registry_1.SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false }
    ];
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.createTokenOwnerRecordInstruction = createTokenOwnerRecordInstruction;
