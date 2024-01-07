"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxVoterWeightRecordAddress = exports.getVoterWeightRecordAddress = exports.MaxVoterWeightRecord = exports.VoterWeightRecord = exports.VoterWeightAction = void 0;
const web3_js_1 = require("@solana/web3.js");
var VoterWeightAction;
(function (VoterWeightAction) {
    VoterWeightAction[VoterWeightAction["CastVote"] = 0] = "CastVote";
    VoterWeightAction[VoterWeightAction["CommentProposal"] = 1] = "CommentProposal";
    VoterWeightAction[VoterWeightAction["CreateGovernance"] = 2] = "CreateGovernance";
    VoterWeightAction[VoterWeightAction["CreateProposal"] = 3] = "CreateProposal";
    VoterWeightAction[VoterWeightAction["SignOffProposal"] = 4] = "SignOffProposal";
})(VoterWeightAction || (exports.VoterWeightAction = VoterWeightAction = {}));
class VoterWeightRecord {
    constructor(args) {
        this.accountDiscriminator = new Uint8Array([50, 101, 102, 57, 57, 98, 52, 98]);
        this.realm = args.realm;
        this.governingTokenMint = args.governingTokenMint;
        this.governingTokenOwner = args.governingTokenOwner;
        this.voterWeight = args.voterWeight;
        this.voterWeightExpiry = args.voterWeightExpiry;
        this.weightAction = args.weightAction;
        this.weightActionTarget = args.weightActionTarget;
    }
}
exports.VoterWeightRecord = VoterWeightRecord;
class MaxVoterWeightRecord {
    constructor(args) {
        this.accountDiscriminator = new Uint8Array([57, 100, 53, 102, 102, 50, 57, 55]);
        this.realm = args.realm;
        this.governingTokenMint = args.governingTokenMint;
        this.maxVoterWeight = args.maxVoterWeight;
        this.maxVoterWeightExpiry = args.maxVoterWeightExpiry;
    }
}
exports.MaxVoterWeightRecord = MaxVoterWeightRecord;
/**
 * Returns the default address for VoterWeightRecord
 * Note: individual addins are not required to use the default address and it can vary between different implementations
 **/
function getVoterWeightRecordAddress(programId, realm, governingTokenMint, governingTokenOwner) {
    const seeds = [Buffer.from('voter-weight-record'), realm.toBuffer(), governingTokenMint.toBuffer(), governingTokenOwner.toBuffer()];
    const [voterWeightRecordAddress] = web3_js_1.PublicKey.findProgramAddressSync(seeds, programId);
    return voterWeightRecordAddress;
}
exports.getVoterWeightRecordAddress = getVoterWeightRecordAddress;
/**
 * Returns the default address for MaxVoterWeightRecord
 * Note: individual addins are not required to use the default address and it can vary between different implementations
 **/
function getMaxVoterWeightRecordAddress(programId, realm, governingTokenMint) {
    const seeds = [Buffer.from('max-voter-weight-record'), realm.toBuffer(), governingTokenMint.toBuffer()];
    const [maxVoterWeightRecordAddress] = web3_js_1.PublicKey.findProgramAddressSync(seeds, programId);
    return maxVoterWeightRecordAddress;
}
exports.getMaxVoterWeightRecordAddress = getMaxVoterWeightRecordAddress;
