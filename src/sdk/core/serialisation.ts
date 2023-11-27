import { AccountInfo, PublicKey } from '@solana/web3.js';
import { Schema } from 'borsh';
import { deserializeBorsh } from '../tools';
import { ProgramAccount } from '../models';

export function borshAccountParser(classFactory: any, getSchema: (accountType: number) => Schema): (pubKey: PublicKey, info: AccountInfo<Buffer>) => ProgramAccount<any> {
  return (pubkey: PublicKey, info: AccountInfo<Buffer>) => {
    const buffer = Buffer.from(info.data);
    const account = deserializeBorsh(getSchema(info.data[0]), classFactory, buffer);
    return { pubkey, owner: info.owner, account };
  };
}
