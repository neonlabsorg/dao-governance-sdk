import { deserializeBorsh } from '../tools';
export function borshAccountParser(classFactory, getSchema) {
    return (pubkey, info) => {
        const buffer = Buffer.from(info.data);
        const account = deserializeBorsh(getSchema(info.data[0]), classFactory, buffer);
        return { pubkey, owner: info.owner, account };
    };
}
//# sourceMappingURL=serialisation.js.map