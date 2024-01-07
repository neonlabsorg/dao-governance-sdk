"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositTransaction = void 0;
const web3_js_1 = require("@solana/web3.js");
const addins_1 = require("../addins");
const governance_1 = require("../governance");
const registry_1 = require("../registry");
function depositTransaction(realmKey, vestingProgramKey, governingTokenMintKey, payerKey, depositAmount, governingToken, voterWeight, maxVoterWeight, accountRentExempt = 0, programVersion = registry_1.PROGRAM_VERSION) {
    var _a;
    const transaction = new web3_js_1.Transaction();
    const instructions = [];
    const signers = [];
    const voterWeightRecordKey = (0, addins_1.getVoterWeightRecordAddress)(vestingProgramKey, realmKey, governingTokenMintKey, payerKey);
    if (!voterWeight) {
        const instruction = (0, governance_1.createVoterWeightRecordByVestingAddinInstruction)({
            governingTokenMintKey,
            voterWeightRecordKey,
            realmKey,
            walletKey: payerKey,
            payerKey: payerKey,
            vestingProgramKey
        });
        instructions.push(instruction);
    }
    const [vestingAccount, vestingTokenKeypair, vestingInstructions] = (0, governance_1.createVestingAccountInstructions)(vestingProgramKey, governingTokenMintKey, payerKey, accountRentExempt);
    instructions.push(...vestingInstructions);
    signers.push(vestingTokenKeypair);
    instructions.push((0, governance_1.depositGoverningTokensInstruction)(voterWeightRecordKey, programVersion, realmKey, governingToken.pubkey, governingTokenMintKey, payerKey, payerKey, depositAmount, vestingProgramKey, (_a = voterWeight === null || voterWeight === void 0 ? void 0 : voterWeight.pubkey) !== null && _a !== void 0 ? _a : voterWeightRecordKey, maxVoterWeight === null || maxVoterWeight === void 0 ? void 0 : maxVoterWeight.pubkey, vestingTokenKeypair.publicKey, vestingAccount));
    return [signers, transaction];
}
exports.depositTransaction = depositTransaction;
