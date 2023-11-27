import { Connection, PublicKey } from '@solana/web3.js';
import { Infer } from 'superstruct';
export declare const BPF_UPGRADE_LOADER_ID: PublicKey;
export declare const PublicKeyFromString: import("superstruct").Struct<PublicKey, null>;
export type ProgramDataAccountInfo = Infer<typeof ProgramDataAccountInfo>;
export declare const ProgramDataAccountInfo: import("superstruct").Struct<{
    slot: number;
    authority: PublicKey | null;
}, {
    authority: import("superstruct").Struct<PublicKey | null, null>;
    slot: import("superstruct").Struct<number, null>;
}>;
export declare function getProgramDataAddress(programId: PublicKey): PublicKey;
export declare function getProgramDataAccount(connection: Connection, programId: PublicKey): Promise<{
    slot: number;
    authority: PublicKey | null;
}>;
