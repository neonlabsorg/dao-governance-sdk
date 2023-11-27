import { MaxVoterWeightRecord, VoterWeightRecord } from './accounts';
import { governanceAddinAccountParser } from './serialisation';
export async function getMaxVoterWeightRecord(connection, maxVoterWeightRecordPk) {
    return getGovernanceAddinAccount(connection, maxVoterWeightRecordPk, MaxVoterWeightRecord);
}
export async function getVoterWeightRecord(connection, voterWeightRecordPk) {
    return getGovernanceAddinAccount(connection, voterWeightRecordPk, VoterWeightRecord);
}
export async function getGovernanceAddinAccount(connection, accountPk, accountClass) {
    const accountInfo = await connection.getAccountInfo(accountPk);
    if (!accountInfo) {
        throw new Error(`Account ${accountPk} of type ${accountClass.name} not found`);
    }
    return governanceAddinAccountParser(accountClass)(accountPk, accountInfo);
}
//# sourceMappingURL=api.js.map