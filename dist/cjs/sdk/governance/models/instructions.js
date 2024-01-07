"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVoterWeightRecordFixedArgs = exports.CreateVoterWeightRecordVestingArgs = exports.RevokeGoverningTokensArgs = exports.SetGovernanceDelegateArgs = exports.CreateNativeTreasuryArgs = exports.UpdateProgramMetadataArgs = exports.CreateTokenOwnerRecordArgs = exports.SetRealmConfigArgs = exports.SetRealmAuthorityArgs = exports.SetRealmAuthorityAction = exports.FlagTransactionErrorArgs = exports.ExecuteTransactionArgs = exports.RemoveTransactionArgs = exports.InsertTransactionArgs = exports.FinalizeVoteArgs = exports.RelinquishVoteArgs = exports.CastVoteArgs = exports.Vote = exports.VoteKind = exports.VoteChoice = exports.YesNoVote = exports.CancelProposalArgs = exports.SignOffProposalArgs = exports.AddSignatoryArgs = exports.CreateProposalArgs = exports.SetGovernanceConfigArgs = exports.SetTransferAmountConfigArgs = exports.SetDelegateAmountConfigArgs = exports.CreateTokenGovernanceArgs = exports.CreateMintGovernanceArgs = exports.CreateProgramGovernanceArgs = exports.CreateGovernanceArgs = exports.CloseVestingAccountArgs = exports.WithdrawGoverningTokensArgs = exports.DepositGoverningTokensMultiArgs = exports.DepositGoverningTokensEntry = exports.DepositGoverningTokensArgs = exports.CreateRealmArgs = exports.GovernanceInstruction = exports.TokenInstruction = exports.VoterWeightInstruction = exports.VestingInstruction = void 0;
// Vesting enum for addin-vesting
// ref: https://github.com/neonlabsorg/neon-spl-governance/blob/main/addin-vesting/program/src/instruction.rs
var VestingInstruction;
(function (VestingInstruction) {
    VestingInstruction[VestingInstruction["Deposit"] = 0] = "Deposit";
    VestingInstruction[VestingInstruction["Withdraw"] = 1] = "Withdraw";
    VestingInstruction[VestingInstruction["SetVotePercentage"] = 2] = "SetVotePercentage";
    VestingInstruction[VestingInstruction["ChangeOwner"] = 3] = "ChangeOwner";
    VestingInstruction[VestingInstruction["CreateVoterWeightRecord"] = 4] = "CreateVoterWeightRecord";
    VestingInstruction[VestingInstruction["Close"] = 5] = "Close";
})(VestingInstruction || (exports.VestingInstruction = VestingInstruction = {}));
// ref: https://github.com/neonlabsorg/neon-spl-governance/blob/be99feed8d0143ad3a77f9f50e25c97015ace3d2/addin-fixed-weights/program/src/instruction.rs
var VoterWeightInstruction;
(function (VoterWeightInstruction) {
    VoterWeightInstruction[VoterWeightInstruction["SetupMaxVoterWeightRecord"] = 0] = "SetupMaxVoterWeightRecord";
    VoterWeightInstruction[VoterWeightInstruction["SetupVoterWeightRecord"] = 1] = "SetupVoterWeightRecord";
    VoterWeightInstruction[VoterWeightInstruction["SetVotePercentage"] = 2] = "SetVotePercentage";
})(VoterWeightInstruction || (exports.VoterWeightInstruction = VoterWeightInstruction = {}));
var TokenInstruction;
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
})(TokenInstruction || (exports.TokenInstruction = TokenInstruction = {}));
var GovernanceInstruction;
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
})(GovernanceInstruction || (exports.GovernanceInstruction = GovernanceInstruction = {}));
class CreateRealmArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateRealm;
        this.name = args.name;
        this.configArgs = args.configArgs;
    }
}
exports.CreateRealmArgs = CreateRealmArgs;
class DepositGoverningTokensArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.DepositGoverningTokens;
        this.amount = args.amount;
    }
}
exports.DepositGoverningTokensArgs = DepositGoverningTokensArgs;
class DepositGoverningTokensEntry {
    constructor(args) {
        this.amount = args.amount;
        this.release_time = args.release_time;
    }
}
exports.DepositGoverningTokensEntry = DepositGoverningTokensEntry;
class DepositGoverningTokensMultiArgs {
    constructor(args) {
        this.instruction = VestingInstruction.Deposit;
        this.entries = [];
        this.entries = args.map(e => new DepositGoverningTokensEntry(e));
    }
}
exports.DepositGoverningTokensMultiArgs = DepositGoverningTokensMultiArgs;
class WithdrawGoverningTokensArgs {
    constructor() {
        this.instruction = VestingInstruction.Withdraw;
    }
}
exports.WithdrawGoverningTokensArgs = WithdrawGoverningTokensArgs;
class CloseVestingAccountArgs {
    constructor() {
        this.instruction = VestingInstruction.Close;
    }
}
exports.CloseVestingAccountArgs = CloseVestingAccountArgs;
class CreateGovernanceArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateGovernance;
        this.config = args.config;
    }
}
exports.CreateGovernanceArgs = CreateGovernanceArgs;
class CreateProgramGovernanceArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateProgramGovernance;
        this.config = args.config;
        this.transferUpgradeAuthority = !!args.transferUpgradeAuthority;
    }
}
exports.CreateProgramGovernanceArgs = CreateProgramGovernanceArgs;
class CreateMintGovernanceArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateMintGovernance;
        this.config = args.config;
        this.transferMintAuthorities = !!args.transferMintAuthorities;
    }
}
exports.CreateMintGovernanceArgs = CreateMintGovernanceArgs;
class CreateTokenGovernanceArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CreateTokenGovernance;
        this.config = args.config;
        this.transferTokenOwner = !!args.transferTokenOwner;
    }
}
exports.CreateTokenGovernanceArgs = CreateTokenGovernanceArgs;
class SetDelegateAmountConfigArgs {
    constructor(args) {
        this.instruction = TokenInstruction.Approve;
        this.amount = args.amount;
    }
}
exports.SetDelegateAmountConfigArgs = SetDelegateAmountConfigArgs;
class SetTransferAmountConfigArgs {
    constructor(args) {
        this.instruction = TokenInstruction.Transfer;
        this.amount = args.amount;
    }
}
exports.SetTransferAmountConfigArgs = SetTransferAmountConfigArgs;
class SetGovernanceConfigArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.SetGovernanceConfig;
        this.config = args.config;
    }
}
exports.SetGovernanceConfigArgs = SetGovernanceConfigArgs;
class CreateProposalArgs {
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
exports.CreateProposalArgs = CreateProposalArgs;
class AddSignatoryArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.AddSignatory;
        this.signatory = args.signatory;
    }
}
exports.AddSignatoryArgs = AddSignatoryArgs;
class SignOffProposalArgs {
    constructor() {
        this.instruction = GovernanceInstruction.SignOffProposal;
    }
}
exports.SignOffProposalArgs = SignOffProposalArgs;
class CancelProposalArgs {
    constructor() {
        this.instruction = GovernanceInstruction.CancelProposal;
    }
}
exports.CancelProposalArgs = CancelProposalArgs;
var YesNoVote;
(function (YesNoVote) {
    YesNoVote[YesNoVote["Yes"] = 0] = "Yes";
    YesNoVote[YesNoVote["No"] = 1] = "No";
})(YesNoVote || (exports.YesNoVote = YesNoVote = {}));
class VoteChoice {
    constructor(args) {
        this.rank = args.rank;
        this.weightPercentage = args.weightPercentage;
    }
}
exports.VoteChoice = VoteChoice;
var VoteKind;
(function (VoteKind) {
    VoteKind[VoteKind["Approve"] = 0] = "Approve";
    VoteKind[VoteKind["Deny"] = 1] = "Deny";
    VoteKind[VoteKind["Abstain"] = 2] = "Abstain";
    VoteKind[VoteKind["Veto"] = 3] = "Veto";
})(VoteKind || (exports.VoteKind = VoteKind = {}));
class Vote {
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
exports.Vote = Vote;
class CastVoteArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.CastVote;
        this.yesNoVote = args.yesNoVote;
        this.vote = args.vote;
    }
}
exports.CastVoteArgs = CastVoteArgs;
class RelinquishVoteArgs {
    constructor() {
        this.instruction = GovernanceInstruction.RelinquishVote;
    }
}
exports.RelinquishVoteArgs = RelinquishVoteArgs;
class FinalizeVoteArgs {
    constructor() {
        this.instruction = GovernanceInstruction.FinalizeVote;
    }
}
exports.FinalizeVoteArgs = FinalizeVoteArgs;
class InsertTransactionArgs {
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
exports.InsertTransactionArgs = InsertTransactionArgs;
class RemoveTransactionArgs {
    constructor() {
        this.instruction = GovernanceInstruction.RemoveTransaction;
    }
}
exports.RemoveTransactionArgs = RemoveTransactionArgs;
class ExecuteTransactionArgs {
    constructor() {
        this.instruction = GovernanceInstruction.ExecuteTransaction;
    }
}
exports.ExecuteTransactionArgs = ExecuteTransactionArgs;
class FlagTransactionErrorArgs {
    constructor() {
        this.instruction = GovernanceInstruction.FlagTransactionError;
    }
}
exports.FlagTransactionErrorArgs = FlagTransactionErrorArgs;
var SetRealmAuthorityAction;
(function (SetRealmAuthorityAction) {
    SetRealmAuthorityAction[SetRealmAuthorityAction["SetUnchecked"] = 0] = "SetUnchecked";
    SetRealmAuthorityAction[SetRealmAuthorityAction["SetChecked"] = 1] = "SetChecked";
    SetRealmAuthorityAction[SetRealmAuthorityAction["Remove"] = 2] = "Remove";
})(SetRealmAuthorityAction || (exports.SetRealmAuthorityAction = SetRealmAuthorityAction = {}));
class SetRealmAuthorityArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.SetRealmAuthority;
        // V1
        this.newRealmAuthority = args.newRealmAuthority;
        // V2
        this.action = args.action;
    }
}
exports.SetRealmAuthorityArgs = SetRealmAuthorityArgs;
class SetRealmConfigArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.SetRealmConfig;
        this.configArgs = args.configArgs;
    }
}
exports.SetRealmConfigArgs = SetRealmConfigArgs;
class CreateTokenOwnerRecordArgs {
    constructor() {
        this.instruction = GovernanceInstruction.CreateTokenOwnerRecord;
    }
}
exports.CreateTokenOwnerRecordArgs = CreateTokenOwnerRecordArgs;
class UpdateProgramMetadataArgs {
    constructor() {
        this.instruction = GovernanceInstruction.UpdateProgramMetadata;
    }
}
exports.UpdateProgramMetadataArgs = UpdateProgramMetadataArgs;
class CreateNativeTreasuryArgs {
    constructor() {
        this.instruction = GovernanceInstruction.CreateNativeTreasury;
    }
}
exports.CreateNativeTreasuryArgs = CreateNativeTreasuryArgs;
class SetGovernanceDelegateArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.SetGovernanceDelegate;
        this.newGovernanceDelegate = args.newGovernanceDelegate;
    }
}
exports.SetGovernanceDelegateArgs = SetGovernanceDelegateArgs;
class RevokeGoverningTokensArgs {
    constructor(args) {
        this.instruction = GovernanceInstruction.RevokeGoverningTokens;
        this.amount = args.amount;
    }
}
exports.RevokeGoverningTokensArgs = RevokeGoverningTokensArgs;
class CreateVoterWeightRecordVestingArgs {
    constructor() {
        this.instruction = VestingInstruction.CreateVoterWeightRecord;
    }
}
exports.CreateVoterWeightRecordVestingArgs = CreateVoterWeightRecordVestingArgs;
class CreateVoterWeightRecordFixedArgs {
    constructor() {
        this.instruction = VoterWeightInstruction.SetupVoterWeightRecord;
    }
}
exports.CreateVoterWeightRecordFixedArgs = CreateVoterWeightRecordFixedArgs;
