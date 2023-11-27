import { Connection, Keypair, PublicKey, Signer } from '@solana/web3.js';
import { decode } from 'bs58';
import BN from 'bn.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { accountByMint, delay, solanaTransactionLog, tokenAccountParser, toSigner } from '../utils';
import {
  depositTransaction,
  getRealm,
  getVoterWeightProgramAccount,
  getVoterWeightRecordAddress,
  governanceAccountParser,
  RealmConfigAccount,
  simulateTransaction
} from '../../sdk';

require('dotenv').config({ path: `./src/__tests__/env/.env.stand` });

const neonTokenMintKey = new PublicKey(process.env.NEON_TOKEN_MINT!);
const governanceProgramKey = new PublicKey(process.env.GOVERNANCE_PROGRAM!);
const realmKey = new PublicKey(process.env.ECOSYSTEM_ASSEMBLY!);
const creatorAccount = new PublicKey(process.env.CREATOR_ACCOUNT!);
const payerAccount = new PublicKey(process.env.PAYER_ACCOUNT!);
const SOLANA_URL = process.env.SOLANA_URL!;
const SOLANA_WALLET_PRIVATE = decode(process.env.SOLANA_WALLET_PRIVATE!);
let connection: Connection;
let solanaWallet: Keypair;
let signer: Signer;
let tokenAccounts: any[] = [];

beforeAll(async () => {
  try {
    connection = new Connection(SOLANA_URL, 'confirmed');
    solanaWallet = Keypair.fromSecretKey(SOLANA_WALLET_PRIVATE);
    signer = toSigner(solanaWallet);
    const accounts = await connection.getTokenAccountsByOwner(solanaWallet.publicKey, { programId: TOKEN_PROGRAM_ID });
    tokenAccounts = accounts.value.map(item => tokenAccountParser(item.pubkey, item.account));
    await delay(1e3);
  } catch (e) {
    console.log(e);
  }
});

afterEach(async () => {
  await delay(2e3);
});

describe('Governance DAO Tests', () => {
  it(`Should simulate Deposit Tokens Transaction`, async () => {
    const seeds = [Buffer.from('realm-config'), realmKey.toBuffer()];
    const [realmConfigAddress] = PublicKey.findProgramAddressSync(seeds, governanceProgramKey);
    const realm = await getRealm(connection, realmConfigAddress);
    const realmConfigAccountInfo = await connection.getAccountInfo(realmConfigAddress);
    const realmConfig = governanceAccountParser(RealmConfigAccount)(realmKey, realmConfigAccountInfo!);
    const governingTokenMint = realm.account.communityMint;
    const vestingProgramKey = realmConfig.account.communityVoterWeightAddin!;
    const governingTokenAccount = accountByMint(tokenAccounts, governingTokenMint);
    const voterWeightRecordKey = getVoterWeightRecordAddress(vestingProgramKey, realmKey, governingTokenMint, solanaWallet.publicKey);
    const voterWeightProgramAccount = await getVoterWeightProgramAccount(connection, realm, realmConfig.account.communityVoterWeightAddin, solanaWallet.publicKey);
    const [signers, transaction] = depositTransaction(
      realmKey,
      realmConfigAddress,
      governingTokenMint,
      solanaWallet.publicKey,
      new BN(1e9),
      governingTokenAccount!,
      voterWeightProgramAccount.voterWeight,
      voterWeightProgramAccount.maxVoterWeight
    );

    solanaTransactionLog(transaction);

    const { value } = await simulateTransaction(connection, transaction, 'confirmed');
    console.log(value);
    expect(value.err).toBeUndefined();
  });
});
