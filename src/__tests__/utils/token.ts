import { AccountInfo, PublicKey } from '@solana/web3.js';
import { AccountLayout, MintLayout, RawAccount, RawMint } from '@solana/spl-token';
import { TokenAccount } from '../../sdk';

export function tokenAccountParser(pubkey: PublicKey, data: AccountInfo<Buffer>): TokenAccount<RawAccount> {
  const account = AccountLayout.decode(Buffer.from(data.data));
  return { pubkey, account, data };
}

export function mintAccountParser(pubkey: PublicKey, data: AccountInfo<Buffer>): TokenAccount<RawMint> {
  const account = MintLayout.decode(Buffer.from(data.data));
  return { pubkey, account, data };
}


export function accountByMint(tokenAccounts: TokenAccount<RawAccount>[], mintKey: PublicKey): TokenAccount<RawAccount> | null {
  const index = tokenAccounts.findIndex(i => i.account.mint.equals(mintKey));
  if (index > -1) {
    return tokenAccounts[index];
  }
  return null;
}
