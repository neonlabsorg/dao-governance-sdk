import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

import { GovernanceConfig, InstructionData, RealmConfigArgs, VoteType } from './accounts';

// Vesting enum for addin-vesting
// ref: https://github.com/neonlabsorg/neon-spl-governance/blob/main/addin-vesting/program/src/instruction.rs
export enum VestingInstruction {
  Deposit = 0,
  Withdraw,
  SetVotePercentage,
  ChangeOwner = 3,
  CreateVoterWeightRecord,
  Close
}

// ref: https://github.com/neonlabsorg/neon-spl-governance/blob/be99feed8d0143ad3a77f9f50e25c97015ace3d2/addin-fixed-weights/program/src/instruction.rs
export enum VoterWeightInstruction {
  SetupMaxVoterWeightRecord,
  SetupVoterWeightRecord,
  SetVotePercentage,
}

export enum TokenInstruction {
  InitializeMint,
  InitializeAccount,
  InitializeMultisig,
  Transfer,
  Approve,
  Revoke,
  SetAuthority,
  MintTo,
  Burn,
  CloseAccount,
  FreezeAccount,
  ThawAccount,
  TransferChecked,
  ApproveChecked,
  MintToChecked,
  BurnChecked,
  InitializeAccount2,
  SyncNative,
  InitializeAccount3,
  InitializeMultisig2,
  InitializeMint2,
  GetAccountDataSize,
  InitializeImmutableOwner,
  AmountToUiAmount,
  UiAmountToAmount
}

export enum GovernanceInstruction {
  CreateRealm = 0,
  DepositGoverningTokens = 1,
  WithdrawGoverningTokens = 2,
  SetGovernanceDelegate = 3, // --
  CreateGovernance = 4,
  CreateProgramGovernance = 5,

  CreateProposal = 6,
  AddSignatory = 7,
  RemoveSignatory = 8,

  InsertTransaction = 9,
  RemoveTransaction = 10,
  CancelProposal = 11,
  SignOffProposal = 12,
  CastVote = 13,
  FinalizeVote = 14,
  RelinquishVote = 15,
  ExecuteTransaction = 16,

  CreateMintGovernance = 17,
  CreateTokenGovernance = 18,
  SetGovernanceConfig = 19,
  FlagTransactionError = 20,
  SetRealmAuthority = 21,
  SetRealmConfig = 22,
  CreateTokenOwnerRecord = 23,
  UpdateProgramMetadata = 24,
  CreateNativeTreasury = 25,
  RevokeGoverningTokens = 26,
}

export class CreateRealmArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.CreateRealm;
  configArgs: RealmConfigArgs;
  name: string;

  constructor(args: { name: string; configArgs: RealmConfigArgs }) {
    this.name = args.name;
    this.configArgs = args.configArgs;
  }
}

export class DepositGoverningTokensArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.DepositGoverningTokens;
  amount: BN;

  constructor(args: { amount: BN }) {
    this.amount = args.amount;
  }
}

export class DepositGoverningTokensEntry {
  amount: BN;
  release_time: number;

  constructor(args: { amount: BN; release_time: number }) {
    this.amount = args.amount;
    this.release_time = args.release_time;
  }
}

export class DepositGoverningTokensMultiArgs {
  instruction: VestingInstruction = VestingInstruction.Deposit;
  entries: Array<DepositGoverningTokensEntry> = [];

  constructor(args: { amount: BN; release_time: number }[]) {
    this.entries = args.map(e => new DepositGoverningTokensEntry(e));
  }
}

export class WithdrawGoverningTokensArgs {
  instruction: VestingInstruction = VestingInstruction.Withdraw;
}

export class CloseVestingAccountArgs {
  instruction: VestingInstruction = VestingInstruction.Close;
}

export class CreateGovernanceArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.CreateGovernance;
  config: GovernanceConfig;

  constructor(args: { config: GovernanceConfig }) {
    this.config = args.config;
  }
}

