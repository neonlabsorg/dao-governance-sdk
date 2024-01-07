var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bs58 from 'bs58';
import { governanceAddinAccountParser, MaxVoterWeightRecord, VoterWeightRecord } from '../addins';
export function getVoterWeightProgramAccount(c, realm, programId, walletPublicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const discriminatorVoterWeightRecord = [46, 249, 155, 75, 153, 248, 116, 9];
        const voterWeightBytes = discriminatorVoterWeightRecord
            .concat(...realm.pubkey.toBytes())
            .concat(...realm.account.communityMint.toBytes())
            .concat(...walletPublicKey.toBytes());
        const discriminatorMaxVoterWeightRecord = [157, 95, 242, 151, 16, 98, 26, 118];
        const maxVoterWeightBytes = discriminatorMaxVoterWeightRecord
            .concat(...realm.pubkey.toBytes())
            .concat(...realm.account.communityMint.toBytes());
        const [voterWeight] = yield c.getProgramAccounts(programId, {
            encoding: 'base64',
            filters: [{ memcmp: { offset: 0, bytes: bs58.encode(voterWeightBytes) } }]
        });
        const [maxVoterWeight] = yield c.getProgramAccounts(programId, {
            encoding: 'base64',
            filters: [{ memcmp: { offset: 0, bytes: bs58.encode(maxVoterWeightBytes) } }]
        });
        try {
            return {
                voterWeight: voterWeight
                    ? governanceAddinAccountParser(VoterWeightRecord)(voterWeight.pubkey, voterWeight.account)
                    : undefined,
                maxVoterWeight: maxVoterWeight
                    ? governanceAddinAccountParser(MaxVoterWeightRecord)(maxVoterWeight.pubkey, maxVoterWeight.account)
                    : undefined
            };
        }
        catch (e) {
            console.log(e);
        }
        return {};
    });
}
