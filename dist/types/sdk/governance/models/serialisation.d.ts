/// <reference types="node" />
import { TransactionInstruction } from '@solana/web3.js';
import { GovernanceAccountClass, GovernanceAccountType, InstructionData } from './accounts';
export declare const serializeInstructionToBase64: (instruction: TransactionInstruction) => string;
export declare const createInstructionData: (instruction: TransactionInstruction) => InstructionData;
export declare const GOVERNANCE_SCHEMA_V1: Map<Function, any>;
export declare const GOVERNANCE_SCHEMA: Map<Function, any>;
export declare function getGovernanceSchema(programVersion: number): Map<Function, any>;
export declare function getGovernanceSchemaForAccount(accountType: GovernanceAccountType): Map<Function, any>;
export declare function governanceAccountParser(classType: GovernanceAccountClass): (pubKey: import("@solana/web3.js").PublicKey, info: import("@solana/web3.js").AccountInfo<Buffer>) => import("../..").ProgramAccount<any>;
export declare class CreateVotePercentage {
    vote_percentage: number;
    constructor(args: {
        vote_percentage: number;
    });
}
export declare const VOTE_PERCENTAGE_SCHEMA: Map<typeof CreateVotePercentage, {
    kind: string;
    fields: string[][];
}>;
export declare const VESTING_RECORD_SCHEMA: Map<Function, any>;
