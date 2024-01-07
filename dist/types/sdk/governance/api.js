var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBorshProgramAccounts, pubkeyFilter } from '../core';
import { getAccountTypes, getGovernanceSchemaForAccount, getRealmConfigAddress, getTokenOwnerRecordAddress, Governance, governanceAccountParser, Proposal, Realm, RealmConfigAccount, TokenOwnerRecord, VoteRecord } from './models';
// Realms
export function getRealm(connection, realm) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccount(connection, realm, Realm);
    });
}
export function getRealms(connection, programId) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccounts(connection, programId, Realm);
    });
}
// Realm config
export function tryGetRealmConfig(connection, programId, realmPk) {
    return __awaiter(this, void 0, void 0, function* () {
        const realmConfigPk = getRealmConfigAddress(programId, realmPk);
        return getGovernanceAccount(connection, realmConfigPk, RealmConfigAccount);
    });
}
// VoteRecords
export function getVoteRecordsByVoter(connection, programId, voter) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccounts(connection, programId, VoteRecord, [pubkeyFilter(33, voter)]);
    });
}
// TokenOwnerRecords
export function getTokenOwnerRecordForRealm(connection, programId, realm, governingTokenMint, governingTokenOwner) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenOwnerRecordPk = getTokenOwnerRecordAddress(programId, realm, governingTokenMint, governingTokenOwner);
        return getGovernanceAccount(connection, tokenOwnerRecordPk, TokenOwnerRecord);
    });
}
export function getTokenOwnerRecord(connection, tokenOwnerRecordPk) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccount(connection, tokenOwnerRecordPk, TokenOwnerRecord);
    });
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
export function getTokenOwnerRecordsByOwner(connection, programId, governingTokenOwner) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccounts(connection, programId, TokenOwnerRecord, [pubkeyFilter(1 + 32 + 32, governingTokenOwner)]);
    });
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
export function getAllTokenOwnerRecords(connection, programId, realmPk) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccounts(connection, programId, TokenOwnerRecord, [pubkeyFilter(1, realmPk)]);
    });
}
// Governances
export function getGovernance(connection, governance) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccount(connection, governance, Governance);
    });
}
/**
 * Returns all governances for the given program instance and realm
 *
 * @param connection
 * @param programId
 * @param realmPk
 * @returns
 */
export function getAllGovernances(connection, programId, realmPk) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccounts(connection, programId, Governance, [pubkeyFilter(1, realmPk)]);
    });
}
// Proposal
export function getProposal(connection, proposal) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccount(connection, proposal, Proposal);
    });
}
/**
 * Returns all Proposals for the given Governance
 *
 * @param connection
 * @param programId
 * @param governancePk
 * @returns
 */
export function getProposalsByGovernance(connection, programId, governancePk) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAccounts(connection, programId, Proposal, [pubkeyFilter(1, governancePk)]);
    });
}
/**
 * Returns all Proposals for the given Realm
 *
 * @param connection
 * @param programId
 * @param realmPk
 * @returns
 */
export function getAllProposals(connection, programId, realmPk) {
    return __awaiter(this, void 0, void 0, function* () {
        return getAllGovernances(connection, programId, realmPk).then(gs => Promise.all(gs.map(g => getProposalsByGovernance(connection, programId, g.pubkey))));
    });
}
// Generic API
export function getGovernanceAccounts(connection, programId, AClass, filters = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const types = getAccountTypes(AClass);
        const result = [];
        for (const type of types) {
            let accounts = yield getBorshProgramAccounts(connection, programId, at => getGovernanceSchemaForAccount(at), AClass, filters, type);
            result.push(...accounts);
        }
        return result;
    });
}
export function getGovernanceAccount(connection, accountPk, accountClass) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountInfo = yield connection.getAccountInfo(accountPk);
        if (!accountInfo) {
            throw { code: 404, message: `Account ${accountPk} of type ${accountClass.name} not found` };
        }
        return governanceAccountParser(accountClass)(accountPk, accountInfo);
    });
}
