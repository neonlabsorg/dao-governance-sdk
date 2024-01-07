/// <reference types="node" />
import { Connection, PublicKey } from '@solana/web3.js';
import { Schema } from 'borsh';
import { ProgramAccount, ProgramAccountWithType } from '../models';
export declare class MemcmpFilter {
    offset: number;
    bytes: Buffer;
    constructor(offset: number, bytes: Buffer);
    isMatch(buffer: Buffer): boolean;
}
export declare const pubkeyFilter: (offset: number, pubkey: PublicKey) => MemcmpFilter;
export declare const booleanFilter: (offset: number, value: boolean) => MemcmpFilter;
export declare function getBorshProgramAccounts<TAccount extends ProgramAccountWithType>(connection: Connection, programId: PublicKey, getSchema: (accountType: number) => Schema, accountFactory: new (args: any) => TAccount, filters?: MemcmpFilter[], accountType?: number): Promise<ProgramAccount<TAccount>[]>;
