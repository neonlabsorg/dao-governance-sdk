import { Keypair, TransactionInstruction } from '@solana/web3.js';
import { GOVERNANCE_CHAT_SCHEMA } from './serialisation';
import { serialize } from 'borsh';
import { PostChatMessageArgs } from './instructions';
import { realmConfigKeys } from '../governance';
import { SYSTEM_PROGRAM_ID } from '../registry';
export function chatMessage(signers, chatProgramId, governanceProgramId, realm, governance, proposal, tokenOwnerRecord, governanceAuthority, payer, replyTo, body, voterWeightRecord) {
    const args = new PostChatMessageArgs({ body });
    const data = Buffer.from(serialize(GOVERNANCE_CHAT_SCHEMA, args));
    const chatMessage = new Keypair();
    signers.push(chatMessage);
    let keys = [
        { pubkey: governanceProgramId, isWritable: false, isSigner: false },
        { pubkey: realm, isWritable: false, isSigner: false },
        { pubkey: governance, isWritable: false, isSigner: false },
        { pubkey: proposal, isWritable: false, isSigner: false },
        { pubkey: tokenOwnerRecord, isWritable: false, isSigner: false },
        { pubkey: governanceAuthority, isWritable: false, isSigner: true },
        { pubkey: chatMessage.publicKey, isWritable: true, isSigner: true },
        { pubkey: payer, isWritable: false, isSigner: true },
        { pubkey: SYSTEM_PROGRAM_ID, isWritable: false, isSigner: false }
    ];
    if (replyTo) {
        keys.push({ pubkey: replyTo, isWritable: false, isSigner: false });
    }
    keys.push(...realmConfigKeys(governanceProgramId, realm, voterWeightRecord));
    const instruction = new TransactionInstruction({ keys, programId: chatProgramId, data });
    return [chatMessage, instruction];
}
//# sourceMappingURL=chat-message.js.map