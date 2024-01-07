"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgramMetadataInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const models_1 = require("../models");
const registry_1 = require("../../registry");
function updateProgramMetadataInstruction(programId, payer) {
    const programMetadataAddress = (0, models_1.getProgramMetadataAddress)(programId);
    const args = new models_1.UpdateProgramMetadataArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const keys = [
        { pubkey: programMetadataAddress, isWritable: true, isSigner: false },
        { pubkey: payer, isWritable: true, isSigner: true },
        { pubkey: registry_1.SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false }
    ];
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.updateProgramMetadataInstruction = updateProgramMetadataInstruction;
