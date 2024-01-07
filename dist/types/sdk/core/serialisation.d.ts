/// <reference types="node" />
import { AccountInfo, PublicKey } from '@solana/web3.js';
import { Schema } from 'borsh';
import { ProgramAccount } from '../models';
export declare function borshAccountParser(classFactory: any, getSchema: (accountType: number) => Schema): (pubKey: PublicKey, info: AccountInfo<Buffer>) => ProgramAccount<any>;
