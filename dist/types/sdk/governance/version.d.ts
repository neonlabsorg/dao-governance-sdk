import { Connection, PublicKey } from '@solana/web3.js';
export declare function getGovernanceProgramVersion(connection: Connection, programId: PublicKey, env?: string): Promise<number>;
