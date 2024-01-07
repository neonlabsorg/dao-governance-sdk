"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVestingAccountInstructions = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
/**
 * Instructions to create and initialise vesting spl-token account
 * ref:https://github.com/neonlabsorg/neon-spl-governance/blob/f13d7e7c1507819306797688ce0bb1f6950a5038/addin-vesting/cli/src/main.rs#L58-L82
 */
function createVestingAccountInstructions(vestingProgramId, governingTokenMint, publicKey, lamports) {
    const vestingTokenKeypair = web3_js_1.Keypair.generate();
    const vestingTokenPubkey = vestingTokenKeypair.publicKey;
    const [vestingAccount] = web3_js_1.PublicKey.findProgramAddressSync([vestingTokenPubkey.toBuffer()], vestingProgramId);
    const instructions = [];
    instructions.push(web3_js_1.SystemProgram.createAccount({
        lamports,
        fromPubkey: publicKey,
        newAccountPubkey: vestingTokenPubkey,
        space: spl_token_1.AccountLayout.span,
        programId: spl_token_1.TOKEN_PROGRAM_ID
    }));
    instructions.push((0, spl_token_1.createInitializeAccountInstruction)(vestingTokenPubkey, governingTokenMint, vestingAccount, spl_token_1.TOKEN_PROGRAM_ID));
    return [vestingAccount, vestingTokenKeypair, instructions];
}
exports.createVestingAccountInstructions = createVestingAccountInstructions;
