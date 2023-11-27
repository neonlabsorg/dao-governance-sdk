import { Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { ChatMessageBody } from './accounts';
export declare function chatMessage(signers: Keypair[], chatProgramId: PublicKey, governanceProgramId: PublicKey, realm: PublicKey, governance: PublicKey, proposal: PublicKey, tokenOwnerRecord: PublicKey, governanceAuthority: PublicKey, payer: PublicKey, replyTo: PublicKey | undefined, body: ChatMessageBody, voterWeightRecord?: PublicKey): [Keypair, TransactionInstruction];
