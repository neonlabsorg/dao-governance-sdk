import { Connection, PublicKey } from '@solana/web3.js';
import { Schema } from 'borsh';
import bs58 from 'bs58';
import { deserializeBorsh, getErrorMessage } from '../tools';
import { ProgramAccount, ProgramAccountWithType } from '../models';

export class MemcmpFilter {
  offset: number;
  bytes: Buffer;

  constructor(offset: number, bytes: Buffer) {
    this.offset = offset;
    this.bytes = bytes;
  }

  isMatch(buffer: Buffer) {
    if (this.offset + this.bytes.length > buffer.length) {
      return false;
    }

    for (let i = 0; i < this.bytes.length; i++) {
      if (this.bytes[i] !== buffer[this.offset + i]) return false;
    }

    return true;
  }
}

export const pubkeyFilter = (offset: number, pubkey: PublicKey) => new MemcmpFilter(offset, pubkey.toBuffer());
export const booleanFilter = (offset: number, value: boolean) => new MemcmpFilter(offset, Buffer.from(value ? [1] : [0]));

export async function getBorshProgramAccounts<TAccount extends ProgramAccountWithType>(
  connection: Connection,
  programId: PublicKey,
  getSchema: (accountType: number) => Schema,
  accountFactory: new (args: any) => TAccount,
  filters: MemcmpFilter[] = [],
  accountType?: number
) {
  accountType = accountType ?? new accountFactory({}).accountType;
  const programAccounts = await connection.getProgramAccounts(programId, {
    commitment: connection.commitment,
    filters: [
      { memcmp: { offset: 0, bytes: bs58.encode([accountType]) } },
      ...filters.map(f => ({ memcmp: { offset: f.offset, bytes: bs58.encode(f.bytes) } }))
    ]
  });

  const accounts: ProgramAccount<TAccount>[] = [];

  for (let rawAccount of programAccounts) {
    try {
      const data = rawAccount.account.data;
      const accountType = data[0];

      const account: ProgramAccount<TAccount> = {
        pubkey: new PublicKey(rawAccount.pubkey),
        account: deserializeBorsh(getSchema(accountType), accountFactory, data),
        owner: rawAccount.account.owner
      };

      accounts.push(account);
    } catch (ex) {
      console.info(`Can't deserialize ${accountFactory.name} @ ${rawAccount.pubkey}.`, getErrorMessage(ex));
    }
  }

  return accounts;
}
