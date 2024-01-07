"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borshAccountParser = void 0;
const tools_1 = require("../tools");
function borshAccountParser(classFactory, getSchema) {
    return (pubkey, info) => {
        const buffer = Buffer.from(info.data);
        const account = (0, tools_1.deserializeBorsh)(getSchema(info.data[0]), classFactory, buffer);
        return { pubkey, owner: info.owner, account };
    };
}
exports.borshAccountParser = borshAccountParser;
