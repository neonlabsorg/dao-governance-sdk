import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { GovernanceConfig, InstructionData, RealmConfigArgs, VoteType } from './accounts';
export declare enum VestingInstruction {
    Deposit = 0,
    Withdraw = 1,
    SetVotePercentage = 2,
    ChangeOwner = 3,
    CreateVoterWeightRecord = 4,
    Close = 5
}
export declare enum VoterWeightInstruction {
    SetupMaxVoterWeightRecord = 0,
    SetupVoterWeightRecord = 1,
    SetVotePercentage = 2
}
export declare enum TokenInstruction {
    InitializeMint = 0,
    InitializeAccount = 1,
    InitializeMultisig = 2,
    Transfer = 3,
    Approve = 4,
    Revoke = 5,
    SetAuthority = 6,
    MintTo = 7,
    Burn = 8,
    CloseAccount = 9,
    FreezeAccount = 10,
    ThawAccount = 11,
    TransferChecked = 12,
    ApproveChecked = 13,
    MintToChecked = 14,
    BurnChecked = 15,
    InitializeAccount2 = 16,
    SyncNative = 17,
    InitializeAccount3 = 18,
    InitializeMultisig2 = 19,
    InitializeMint2 = 20,
    GetAccountDataSize = 21,
    InitializeImmutableOwner = 22,
    AmountToUiAmount = 23,
    UiAmountToAmount = 24
}
export declare enum GovernanceInstruction {
    CreateRealm = 0,
    DepositGoverningTokens = 1,
    WithdrawGoverningTokens = 2,
    SetGovernanceDelegate = 3,// --
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
    RevokeGoverningTokens = 26
}
export declare class CreateRealmArgs {
    instruction: GovernanceInstruction;
    configArgs: RealmConfigArgs;
    name: string;
    constructor(args: {
        name: string;
        configArgs: RealmConfigArgs;
    });
}
export declare class DepositGoverningTokensArgs {
    instruction: GovernanceInstruction;
    amount: BN;
    constructor(args: {
        amount: BN;
    });
}
export declare class DepositGoverningTokensEntry {
    amount: BN;
    release_time: number;
    constructor(args: {
        amount: BN;
        release_time: number;
    });
}
export declare class DepositGoverningTokensMultiArgs {
    instruction: VestingInstruction;
    entries: Array<DepositGoverningTokensEntry>;
    constructor(args: {
        amount: BN;
        release_time: number;
    }[]);
}
export declare class WithdrawGoverningTokensArgs {
    instruction: VestingInstruction;
}
export declare class CloseVestingAccountArgs {
    instruction: VestingInstruction;
}
export declare class CreateGovernanceArgs {
    instruction: GovernanceInstruction;
    config: GovernanceConfig;
    constructor(args: {
        config: GovernanceConfig;
    });
}
export declare class CreateProgramGovernanceArgs {
    instruction: GovernanceInstruction;
    config: GovernanceConfig;
    transferUpgradeAuthority: boolean;
    constructor(args: {
        config: GovernanceConfig;
        transferUpgradeAuthority: boolean;
    });
}
export declare class CreateMintGovernanceArgs {
    instruction: GovernanceInstruction;
    config: GovernanceConfig;
    transferMintAuthorities: boolean;
    constructor(args: {
        config: GovernanceConfig;
        transferMintAuthorities: boolean;
    });
}
export declare class CreateTokenGovernanceArgs {
    instruction: GovernanceInstruction;
    config: GovernanceConfig;
    transferTokenOwner: boolean;
    constructor(args: {
        config: GovernanceConfig;
        transferTokenOwner: boolean;
    });
}
export declare class SetDelegateAmountConfigArgs {
    instruction: TokenInstruction;
    amount: BN;
    constructor(args: {
        amount: BN;
    });
}
export declare class SetTransferAmountConfigArgs {
    instruction: TokenInstruction;
    amount: BN;
    constructor(args: {
        amount: BN;
    });
}
export declare class SetGovernanceConfigArgs {
    instruction: GovernanceInstruction;
    config: GovernanceConfig;
    constructor(args: {
        config: GovernanceConfig;
    });
}
export declare class CreateProposalArgs {
    instruction: GovernanceInstruction;
    name: string;
    description: string;
    governingTokenMint: PublicKey;
    voteType: VoteType;
    options: string[];
    useDenyOption: boolean;
    constructor(args: {
        name: string;
        description: string;
        governingTokenMint: PublicKey;
        voteType: VoteType;
        options: string[];
        useDenyOption: boolean;
    });
}
export declare class AddSignatoryArgs {
    instruction: GovernanceInstruction;
    signatory: PublicKey;
    constructor(args: {
        signatory: PublicKey;
    });
}
export declare class SignOffProposalArgs {
    instruction: GovernanceInstruction;
}
export declare class CancelProposalArgs {
    instruction: GovernanceInstruction;
}
export declare enum YesNoVote {
    Yes = 0,
    No = 1
}
export declare class VoteChoice {
    rank: number;
    weightPercentage: number;
    constructor(args: {
        rank: number;
        weightPercentage: number;
    });
}
export declare enum VoteKind {
    Approve = 0,
    Deny = 1,
    Abstain = 2,
    Veto = 3
}
export declare class Vote {
    voteType: VoteKind;
    approveChoices?: VoteChoice[];
    deny?: boolean;
    constructor(args: {
        voteType: VoteKind;
        approveChoices?: VoteChoice[];
        deny?: boolean;
    });
    toYesNoVote(): YesNoVote;
    static fromYesNoVote(yesNoVote: YesNoVote): Vote;
}
export declare class CastVoteArgs {
    instruction: GovernanceInstruction;
    yesNoVote: YesNoVote | undefined;
    vote: Vote | undefined;
    constructor(args: {
        yesNoVote?: YesNoVote;
        vote?: Vote;
    });
}
export declare class RelinquishVoteArgs {
    instruction: GovernanceInstruction;
}
export declare class FinalizeVoteArgs {
    instruction: GovernanceInstruction;
}
export declare class InsertTransactionArgs {
    instruction: GovernanceInstruction;
    index: number;
    optionIndex: number;
    holdUpTime: number;
    instructionData?: InstructionData;
    instructions?: InstructionData[];
    constructor(args: {
        index: number;
        optionIndex: number;
        holdUpTime: number;
        instructionData?: InstructionData;
        instructions?: InstructionData[];
    });
}
export declare class RemoveTransactionArgs {
    instruction: GovernanceInstruction;
}
export declare class ExecuteTransactionArgs {
    instruction: GovernanceInstruction;
}
export declare class FlagTransactionErrorArgs {
    instruction: GovernanceInstruction;
}
export declare enum SetRealmAuthorityAction {
    SetUnchecked = 0,
    SetChecked = 1,
    Remove = 2
}
export declare class SetRealmAuthorityArgs {
    instruction: GovernanceInstruction;
    newRealmAuthority?: PublicKey;
    action?: SetRealmAuthorityAction;
    constructor(args: {
        newRealmAuthority?: PublicKey;
        action?: SetRealmAuthorityAction;
    });
}
export declare class SetRealmConfigArgs {
    instruction: GovernanceInstruction;
    configArgs: RealmConfigArgs;
    constructor(args: {
        configArgs: RealmConfigArgs;
    });
}
export declare class CreateTokenOwnerRecordArgs {
    instruction: GovernanceInstruction;
}
export declare class UpdateProgramMetadataArgs {
    instruction: GovernanceInstruction;
}
export declare class CreateNativeTreasuryArgs {
    instruction: GovernanceInstruction;
}
export declare class SetGovernanceDelegateArgs {
    instruction: GovernanceInstruction;
    newGovernanceDelegate?: PublicKey;
    constructor(args: {
        newGovernanceDelegate?: PublicKey;
    });
}
export declare class RevokeGoverningTokensArgs {
    instruction: GovernanceInstruction;
    amount: BN;
    constructor(args: {
        amount: BN;
    });
}
export declare class CreateVoterWeightRecordVestingArgs {
    instruction: VestingInstruction;
}
export declare class CreateVoterWeightRecordFixedArgs {
    instruction: VoterWeightInstruction;
}