export class CreateProgramGovernanceArgs {
  instruction: GovernanceInstruction =
    GovernanceInstruction.CreateProgramGovernance;
  config: GovernanceConfig;
  transferUpgradeAuthority: boolean;

  constructor(args: {
    config: GovernanceConfig;
    transferUpgradeAuthority: boolean;
  }) {
    this.config = args.config;
    this.transferUpgradeAuthority = !!args.transferUpgradeAuthority;
  }
}

export class CreateMintGovernanceArgs {
  instruction: GovernanceInstruction =
    GovernanceInstruction.CreateMintGovernance;
  config: GovernanceConfig;
  transferMintAuthorities: boolean;

  constructor(args: {
    config: GovernanceConfig;
    transferMintAuthorities: boolean;
  }) {
    this.config = args.config;
    this.transferMintAuthorities = !!args.transferMintAuthorities;
  }
}

export class CreateTokenGovernanceArgs {
  instruction: GovernanceInstruction =
    GovernanceInstruction.CreateTokenGovernance;
  config: GovernanceConfig;
  transferTokenOwner: boolean;

  constructor(args: { config: GovernanceConfig; transferTokenOwner: boolean }) {
    this.config = args.config;
    this.transferTokenOwner = !!args.transferTokenOwner;
  }
}

export class SetDelegateAmountConfigArgs {
  instruction: TokenInstruction = TokenInstruction.Approve;
  amount: BN;

  constructor(args: { amount: BN }) {
    this.amount = args.amount;
  }
}

export class SetTransferAmountConfigArgs {
  instruction: TokenInstruction = TokenInstruction.Transfer;
  amount: BN;

  constructor(args: { amount: BN }) {
    this.amount = args.amount;
  }
}

export class SetGovernanceConfigArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.SetGovernanceConfig;
  config: GovernanceConfig;

  constructor(args: { config: GovernanceConfig }) {
    this.config = args.config;
  }
}

export class CreateProposalArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.CreateProposal;
  name: string;
  description: string;

  // V1 -----------------------------
  governingTokenMint: PublicKey;
  // --------------------------------

  // V2 -----------------------------
  voteType: VoteType;
  options: string[];
  useDenyOption: boolean;

  // --------------------------------

  constructor(args: {
    name: string;
    description: string;
    governingTokenMint: PublicKey;
    voteType: VoteType;
    options: string[];
    useDenyOption: boolean;
  }) {
    this.name = args.name;
    this.description = args.description;
    this.governingTokenMint = args.governingTokenMint;
    this.voteType = args.voteType;
    this.options = args.options;
    this.useDenyOption = args.useDenyOption;
  }
}

export class AddSignatoryArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.AddSignatory;
  signatory: PublicKey;

  constructor(args: { signatory: PublicKey }) {
    this.signatory = args.signatory;
  }
}

export class SignOffProposalArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.SignOffProposal;
}

export class CancelProposalArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.CancelProposal;
}

export enum YesNoVote {
  Yes,
  No,
}

export class VoteChoice {
  rank: number;
  weightPercentage: number;

  constructor(args: { rank: number; weightPercentage: number }) {
    this.rank = args.rank;
    this.weightPercentage = args.weightPercentage;
  }
}

export enum VoteKind {
  Approve,
  Deny,
  Abstain,
  Veto,
}

export class Vote {
  voteType: VoteKind;
  approveChoices?: VoteChoice[];
  deny?: boolean;

  constructor(args: { voteType: VoteKind; approveChoices?: VoteChoice[]; deny?: boolean; }) {
    this.voteType = args.voteType;
    this.approveChoices = args.approveChoices;
    this.deny = args.deny;
  }

  toYesNoVote() {
    switch (this.voteType) {
      case VoteKind.Deny: {
        return YesNoVote.No;
      }
      case VoteKind.Approve: {
        return YesNoVote.Yes;
      }
    }
    return YesNoVote.No;
  }

