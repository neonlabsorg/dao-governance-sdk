export var GovernanceChatInstruction;
(function (GovernanceChatInstruction) {
    GovernanceChatInstruction[GovernanceChatInstruction["PostMessage"] = 0] = "PostMessage";
})(GovernanceChatInstruction || (GovernanceChatInstruction = {}));
export class PostChatMessageArgs {
    constructor(args) {
        this.instruction = GovernanceChatInstruction.PostMessage;
        this.body = args.body;
    }
}
