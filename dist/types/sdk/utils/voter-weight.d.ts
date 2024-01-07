import { Connection, PublicKey } from '@solana/web3.js';
import { MaxVoterWeightRecord, VoterWeightRecord } from '../addins';
import { Realm } from '../governance';
import { ProgramAccount } from '../models';
export type AccountVoterWeightRecord = {
    voterWeight?: ProgramAccount<VoterWeightRecord>;
    maxVoterWeight?: ProgramAccount<MaxVoterWeightRecord>;
};
export declare function getVoterWeightProgramAccount(c: Connection, realm: ProgramAccount<Realm>, programId: PublicKey, walletPublicKey: PublicKey): Promise<AccountVoterWeightRecord>;
