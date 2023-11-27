import { Connection, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { governanceAddinAccountParser, MaxVoterWeightRecord, VoterWeightRecord } from '../addins';
import { Realm } from '../governance';
import { ProgramAccount } from '../models';

export type AccountVoterWeightRecord = {
  voterWeight?: ProgramAccount<VoterWeightRecord>;
  maxVoterWeight?: ProgramAccount<MaxVoterWeightRecord>;
};

export async function getVoterWeightProgramAccount(c: Connection, realm: ProgramAccount<Realm>, programId: PublicKey, walletPublicKey: PublicKey): Promise<AccountVoterWeightRecord> {
  const discriminatorVoterWeightRecord = [46, 249, 155, 75, 153, 248, 116, 9];
  const voterWeightBytes = discriminatorVoterWeightRecord
    .concat(...realm.pubkey.toBytes())
    .concat(...realm.account.communityMint.toBytes())
    .concat(...walletPublicKey.toBytes());

  const discriminatorMaxVoterWeightRecord = [157, 95, 242, 151, 16, 98, 26, 118];
  const maxVoterWeightBytes = discriminatorMaxVoterWeightRecord
    .concat(...realm.pubkey.toBytes())
    .concat(...realm.account.communityMint.toBytes());

  const [voterWeight] = await c.getProgramAccounts(programId, {
    encoding: 'base64',
    filters: [{ memcmp: { offset: 0, bytes: bs58.encode(voterWeightBytes) } }]
  });

  const [maxVoterWeight] = await c.getProgramAccounts(programId, {
    encoding: 'base64',
    filters: [{ memcmp: { offset: 0, bytes: bs58.encode(maxVoterWeightBytes) } }]
  });

  try {
    return {
      voterWeight: voterWeight
        ? governanceAddinAccountParser(VoterWeightRecord)(voterWeight.pubkey, voterWeight.account)
        : undefined,
      maxVoterWeight: maxVoterWeight
        ? governanceAddinAccountParser(MaxVoterWeightRecord)(maxVoterWeight.pubkey, maxVoterWeight.account)
        : undefined
    };
  } catch (e) {
    console.log(e);
  }
  return {};
}
