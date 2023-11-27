import { Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';
/**
 * Instructions to create and initialise vesting spl-token account
 * ref:https://github.com/neonlabsorg/neon-spl-governance/blob/f13d7e7c1507819306797688ce0bb1f6950a5038/addin-vesting/cli/src/main.rs#L58-L82
 */
export declare function createVestingAccountInstructions(vestingProgramId: PublicKey, governingTokenMint: PublicKey, payer: PublicKey, amount: number): [PublicKey, Keypair, TransactionInstruction[]];
