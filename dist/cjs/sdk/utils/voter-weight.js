"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVoterWeightProgramAccount = void 0;
const bs58_1 = __importDefault(require("bs58"));
const addins_1 = require("../addins");
function getVoterWeightProgramAccount(c, realm, programId, walletPublicKey) {
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
            filters: [{ memcmp: { offset: 0, bytes: bs58_1.default.encode(voterWeightBytes) } }]
        });
        const [maxVoterWeight] = yield c.getProgramAccounts(programId, {
            encoding: 'base64',
            filters: [{ memcmp: { offset: 0, bytes: bs58_1.default.encode(maxVoterWeightBytes) } }]
        });
        try {
            return {
                voterWeight: voterWeight
                    ? (0, addins_1.governanceAddinAccountParser)(addins_1.VoterWeightRecord)(voterWeight.pubkey, voterWeight.account)
                    : undefined,
                maxVoterWeight: maxVoterWeight
                    ? (0, addins_1.governanceAddinAccountParser)(addins_1.MaxVoterWeightRecord)(maxVoterWeight.pubkey, maxVoterWeight.account)
                    : undefined
            };
        }
        catch (e) {
            console.log(e);
        }
        return {};
    });
}
exports.getVoterWeightProgramAccount = getVoterWeightProgramAccount;
