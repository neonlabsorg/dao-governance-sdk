"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeVestingAccountInstruction = exports.withdrawGoverningTokensInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const spl_token_1 = require("@solana/spl-token");
const models_1 = require("../models");
const tools_1 = require("../../tools");
function withdrawGoverningTokensInstruction(params) {
    const { programKey, realmKey, governingTokenDestinationKey, governingTokenMintKey, vestingTokenOwnerKey, vestingProgramKey, voterWeightRecordKey, maxVoterWeightRecordKey, vestingTokenAddressKey, vestingTokenAccountKey } = params;
    const args = new models_1.WithdrawGoverningTokensArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const seeds = [Buffer.from(models_1.GOVERNANCE_PROGRAM_SEED), realmKey.toBuffer(), governingTokenMintKey.toBuffer(), vestingTokenOwnerKey.toBuffer()];
    const [tokenOwnerRecordAddress] = web3_js_1.PublicKey.findProgramAddressSync(seeds, programKey);
    // According to schema https://github.com/neonlabsorg/neon-spl-governance/blob/main/addin-vesting/program/src/instruction.rs#L47-L62
    const keys = [
        (0, tools_1.shortMeta)(spl_token_1.TOKEN_PROGRAM_ID), // 0. `[]` The spl-token program account
        (0, tools_1.shortMeta)(vestingTokenAccountKey, true), // 1. `[writable]` The vesting account. PDA seeds: [vesting spl-token account]
        (0, tools_1.shortMeta)(vestingTokenAddressKey, true), // 2. `[writable]` The vesting spl-token account
        (0, tools_1.shortMeta)(governingTokenDestinationKey, true), // 3. `[writable]` The destination spl-token account
        (0, tools_1.shortMeta)(vestingTokenOwnerKey, true, true), // 4. `[signer]` The Vesting Owner account + writable
        (0, tools_1.shortMeta)(programKey), // 5. `[]` The Governance program account
        (0, tools_1.shortMeta)(realmKey), // 6. `[]` The Realm account
        (0, tools_1.shortMeta)(tokenOwnerRecordAddress), // 7. `[]` Governing Owner Record. PDA seeds (governance program): ['governance', realm, token_mint, vesting_owner]
        (0, tools_1.shortMeta)(voterWeightRecordKey, true), // 8. `[writable]` The VoterWeightRecord. PDA seeds: ['voter_weight', realm, token_mint, vesting_owner]
        (0, tools_1.shortMeta)(maxVoterWeightRecordKey, true) // 9. `[writable]` The MaxVoterWeightRecord. PDA seeds: ['max_voter_weight', realm, token_mint]
    ];
    const programId = vestingProgramKey || programKey;
    return new web3_js_1.TransactionInstruction({ keys, programId, data });
}
exports.withdrawGoverningTokensInstruction = withdrawGoverningTokensInstruction;
/// Close vesting account
function closeVestingAccountInstruction(params) {
    const { vestingProgramKey, vestingTokenAddressKey, vestingTokenOwnerKey, spillKey } = params;
    const args = new models_1.CloseVestingAccountArgs();
    const data = Buffer.from((0, borsh_1.serialize)(models_1.GOVERNANCE_SCHEMA, args));
    const [vestingAccountKey] = web3_js_1.PublicKey.findProgramAddressSync([vestingTokenAddressKey.toBuffer()], vestingProgramKey);
    const keys = [
        (0, tools_1.shortMeta)(spl_token_1.TOKEN_PROGRAM_ID), // 0. `[]` The spl-token program account
        (0, tools_1.shortMeta)(vestingAccountKey, true), // 1. `[writable]` The Vesting account. PDA seeds: [vesting spl-token account]
        (0, tools_1.shortMeta)(vestingTokenAddressKey, true), // 2. `[writable]` The vesting spl-token account
        (0, tools_1.shortMeta)(vestingTokenOwnerKey, true, true), // 3. `[signer]` The vesting Owner account
        (0, tools_1.shortMeta)(spillKey, true) // 4. `[writable]` Spill account
    ];
    return new web3_js_1.TransactionInstruction({ programId: vestingProgramKey, keys, data });
}
exports.closeVestingAccountInstruction = closeVestingAccountInstruction;
