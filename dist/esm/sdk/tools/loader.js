var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Copied from Explorer code https://github.com/solana-labs/solana/blob/master/explorer/src/validators/accounts/upgradeable-program.ts
import { PublicKey } from '@solana/web3.js';
import { coerce, create, instance, nullable, number, string, type } from 'superstruct';
export const BPF_UPGRADE_LOADER_ID = new PublicKey('BPFLoaderUpgradeab1e11111111111111111111111');
export const PublicKeyFromString = coerce(instance(PublicKey), string(), value => new PublicKey(value));
export const ProgramDataAccountInfo = type({
    authority: nullable(PublicKeyFromString),
    // don't care about data yet
    slot: number()
});
export function getProgramDataAddress(programId) {
    const [programDataAddress] = PublicKey.findProgramAddressSync([programId.toBuffer()], BPF_UPGRADE_LOADER_ID);
    return programDataAddress;
}
export function getProgramDataAccount(connection, programId) {
    return __awaiter(this, void 0, void 0, function* () {
        const programDataAddress = getProgramDataAddress(programId);
        const account = yield connection.getParsedAccountInfo(programDataAddress);
        if (!account || !account.value) {
            throw new Error(`Program data account ${programDataAddress.toBase58()} for program ${programId.toBase58()} not found`);
        }
        const accountInfo = account.value;
        if (!('parsed' in accountInfo.data && accountInfo.data.program === 'bpf-upgradeable-loader')) {
            throw new Error(`Invalid program data account ${programDataAddress.toBase58()} for program ${programId.toBase58()}`);
        }
        return create(accountInfo.data.parsed.info, ProgramDataAccountInfo);
    });
}
