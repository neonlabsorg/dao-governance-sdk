export function getErrorMessage(ex) {
    if (ex instanceof Error) {
        return ex.message;
    }
    return JSON.stringify(ex);
}
export function shortMeta(pubkey, isWritable = false, isSigner = false) {
    return { pubkey, isSigner, isWritable };
}
