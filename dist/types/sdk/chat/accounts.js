import { PublicKey } from '@solana/web3.js';
export const GOVERNANCE_CHAT_PROGRAM_ID = new PublicKey('gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET');
export var GovernanceChatAccountType;
(function (GovernanceChatAccountType) {
    GovernanceChatAccountType[GovernanceChatAccountType["Uninitialized"] = 0] = "Uninitialized";
    GovernanceChatAccountType[GovernanceChatAccountType["ChatMessage"] = 1] = "ChatMessage";
})(GovernanceChatAccountType || (GovernanceChatAccountType = {}));
export var ChatMessageBodyType;
(function (ChatMessageBodyType) {
    ChatMessageBodyType[ChatMessageBodyType["Text"] = 0] = "Text";
    ChatMessageBodyType[ChatMessageBodyType["Reaction"] = 1] = "Reaction";
})(ChatMessageBodyType || (ChatMessageBodyType = {}));
export class ChatMessageBody {
    constructor(args) {
        var _a;
        this.type = args.type;
        this.value = args.value;
        this.isReply = (_a = args.isReply) !== null && _a !== void 0 ? _a : false;
    }
}
export class ChatMessage {
    constructor(args) {
        this.accountType = GovernanceChatAccountType.ChatMessage;
        this.proposal = args.proposal;
        this.author = args.author;
        this.postedAt = args.postedAt;
        this.replyTo = args.replyTo;
        this.body = args.body;
    }
}
