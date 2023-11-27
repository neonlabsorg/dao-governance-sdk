import { Keypair, PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import {
  AccountLayout,
  createInitializeAccountInstruction,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

/**
 * Instructions to create and initialise vesting spl-token account
 * ref:https://github.com/neonlabsorg/neon-spl-governance/blob/f13d7e7c1507819306797688ce0bb1f6950a5038/addin-vesting/cli/src/main.rs#L58-L82
 */
export function createVestingAccountInstructions(vestingProgramId: PublicKey, governingTokenMint: PublicKey, publicKey: PublicKey, lamports: number): [PublicKey, Keypair, TransactionInstruction[]] {
  const vestingTokenKeypair = Keypair.generate();
  const vestingTokenPubkey = vestingTokenKeypair.publicKey;
  const [vestingAccount] = PublicKey.findProgramAddressSync([vestingTokenPubkey.toBuffer()], vestingProgramId);
  const instructions: TransactionInstruction[] = [];

  instructions.push(SystemProgram.createAccount({
    lamports,
    fromPubkey: publicKey,
    newAccountPubkey: vestingTokenPubkey,
    space: AccountLayout.span,
    programId: TOKEN_PROGRAM_ID
  }));

  instructions.push(createInitializeAccountInstruction(vestingTokenPubkey, governingTokenMint, vestingAccount, TOKEN_PROGRAM_ID));

  return [vestingAccount, vestingTokenKeypair, instructions];
}
