"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatAccountParser = exports.GOVERNANCE_CHAT_SCHEMA = void 0;
const accounts_1 = require("./accounts");
const core_1 = require("../core");
const instructions_1 = require("./instructions");
exports.GOVERNANCE_CHAT_SCHEMA = new Map([
    [
        accounts_1.ChatMessageBody,
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
        accounts_1.ChatMessage,
        {
            kind: 'struct',
            fields: [
                ['accountType', 'u8'],
                ['proposal', 'pubkey'],
                ['author', 'pubkey'],
                ['postedAt', 'u64'],
                ['replyTo', { kind: 'option', type: 'pubkey' }],
                ['body', accounts_1.ChatMessageBody]
            ]
        }
    ],
    [
        instructions_1.PostChatMessageArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['body', accounts_1.ChatMessageBody]
            ]
        }
    ]
]);
const chatAccountParser = (classType) => {
    return (0, core_1.borshAccountParser)(classType, _ => exports.GOVERNANCE_CHAT_SCHEMA);
};
exports.chatAccountParser = chatAccountParser;
