"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortMeta = exports.getErrorMessage = void 0;
function getErrorMessage(ex) {
    if (ex instanceof Error) {
        return ex.message;
    }
    return JSON.stringify(ex);
}
exports.getErrorMessage = getErrorMessage;
function shortMeta(pubkey, isWritable = false, isSigner = false) {
    return { pubkey, isSigner, isWritable };
}
exports.shortMeta = shortMeta;
