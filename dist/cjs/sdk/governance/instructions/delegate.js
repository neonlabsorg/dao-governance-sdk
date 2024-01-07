"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.governanceDelegateInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const models_1 = require("../models");
function governanceDelegateInstruction(programId, programVersion, realmKey, governingTokenMint, governingTokenOwner, governanceAuthority, newGovernanceDelegate) {
    const args = new models_1.SetGovernanceDelegateArgs({ newGovernanceDelegate });
    const data = Buffer.from((0, borsh_1.serialize)((0, models_1.getGovernanceSchema)(programVersion), args));
    const tokenOwnerRecordAddress = (0, models_1.getTokenOwnerRecordAddress)(programId, realmKey, governingTokenMint, governingTokenOwner);
    const keys = [
        { pubkey: governanceAuthority, isWritable: false, isSigner: true },
        { pubkey: tokenOwnerRecordAddress, isWritable: true, isSigner: false }
    ];
    return new web3_js_1.TransactionInstruction({ programId, keys, data });
}
exports.governanceDelegateInstruction = governanceDelegateInstruction;
