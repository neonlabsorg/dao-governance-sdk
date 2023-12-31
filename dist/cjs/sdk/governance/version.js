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
exports.getGovernanceProgramVersion = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js"));
const registry_1 = require("../registry");
const tools_1 = require("../tools");
const models_1 = require("./models");
const instructions_1 = require("./instructions");
function getGovernanceProgramVersion(connection, programId, env) {
    return __awaiter(this, void 0, void 0, function* () {
        // Try get program metadata
        const programMetadataPk = (0, models_1.getProgramMetadataAddress)(programId);
        // If we can't determine the version using the program instance and running localnet then use the latest version
        if (env === 'localnet') {
            return registry_1.PROGRAM_VERSION;
        }
        try {
            const programMetadataInfo = yield connection.getAccountInfo(programMetadataPk);
            // If ProgramMetadata exists then use it to get latest updated version
            if (programMetadataInfo) {
                const programMetadata = (0, models_1.governanceAccountParser)(models_1.ProgramMetadata)(programMetadataPk, programMetadataInfo);
                let deploySlot = tools_1.BN_ZERO;
                try {
                    const programData = yield (0, tools_1.getProgramDataAccount)(connection, new web3_js_1.PublicKey(programId));
                    deploySlot = new bn_js_1.default(programData.slot);
                }
                catch (_a) {
                    // If the program is not upgradable for example on localnet then there is no ProgramData account
                    // and Metadata must be more recent
                }
                // Check if ProgramMetadata is not stale
                if (programMetadata.account.updatedAt.gte(deploySlot)) {
                    const version = (0, tools_1.parseVersion)(programMetadata.account.version);
                    console.log('Program version (metadata)', version);
                    return version.major;
                }
            }
        }
        catch (_b) {
            // nop, let's try simulation
        }
        try {
            // If we don't have the programMetadata info then simulate UpdateProgramMetadata
            // The wallet can be any existing account for the simulation
            // Note: when running a local validator ensure the account is copied from devnet: --clone ENmcpFCpxN1CqyUjuog9yyUVfdXBKF3LVCwLr7grJZpk -ud
            const walletPk = new web3_js_1.PublicKey('ENmcpFCpxN1CqyUjuog9yyUVfdXBKF3LVCwLr7grJZpk');
            const transaction = new web3_js_1.Transaction({ feePayer: walletPk });
            transaction.add((0, instructions_1.updateProgramMetadataInstruction)(programId, walletPk));
            // TODO: Once return values are supported change the simulation call to the actual one
            const getVersion = yield (0, tools_1.simulateTransaction)(connection, transaction, 'recent');
            if (getVersion.value.logs) {
                const prefix = 'PROGRAM-VERSION:"';
                const simVersion = getVersion.value.logs
                    .filter(l => l.includes(prefix))
                    .map(l => {
                    const versionStart = l.indexOf(prefix);
                    return (0, tools_1.parseVersion)(l.substring(versionStart + prefix.length, l.length - 1));
                })[0];
                console.debug('Program version (simulation)', simVersion);
                return simVersion.major;
            }
        }
        catch (ex) {
            console.log('Can\'t determine program version', ex);
        }
        // Default to V1 because it's not possible to detect its version
        return registry_1.PROGRAM_VERSION_V1;
    });
}
exports.getGovernanceProgramVersion = getGovernanceProgramVersion;
