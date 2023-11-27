// Vesting enum for addin-vesting
// ref: https://github.com/neonlabsorg/neon-spl-governance/blob/main/addin-vesting/program/src/instruction.rs
export var VestingInstruction;
(function (VestingInstruction) {
    VestingInstruction[VestingInstruction["Deposit"] = 0] = "Deposit";
    VestingInstruction[VestingInstruction["Withdraw"] = 1] = "Withdraw";
    VestingInstruction[VestingInstruction["SetVotePercentage"] = 2] = "SetVotePercentage";
    VestingInstruction[VestingInstruction["ChangeOwner"] = 3] = "ChangeOwner";
    VestingInstruction[VestingInstruction["CreateVoterWeightRecord"] = 4] = "CreateVoterWeightRecord";
    VestingInstruction[VestingInstruction["Close"] = 5] = "Close";
})(VestingInstruction || (VestingInstruction = {}));
// ref: https://github.com/neonlabsorg/neon-spl-governance/blob/be99feed8d0143ad3a77f9f50e25c97015ace3d2/addin-fixed-weights/program/src/instruction.rs
export var VoterWeightInstruction;
(function (VoterWeightInstruction) {
    VoterWeightInstruction[VoterWeightInstruction["SetupMaxVoterWeightRecord"] = 0] = "SetupMaxVoterWeightRecord";
    VoterWeightInstruction[VoterWeightInstruction["SetupVoterWeightRecord"] = 1] = "SetupVoterWeightRecord";
    VoterWeightInstruction[VoterWeightInstruction["SetVotePercentage"] = 2] = "SetVotePercentage";
})(VoterWeightInstruction || (VoterWeightInstruction = {}));
export var TokenInstruction;
(function (TokenInstruction) {
    TokenInstruction[TokenInstruction["InitializeMint"] = 0] = "InitializeMint";
    TokenInstruction[TokenInstruction["InitializeAccount"] = 1] = "InitializeAccount";
    TokenInstruction[TokenInstruction["InitializeMultisig"] = 2] = "InitializeMultisig";
    TokenInstruction[TokenInstruction["Transfer"] = 3] = "Transfer";
    TokenInstruction[TokenInstruction["Approve"] = 4] = "Approve";
    TokenInstruction[TokenInstruction["Revoke"] = 5] = "Revoke";
    TokenInstruction[TokenInstruction["SetAuthority"] = 6] = "SetAuthority";
    TokenInstruction[TokenInstruction["MintTo"] = 7] = "MintTo";
    TokenInstruction[TokenInstruction["Burn"] = 8] = "Burn";
    TokenInstruction[TokenInstruction["CloseAccount"] = 9] = "CloseAccount";
    TokenInstruction[TokenInstruction["FreezeAccount"] = 10] = "FreezeAccount";
    TokenInstruction[TokenInstruction["ThawAccount"] = 11] = "ThawAccount";
    TokenInstruction[TokenInstruction["TransferChecked"] = 12] = "TransferChecked";
    TokenInstruction[TokenInstruction["ApproveChecked"] = 13] = "ApproveChecked";
    TokenInstruction[TokenInstruction["MintToChecked"] = 14] = "MintToChecked";
    TokenInstruction[TokenInstruction["BurnChecked"] = 15] = "BurnChecked";
    TokenInstruction[TokenInstruction["InitializeAccount2"] = 16] = "InitializeAccount2";
    TokenInstruction[TokenInstruction["SyncNative"] = 17] = "SyncNative";
    TokenInstruction[TokenInstruction["InitializeAccount3"] = 18] = "InitializeAccount3";
    TokenInstruction[TokenInstruction["InitializeMultisig2"] = 19] = "InitializeMultisig2";
    TokenInstruction[TokenInstruction["InitializeMint2"] = 20] = "InitializeMint2";
    TokenInstruction[TokenInstruction["GetAccountDataSize"] = 21] = "GetAccountDataSize";
    TokenInstruction[TokenInstruction["InitializeImmutableOwner"] = 22] = "InitializeImmutableOwner";
    TokenInstruction[TokenInstruction["AmountToUiAmount"] = 23] = "AmountToUiAmount";
    TokenInstruction[TokenInstruction["UiAmountToAmount"] = 24] = "UiAmountToAmount";
})(TokenInstruction || (TokenInstruction = {}));
export var GovernanceInstruction;
(function (GovernanceInstruction) {
    GovernanceInstruction[GovernanceInstruction["CreateRealm"] = 0] = "CreateRealm";
    GovernanceInstruction[GovernanceInstruction["DepositGoverningTokens"] = 1] = "DepositGoverningTokens";
    GovernanceInstruction[GovernanceInstruction["WithdrawGoverningTokens"] = 2] = "WithdrawGoverningTokens";
    GovernanceInstruction[GovernanceInstruction["SetGovernanceDelegate"] = 3] = "SetGovernanceDelegate";
    GovernanceInstruction[GovernanceInstruction["CreateGovernance"] = 4] = "CreateGovernance";
    GovernanceInstruction[GovernanceInstruction["CreateProgramGovernance"] = 5] = "CreateProgramGovernance";
    GovernanceInstruction[GovernanceInstruction["CreateProposal"] = 6] = "CreateProposal";
    GovernanceInstruction[GovernanceInstruction["AddSignatory"] = 7] = "AddSignatory";
    GovernanceInstruction[GovernanceInstruction["RemoveSignatory"] = 8] = "RemoveSignatory";
    GovernanceInstruction[GovernanceInstruction["InsertTransaction"] = 9] = "InsertTransaction";
    GovernanceInstruction[GovernanceInstruction["RemoveTransaction"] = 10] = "RemoveTransaction";
    GovernanceInstruction[GovernanceInstruction["CancelProposal"] = 11] = "CancelProposal";
    GovernanceInstruction[GovernanceInstruction["SignOffProposal"] = 12] = "SignOffProposal";
    GovernanceInstruction[GovernanceInstruction["CastVote"] = 13] = "CastVote";
    GovernanceInstruction[GovernanceInstruction["FinalizeVote"] = 14] = "FinalizeVote";
    GovernanceInstruction[GovernanceInstruction["RelinquishVote"] = 15] = "RelinquishVote";
    GovernanceInstruction[GovernanceInstruction["ExecuteTransaction"] = 16] = "ExecuteTransaction";
    GovernanceInstruction[GovernanceInstruction["CreateMintGovernance"] = 17] = "CreateMintGovernance";
    GovernanceInstruction[GovernanceInstruction["CreateTokenGovernance"] = 18] = "CreateTokenGovernance";
    GovernanceInstruction[GovernanceInstruction["SetGovernanceConfig"] = 19] = "SetGovernanceConfig";
    GovernanceInstruction[GovernanceInstruction["FlagTransactionError"] = 20] = "FlagTransactionError";
    GovernanceInstruction[GovernanceInstruction["SetRealmAuthority"] = 21] = "SetRealmAuthority";
    GovernanceInstruction[GovernanceInstruction["SetRealmConfig"] = 22] = "SetRealmConfig";
    GovernanceInstruction[GovernanceInstruction["CreateTokenOwnerRecord"] = 23] = "CreateTokenOwnerRecord";
    GovernanceInstruction[GovernanceInstruction["UpdateProgramMetadata"] = 24] = "UpdateProgramMetadata";
    GovernanceInstruction[GovernanceInstruction["CreateNativeTreasury"] = 25] = "CreateNativeTreasury";
    GovernanceInstruction[GovernanceInstruction["RevokeGoverningTokens"] = 26] = "RevokeGoverningTokens";
})(GovernanceInstruction || (GovernanceInstruction = {}));
export class CreateRealmArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateRealm;
        this.name = args.name;
        this.configArgs = args.configArgs;
    }
}
export class DepositGoverningTokensArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.DepositGoverningTokens;
        this.amount = args.amount;
    }
}
export class DepositGoverningTokensEntry {
    constructor(args) {
        this.amount = args.amount;
        this.release_time = args.release_time;
    }
}
export class DepositGoverningTokensMultiArgs {
    constructor(args) {
        this.instruction = VestingInstruction.Deposit;
        this.entries = [];
        this.entries = args.map(e => new DepositGoverningTokensEntry(e));
    }
}
export class WithdrawGoverningTokensArgs {
    constructor() {
        this.instruction = VestingInstruction.Withdraw;
    }
}
export class CloseVestingAccountArgs {
    constructor() {
        this.instruction = VestingInstruction.Close;
    }
}
export class CreateGovernanceArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateGovernance;
        this.config = args.config;
    }
}
export class CreateProgramGovernanceArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateProgramGovernance;
        this.config = args.config;
        this.transferUpgradeAuthority = !!args.transferUpgradeAuthority;
    }
}
export class CreateMintGovernanceArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateMintGovernance;
        this.config = args.config;
        this.transferMintAuthorities = !!args.transferMintAuthorities;
    }
}
export class CreateTokenGovernanceArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateTokenGovernance;
        this.config = args.config;
        this.transferTokenOwner = !!args.transferTokenOwner;
    }
}
export class SetDelegateAmountConfigArgs {
    constructor(args) {
        this.instruction = TokenInstruction.Approve;
        this.amount = args.amount;
    }
}
export class SetTransferAmountConfigArgs {
    constructor(args) {
        this.instruction = TokenInstruction.Transfer;
        this.amount = args.amount;
    }
}
export class SetGovernanceConfigArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.SetGovernanceConfig;
        this.config = args.config;
    }
}
export class CreateProposalArgs {
    // --------------------------------
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateProposal;
        this.name = args.name;
        this.description = args.description;
        this.governingTokenMint = args.governingTokenMint;
        this.voteType = args.voteType;
        this.options = args.options;
        this.useDenyOption = args.useDenyOption;
    }
}
export class AddSignatoryArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.AddSignatory;
        this.signatory = args.signatory;
    }
}
export class SignOffProposalArgs {
    constructor() {
        this.instruction = GovernanceInstruction.SignOffProposal;
    }
}
export class CancelProposalArgs {
    constructor() {
        this.instruction = GovernanceInstruction.CancelProposal;
    }
}
export var YesNoVote;
(function (YesNoVote) {
    YesNoVote[YesNoVote["Yes"] = 0] = "Yes";
    YesNoVote[YesNoVote["No"] = 1] = "No";
})(YesNoVote || (YesNoVote = {}));
export class VoteChoice {
    constructor(args) {
        this.rank = args.rank;
        this.weightPercentage = args.weightPercentage;
    }
}
export var VoteKind;
(function (VoteKind) {
    VoteKind[VoteKind["Approve"] = 0] = "Approve";
    VoteKind[VoteKind["Deny"] = 1] = "Deny";
    VoteKind[VoteKind["Abstain"] = 2] = "Abstain";
    VoteKind[VoteKind["Veto"] = 3] = "Veto";
})(VoteKind || (VoteKind = {}));
export class Vote {
    constructor(args) {
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
    static fromYesNoVote(yesNoVote) {
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
    constructor(args) {
        this.instruction = GovernanceInstruction.CastVote;
        this.yesNoVote = args.yesNoVote;
        this.vote = args.vote;
    }
}
export class RelinquishVoteArgs {
    constructor() {
        this.instruction = GovernanceInstruction.RelinquishVote;
    }
}
export class FinalizeVoteArgs {
    constructor() {
        this.instruction = GovernanceInstruction.FinalizeVote;
    }
}
export class InsertTransactionArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.InsertTransaction;
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
    constructor() {
        this.instruction = GovernanceInstruction.RemoveTransaction;
    }
}
export class ExecuteTransactionArgs {
    constructor() {
        this.instruction = GovernanceInstruction.ExecuteTransaction;
    }
}
export class FlagTransactionErrorArgs {
    constructor() {
        this.instruction = GovernanceInstruction.FlagTransactionError;
    }
}
export var SetRealmAuthorityAction;
(function (SetRealmAuthorityAction) {
    SetRealmAuthorityAction[SetRealmAuthorityAction["SetUnchecked"] = 0] = "SetUnchecked";
    SetRealmAuthorityAction[SetRealmAuthorityAction["SetChecked"] = 1] = "SetChecked";
    SetRealmAuthorityAction[SetRealmAuthorityAction["Remove"] = 2] = "Remove";
})(SetRealmAuthorityAction || (SetRealmAuthorityAction = {}));
export class SetRealmAuthorityArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.SetRealmAuthority;
        // V1
        this.newRealmAuthority = args.newRealmAuthority;
        // V2
        this.action = args.action;
    }
}
export class SetRealmConfigArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.SetRealmConfig;
        this.configArgs = args.configArgs;
    }
}
export class CreateTokenOwnerRecordArgs {
    constructor() {
        this.instruction = GovernanceInstruction.CreateTokenOwnerRecord;
    }
}
export class UpdateProgramMetadataArgs {
    constructor() {
        this.instruction = GovernanceInstruction.UpdateProgramMetadata;
    }
}
export class CreateNativeTreasuryArgs {
    constructor() {
        this.instruction = GovernanceInstruction.CreateNativeTreasury;
    }
}
export class SetGovernanceDelegateArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.SetGovernanceDelegate;
        this.newGovernanceDelegate = args.newGovernanceDelegate;
    }
}
export class RevokeGoverningTokensArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.RevokeGoverningTokens;
        this.amount = args.amount;
    }
}
export class CreateVoterWeightRecordVestingArgs {
    constructor() {
        this.instruction = VestingInstruction.CreateVoterWeightRecord;
    }
}
export class CreateVoterWeightRecordFixedArgs {
    constructor() {
        this.instruction = VoterWeightInstruction.SetupVoterWeightRecord;
    }
}
//# sourceMappingURL=instructions.js.map