  static fromYesNoVote(yesNoVote: YesNoVote) {
    switch (yesNoVote) {
      case YesNoVote.Yes: {
        return new Vote({
          voteType: VoteKind.Approve,
          approveChoices: [new VoteChoice({ rank: 0, weightPercentage: 100 })],
          deny: undefined
        });
      }
      case YesNoVote.No: {
        return new Vote({
          voteType: VoteKind.Deny,
          approveChoices: undefined,
          deny: true
        });
      }
    }
  }
}

export class CastVoteArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.CastVote;

  // V1
  yesNoVote: YesNoVote | undefined;

  // V2
  vote: Vote | undefined;

  constructor(args: { yesNoVote?: YesNoVote; vote?: Vote; }) {
    this.yesNoVote = args.yesNoVote;
    this.vote = args.vote;
  }
}

export class RelinquishVoteArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.RelinquishVote;
}

export class FinalizeVoteArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.FinalizeVote;
}

export class InsertTransactionArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.InsertTransaction;
  index: number;
  optionIndex: number;
  holdUpTime: number;

  // V1
  instructionData?: InstructionData;
  // V2
  instructions?: InstructionData[];

  constructor(args: {
    index: number;
    optionIndex: number;
    holdUpTime: number;
    // V1
    instructionData?: InstructionData;
    // V2
    instructions?: InstructionData[];
  }) {
    this.index = args.index;
    this.optionIndex = args.optionIndex;
    this.holdUpTime = args.holdUpTime;
    // V1
    this.instructionData = args.instructionData;
    // V2
    this.instructions = args.instructions;
  }
}

export class RemoveTransactionArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.RemoveTransaction;
}

export class ExecuteTransactionArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.ExecuteTransaction;
}

export class FlagTransactionErrorArgs {
  instruction: GovernanceInstruction =
    GovernanceInstruction.FlagTransactionError;
}

export enum SetRealmAuthorityAction {
  SetUnchecked,
  SetChecked,
  Remove,
}

export class SetRealmAuthorityArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.SetRealmAuthority;

  // V1
  newRealmAuthority?: PublicKey;

  // V2
  action?: SetRealmAuthorityAction;

  constructor(args: { newRealmAuthority?: PublicKey; action?: SetRealmAuthorityAction; }) {
    // V1
    this.newRealmAuthority = args.newRealmAuthority;

    // V2
    this.action = args.action;
  }
}

export class SetRealmConfigArgs {
  instruction: GovernanceInstruction = GovernanceInstruction.SetRealmConfig;
  configArgs: RealmConfigArgs;

  constructor(args: { configArgs: RealmConfigArgs }) {
    this.configArgs = args.configArgs;
  }
}

export class CreateTokenOwnerRecordArgs {
  instruction: GovernanceInstruction =
    GovernanceInstruction.CreateTokenOwnerRecord;
}

export class UpdateProgramMetadataArgs {
  instruction: GovernanceInstruction =
    GovernanceInstruction.UpdateProgramMetadata;
}

export class CreateNativeTreasuryArgs {
  instruction: GovernanceInstruction =
    GovernanceInstruction.CreateNativeTreasury;
}

export class SetGovernanceDelegateArgs {
  instruction: GovernanceInstruction =
    GovernanceInstruction.SetGovernanceDelegate;

  newGovernanceDelegate?: PublicKey;

  constructor(args: { newGovernanceDelegate?: PublicKey }) {
    this.newGovernanceDelegate = args.newGovernanceDelegate;
  }
}

export class RevokeGoverningTokensArgs {
  instruction: GovernanceInstruction =
    GovernanceInstruction.RevokeGoverningTokens;
  amount: BN;

  constructor(args: { amount: BN }) {
    this.amount = args.amount;
  }
}

export class CreateVoterWeightRecordVestingArgs {
  instruction: VestingInstruction = VestingInstruction.CreateVoterWeightRecord;
}

export class CreateVoterWeightRecordFixedArgs {
  instruction: VoterWeightInstruction =
    VoterWeightInstruction.SetupVoterWeightRecord;
}
