import { getBorshProgramAccounts, pubkeyFilter } from '../core';
import { ChatMessage } from './accounts';
import { GOVERNANCE_CHAT_SCHEMA } from './serialisation';
export function getGovernanceChatMessages(connection, chatProgramId, proposal) {
    return getBorshProgramAccounts(connection, chatProgramId, _ => GOVERNANCE_CHAT_SCHEMA, ChatMessage, [pubkeyFilter(1, proposal)]);
}
export function getGovernanceChatMessagesByVoter(connection, chatProgramId, voter) {
    return getBorshProgramAccounts(connection, chatProgramId, _ => GOVERNANCE_CHAT_SCHEMA, ChatMessage, [pubkeyFilter(33, voter)]);
}
//# sourceMappingURL=api.js.map