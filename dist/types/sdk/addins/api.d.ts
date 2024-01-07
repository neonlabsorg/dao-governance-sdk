import { Connection, PublicKey } from '@solana/web3.js';
import { MaxVoterWeightRecord, VoterWeightRecord } from './accounts';
import { ProgramAccount } from '../models';
export declare function getMaxVoterWeightRecord(connection: Connection, maxVoterWeightRecordPk: PublicKey): Promise<ProgramAccount<MaxVoterWeightRecord>>;
export declare function getVoterWeightRecord(connection: Connection, voterWeightRecordPk: PublicKey): Promise<ProgramAccount<VoterWeightRecord>>;
export declare function getGovernanceAddinAccount<TAccount>(connection: Connection, accountPk: PublicKey, accountClass: new (args: any) => TAccount): Promise<ProgramAccount<TAccount>>;
