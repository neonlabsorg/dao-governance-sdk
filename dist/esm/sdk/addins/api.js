var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MaxVoterWeightRecord, VoterWeightRecord } from './accounts';
import { governanceAddinAccountParser } from './serialisation';
export function getMaxVoterWeightRecord(connection, maxVoterWeightRecordPk) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAddinAccount(connection, maxVoterWeightRecordPk, MaxVoterWeightRecord);
    });
}
export function getVoterWeightRecord(connection, voterWeightRecordPk) {
    return __awaiter(this, void 0, void 0, function* () {
        return getGovernanceAddinAccount(connection, voterWeightRecordPk, VoterWeightRecord);
    });
}
export function getGovernanceAddinAccount(connection, accountPk, accountClass) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountInfo = yield connection.getAccountInfo(accountPk);
        if (!accountInfo) {
            throw new Error(`Account ${accountPk} of type ${accountClass.name} not found`);
        }
        return governanceAddinAccountParser(accountClass)(accountPk, accountInfo);
    });
}
