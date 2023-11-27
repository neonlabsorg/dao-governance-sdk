import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { deserializeBorsh, getErrorMessage } from '../tools';
export class MemcmpFilter {
    constructor(offset, bytes) {
        this.offset = offset;
        this.bytes = bytes;
    }
    isMatch(buffer) {
        if (this.offset + this.bytes.length > buffer.length) {
            return false;
        }
        for (let i = 0; i < this.bytes.length; i++) {
            if (this.bytes[i] !== buffer[this.offset + i])
                return false;
        }
        return true;
    }
}
export const pubkeyFilter = (offset, pubkey) => new MemcmpFilter(offset, pubkey.toBuffer());
export const booleanFilter = (offset, value) => new MemcmpFilter(offset, Buffer.from(value ? [1] : [0]));
export async function getBorshProgramAccounts(connection, programId, getSchema, accountFactory, filters = [], accountType) {
    accountType = accountType ?? new accountFactory({}).accountType;
    const programAccounts = await connection.getProgramAccounts(programId, {
        commitment: connection.commitment,
        filters: [
            { memcmp: { offset: 0, bytes: bs58.encode([accountType]) } },
            ...filters.map(f => ({ memcmp: { offset: f.offset, bytes: bs58.encode(f.bytes) } }))
        ]
    });
    const accounts = [];
    for (let rawAccount of programAccounts) {
        try {
            const data = rawAccount.account.data;
            const accountType = data[0];
            const account = {
                pubkey: new PublicKey(rawAccount.pubkey),
                account: deserializeBorsh(getSchema(accountType), accountFactory, data),
                owner: rawAccount.account.owner
            };
            accounts.push(account);
        }
        catch (ex) {
            console.info(`Can't deserialize ${accountFactory.name} @ ${rawAccount.pubkey}.`, getErrorMessage(ex));
        }
    }
    return accounts;
}
//# sourceMappingURL=api.js.map