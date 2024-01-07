import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
export type GovernanceAddinAccountClass = typeof VoterWeightRecord | typeof MaxVoterWeightRecord;
export declare enum VoterWeightAction {
    CastVote = 0,
    CommentProposal = 1,
    CreateGovernance = 2,
    CreateProposal = 3,
    SignOffProposal = 4
}
export declare class VoterWeightRecord {
    accountDiscriminator: Uint8Array;
    realm: PublicKey;
    governingTokenMint: PublicKey;
    governingTokenOwner: PublicKey;
    voterWeight: BN;
    voterWeightExpiry: BN;
    weightAction?: VoterWeightAction;
    weightActionTarget?: PublicKey;
    constructor(args: {
        realm: PublicKey;
        governingTokenMint: PublicKey;
        governingTokenOwner: PublicKey;
        voterWeight: BN;
        voterWeightExpiry: BN;
        weightAction?: VoterWeightAction;
        weightActionTarget?: PublicKey;
    });
}
export declare class MaxVoterWeightRecord {
    accountDiscriminator: Uint8Array;
    realm: PublicKey;
    governingTokenMint: PublicKey;
    maxVoterWeight: BN;
    maxVoterWeightExpiry: BN;
    constructor(args: {
        realm: PublicKey;
        governingTokenMint: PublicKey;
        maxVoterWeight: BN;
        maxVoterWeightExpiry: BN;
    });
}
/**
 * Returns the default address for VoterWeightRecord
 * Note: individual addins are not required to use the default address and it can vary between different implementations
 **/
export declare function getVoterWeightRecordAddress(programId: PublicKey, realm: PublicKey, governingTokenMint: PublicKey, governingTokenOwner: PublicKey): PublicKey;
/**
 * Returns the default address for MaxVoterWeightRecord
 * Note: individual addins are not required to use the default address and it can vary between different implementations
 **/
export declare function getMaxVoterWeightRecordAddress(programId: PublicKey, realm: PublicKey, governingTokenMint: PublicKey): PublicKey;
