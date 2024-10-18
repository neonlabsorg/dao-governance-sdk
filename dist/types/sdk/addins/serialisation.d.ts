/// <reference types="node" />
import { GovernanceAddinAccountClass } from './accounts';
export declare const GOVERNANCE_ADDINS_SCHEMA: Map<any, any>;
export declare function governanceAddinAccountParser(classType: GovernanceAddinAccountClass): (pubKey: import("@solana/web3.js").PublicKey, info: import("@solana/web3.js").AccountInfo<Buffer>) => import("..").ProgramAccount<any>;
