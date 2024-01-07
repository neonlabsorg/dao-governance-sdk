import { PublicKey } from '@solana/web3.js';
export interface WithdrawDepositedTokensData {
    programKey: PublicKey;
    realmKey: PublicKey;
    governingTokenDestinationKey: PublicKey;
    governingTokenMintKey: PublicKey;
    vestingTokenOwnerKey: PublicKey;
    vestingProgramKey: PublicKey;
    vestingTokenAddressKey: PublicKey;
    vestingTokenAccountKey: PublicKey;
    voterWeightRecordKey?: PublicKey;
    maxVoterWeightRecordKey?: PublicKey;
}
export interface CloseVestingAccountData {
    vestingProgramKey: PublicKey;
    vestingTokenAddressKey: PublicKey;
    vestingTokenOwnerKey: PublicKey;
    spillKey: PublicKey;
}
export interface CreateVoterWeightRecordParams {
    vestingProgramKey: PublicKey;
    realmKey: PublicKey;
    governingTokenMintKey: PublicKey;
    walletKey: PublicKey;
    payerKey: PublicKey;
    voterWeightRecordKey: PublicKey;
}
