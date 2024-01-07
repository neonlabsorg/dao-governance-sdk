import { ChatMessage, ChatMessageBody } from './accounts';
import { borshAccountParser } from '../core';
import { PostChatMessageArgs } from './instructions';
export const GOVERNANCE_CHAT_SCHEMA = new Map([
    [
        ChatMessageBody,
        {
            kind: 'struct',
            fields: [
                ['type', 'u8'],
                ['value', 'string'],
                ['isReply', 'u8']
            ]
        }
    ],
    [
        ChatMessage,
        {
            kind: 'struct',
            fields: [
                ['accountType', 'u8'],
                ['proposal', 'pubkey'],
                ['author', 'pubkey'],
                ['postedAt', 'u64'],
                ['replyTo', { kind: 'option', type: 'pubkey' }],
                ['body', ChatMessageBody]
            ]
        }
    ],
    [
        PostChatMessageArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['body', ChatMessageBody]
            ]
        }
    ]
]);
export const chatAccountParser = (classType) => {
    return borshAccountParser(classType, _ => GOVERNANCE_CHAT_SCHEMA);
};
