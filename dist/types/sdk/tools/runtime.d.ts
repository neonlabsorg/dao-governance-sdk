import { Commitment, Connection, RpcResponseAndContext, SimulatedTransactionResponse, Transaction, TransactionError } from '@solana/web3.js';
export declare function simulateTransaction(connection: Connection, transaction: Transaction, commitment: Commitment): Promise<RpcResponseAndContext<SimulatedTransactionResponse>>;
export declare class SendTransactionError extends Error {
    txError: TransactionError | undefined;
    txId: string;
    constructor(message: string, txId: string, txError?: TransactionError);
}
