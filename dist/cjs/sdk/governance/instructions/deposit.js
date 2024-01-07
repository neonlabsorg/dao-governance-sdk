"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositGoverningTokensInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const borsh_1 = require("borsh");
const models_1 = require("../models");
const tools_1 = require("../../tools");
const registry_1 = require("../../registry");
function depositGoverningTokensInstruction(programId, programVersion, realmKey, governingTokenSource, governingTokenMint, governingTokenOwner, payerKey, amount, vestingProgramId, voterWeightRecord, maxVoterWeightRecord, vestingTokenPubkey, vestingPubkey) {
    let data;
    if (!vestingProgramId) {
        // obsolete governance workflow
        data = Buffer.from((0, borsh_1.serialize)((0, models_1.getGovernanceSchema)(programVersion), new models_1.DepositGoverningTokensArgs({ amount })));
        const tokenOwnerRecordAddress = (0, models_1.getTokenOwnerRecordAddress)(programId, realmKey, governingTokenMint, governingTokenOwner);
        const [governingTokenHoldingAddress] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from(models_1.GOVERNANCE_PROGRAM_SEED), realmKey.toBuffer(), governingTokenMint.toBuffer()], programId);
        vestingTokenPubkey = tokenOwnerRecordAddress;
        vestingPubkey = governingTokenHoldingAddress;
    }
    else {
        // generate correct deposit payload
        const obj = new models_1.DepositGoverningTokensMultiArgs([{ amount, release_time: 0 }]);
        data = Buffer.from((0, borsh_1.serialize)((0, models_1.getGovernanceSchema)(programVersion), obj));
    }
    // According to schema https://github.com/neonlabsorg/neon-spl-governance/blob/main/addin-vesting/program/src/instruction.rs#L21-L44
    const keys = [
        (0, tools_1.shortMeta)(registry_1.SYSTEM_PROGRAM_ID), // 0. `[]` The system program account
        (0, tools_1.shortMeta)(spl_token_1.TOKEN_PROGRAM_ID), // 1. `[]` The spl-token program account
        (0, tools_1.shortMeta)(vestingPubkey, true), // 2. `[writable]` The vesting account. PDA seeds: [vesting spl-token account]
        (0, tools_1.shortMeta)(vestingTokenPubkey, true, true), // 3. `[writable]` The vesting spl-token account    // + signer, it's new account
        (0, tools_1.shortMeta)(governingTokenOwner, true, true), // 4. `[signer]` The source spl-token account owner    // + writable
        (0, tools_1.shortMeta)(governingTokenSource, true), // 5. `[writable]` The source spl-token account
        (0, tools_1.shortMeta)(governingTokenOwner), // 6. `[]` The Vesting Owner account    // 💛 = 4
        (0, tools_1.shortMeta)(payerKey, true, true), // 7. `[signer]` Payer    // 💛 = 4    // + writable
        (0, tools_1.shortMeta)(realmKey), // 9. `[]` The Realm account
        (0, tools_1.shortMeta)(voterWeightRecord, true), // 10. `[writable]` The VoterWeightRecord. PDA seeds: ['voter_weight', realm, token_mint, token_owner]
        (0, tools_1.shortMeta)(maxVoterWeightRecord, true) // 11. `[writable]` The MaxVoterWeightRecord. PDA seeds: ['max_voter_weight', realm, token_mint]
    ];
    if (programVersion === registry_1.PROGRAM_VERSION_V1) {
        keys.push({ pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false });
    }
    return new web3_js_1.TransactionInstruction({ programId: vestingProgramId, keys, data });
}
exports.depositGoverningTokensInstruction = depositGoverningTokensInstruction;
