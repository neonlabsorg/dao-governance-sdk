"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorshProgramAccounts = exports.booleanFilter = exports.pubkeyFilter = exports.MemcmpFilter = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const tools_1 = require("../tools");
class MemcmpFilter {
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
exports.MemcmpFilter = MemcmpFilter;
const pubkeyFilter = (offset, pubkey) => new MemcmpFilter(offset, pubkey.toBuffer());
exports.pubkeyFilter = pubkeyFilter;
const booleanFilter = (offset, value) => new MemcmpFilter(offset, Buffer.from(value ? [1] : [0]));
exports.booleanFilter = booleanFilter;
function getBorshProgramAccounts(connection_1, programId_1, getSchema_1, accountFactory_1) {
    return __awaiter(this, arguments, void 0, function* (connection, programId, getSchema, accountFactory, filters = [], accountType) {
        accountType = accountType !== null && accountType !== void 0 ? accountType : new accountFactory({}).accountType;
        const programAccounts = yield connection.getProgramAccounts(programId, {
            commitment: connection.commitment,
            filters: [
                { memcmp: { offset: 0, bytes: bs58_1.default.encode([accountType]) } },
                ...filters.map(f => ({ memcmp: { offset: f.offset, bytes: bs58_1.default.encode(f.bytes) } }))
            ]
        });
        const accounts = [];
        for (let rawAccount of programAccounts) {
            try {
                const data = rawAccount.account.data;
                const accountType = data[0];
                const account = {
                    pubkey: new web3_js_1.PublicKey(rawAccount.pubkey),
                    account: (0, tools_1.deserializeBorsh)(getSchema(accountType), accountFactory, data),
                    owner: rawAccount.account.owner
                };
                accounts.push(account);
            }
            catch (ex) {
                console.info(`Can't deserialize ${accountFactory.name} @ ${rawAccount.pubkey}.`, (0, tools_1.getErrorMessage)(ex));
            }
        }
        return accounts;
    });
}
exports.getBorshProgramAccounts = getBorshProgramAccounts;
