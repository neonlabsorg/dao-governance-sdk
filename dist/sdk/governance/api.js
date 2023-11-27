import { getBorshProgramAccounts, pubkeyFilter } from '../core';
import { getAccountTypes, getGovernanceSchemaForAccount, getRealmConfigAddress, getTokenOwnerRecordAddress, Governance, governanceAccountParser, Proposal, Realm, RealmConfigAccount, TokenOwnerRecord, VoteRecord } from './models';
// Realms
export async function getRealm(connection, realm) {
    return getGovernanceAccount(connection, realm, Realm);
}
export async function getRealms(connection, programId) {
    return getGovernanceAccounts(connection, programId, Realm);
}
// Realm config
export async function tryGetRealmConfig(connection, programId, realmPk) {
    const realmConfigPk = getRealmConfigAddress(programId, realmPk);
    return getGovernanceAccount(connection, realmConfigPk, RealmConfigAccount);
}
// VoteRecords
export async function getVoteRecordsByVoter(connection, programId, voter) {
    return getGovernanceAccounts(connection, programId, VoteRecord, [pubkeyFilter(33, voter)]);
}
// TokenOwnerRecords
export async function getTokenOwnerRecordForRealm(connection, programId, realm, governingTokenMint, governingTokenOwner) {
    const tokenOwnerRecordPk = getTokenOwnerRecordAddress(programId, realm, governingTokenMint, governingTokenOwner);
    return getGovernanceAccount(connection, tokenOwnerRecordPk, TokenOwnerRecord);
}
export async function getTokenOwnerRecord(connection, tokenOwnerRecordPk) {
    return getGovernanceAccount(connection, tokenOwnerRecordPk, TokenOwnerRecord);
}
/**
 * Returns TokenOwnerRecords for the given token owner (voter)
 * Note: The function returns TokenOwnerRecords for both council and community token holders
 *
 * @param connection
 * @param programId
 * @param governingTokenOwner
 * @returns
 */
export async function getTokenOwnerRecordsByOwner(connection, programId, governingTokenOwner) {
    return getGovernanceAccounts(connection, programId, TokenOwnerRecord, [pubkeyFilter(1 + 32 + 32, governingTokenOwner)]);
}
/**
 * Returns all TokenOwnerRecords for all members for the given Realm
 * Note: The function returns TokenOwnerRecords for both council and community token holders
 *
 * @param connection
 * @param programId
 * @param realmPk
 * @returns
 */
export async function getAllTokenOwnerRecords(connection, programId, realmPk) {
    return getGovernanceAccounts(connection, programId, TokenOwnerRecord, [pubkeyFilter(1, realmPk)]);
}
// Governances
export async function getGovernance(connection, governance) {
    return getGovernanceAccount(connection, governance, Governance);
}
/**
 * Returns all governances for the given program instance and realm
 *
 * @param connection
 * @param programId
 * @param realmPk
 * @returns
 */
export async function getAllGovernances(connection, programId, realmPk) {
    return getGovernanceAccounts(connection, programId, Governance, [pubkeyFilter(1, realmPk)]);
}
// Proposal
export async function getProposal(connection, proposal) {
    return getGovernanceAccount(connection, proposal, Proposal);
}
/**
 * Returns all Proposals for the given Governance
 *
 * @param connection
 * @param programId
 * @param governancePk
 * @returns
 */
export async function getProposalsByGovernance(connection, programId, governancePk) {
    return getGovernanceAccounts(connection, programId, Proposal, [pubkeyFilter(1, governancePk)]);
}
/**
 * Returns all Proposals for the given Realm
 *
 * @param connection
 * @param programId
 * @param realmPk
 * @returns
 */
export async function getAllProposals(connection, programId, realmPk) {
    return getAllGovernances(connection, programId, realmPk).then(gs => Promise.all(gs.map(g => getProposalsByGovernance(connection, programId, g.pubkey))));
}
// Generic API
export async function getGovernanceAccounts(connection, programId, AClass, filters = []) {
    const types = getAccountTypes(AClass);
    const result = [];
    for (const type of types) {
        let accounts = await getBorshProgramAccounts(connection, programId, at => getGovernanceSchemaForAccount(at), AClass, filters, type);
        result.push(...accounts);
    }
    return result;
}
export async function getGovernanceAccount(connection, accountPk, accountClass) {
    const accountInfo = await connection.getAccountInfo(accountPk);
    if (!accountInfo) {
        throw { code: 404, message: `Account ${accountPk} of type ${accountClass.name} not found` };
    }
    return governanceAccountParser(accountClass)(accountPk, accountInfo);
}
//# sourceMappingURL=api.js.map