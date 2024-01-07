import { TransactionInstruction } from '@solana/web3.js';
import { CloseVestingAccountData, WithdrawDepositedTokensData } from '../../models';
export declare function withdrawGoverningTokensInstruction(params: WithdrawDepositedTokensData): TransactionInstruction;
export declare function closeVestingAccountInstruction(params: CloseVestingAccountData): TransactionInstruction;
