"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.governanceAddinAccountParser = exports.GOVERNANCE_ADDINS_SCHEMA = void 0;
const accounts_1 = require("./accounts");
const core_1 = require("../core");
exports.GOVERNANCE_ADDINS_SCHEMA = new Map([
    [
        accounts_1.MaxVoterWeightRecord,
        {
            kind: 'struct',
            fields: [
                ['accountDiscriminator', [8]],
                ['realm', 'pubkey'],
                ['governingTokenMint', 'pubkey'],
                ['maxVoterWeight', 'u64'],
                ['maxVoterWeightExpiry', { kind: 'option', type: 'u64' }]
            ]
        }
    ],
    [
        accounts_1.VoterWeightRecord,
        {
            kind: 'struct',
            fields: [
                ['accountDiscriminator', [8]],
                ['realm', 'pubkey'],
                ['governingTokenMint', 'pubkey'],
                ['governingTokenOwner', 'pubkey'],
                ['voterWeight', 'u64'],
                ['voterWeightExpiry', { kind: 'option', type: 'u64' }],
                ['weightAction', { kind: 'option', type: 'u8' }],
                ['weightActionTarget', { kind: 'option', type: 'pubkey' }]
            ]
        }
    ]
]);
function governanceAddinAccountParser(classType) {
    return (0, core_1.borshAccountParser)(classType, _ => exports.GOVERNANCE_ADDINS_SCHEMA);
}
exports.governanceAddinAccountParser = governanceAddinAccountParser;
