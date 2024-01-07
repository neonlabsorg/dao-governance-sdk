import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import { VoteKind } from './instructions';
import { ACCOUNT_VERSION_V1, ACCOUNT_VERSION_V2, PROGRAM_VERSION_V1, PROGRAM_VERSION_V2 } from '../../registry';
import { BN_ZERO } from '../../tools';
/// Seed  prefix for Governance Program PDAs
export const GOVERNANCE_PROGRAM_SEED = 'governance';
export var GovernanceAccountType;
(function (GovernanceAccountType) {
    GovernanceAccountType[GovernanceAccountType["Uninitialized"] = 0] = "Uninitialized";
    GovernanceAccountType[GovernanceAccountType["RealmV1"] = 1] = "RealmV1";
    GovernanceAccountType[GovernanceAccountType["TokenOwnerRecordV1"] = 2] = "TokenOwnerRecordV1";
    GovernanceAccountType[GovernanceAccountType["GovernanceV1"] = 3] = "GovernanceV1";
    GovernanceAccountType[GovernanceAccountType["ProgramGovernanceV1"] = 4] = "ProgramGovernanceV1";
    GovernanceAccountType[GovernanceAccountType["ProposalV1"] = 5] = "ProposalV1";
    GovernanceAccountType[GovernanceAccountType["SignatoryRecordV1"] = 6] = "SignatoryRecordV1";
    GovernanceAccountType[GovernanceAccountType["VoteRecordV1"] = 7] = "VoteRecordV1";
    GovernanceAccountType[GovernanceAccountType["ProposalInstructionV1"] = 8] = "ProposalInstructionV1";
    GovernanceAccountType[GovernanceAccountType["MintGovernanceV1"] = 9] = "MintGovernanceV1";
    GovernanceAccountType[GovernanceAccountType["TokenGovernanceV1"] = 10] = "TokenGovernanceV1";
    GovernanceAccountType[GovernanceAccountType["RealmConfig"] = 11] = "RealmConfig";
    GovernanceAccountType[GovernanceAccountType["VoteRecordV2"] = 12] = "VoteRecordV2";
    GovernanceAccountType[GovernanceAccountType["ProposalTransactionV2"] = 13] = "ProposalTransactionV2";
    GovernanceAccountType[GovernanceAccountType["ProposalV2"] = 14] = "ProposalV2";
    GovernanceAccountType[GovernanceAccountType["ProgramMetadata"] = 15] = "ProgramMetadata";
    GovernanceAccountType[GovernanceAccountType["RealmV2"] = 16] = "RealmV2";
    GovernanceAccountType[GovernanceAccountType["TokenOwnerRecordV2"] = 17] = "TokenOwnerRecordV2";
    GovernanceAccountType[GovernanceAccountType["GovernanceV2"] = 18] = "GovernanceV2";
    GovernanceAccountType[GovernanceAccountType["ProgramGovernanceV2"] = 19] = "ProgramGovernanceV2";
    GovernanceAccountType[GovernanceAccountType["MintGovernanceV2"] = 20] = "MintGovernanceV2";
    GovernanceAccountType[GovernanceAccountType["TokenGovernanceV2"] = 21] = "TokenGovernanceV2";
    GovernanceAccountType[GovernanceAccountType["SignatoryRecordV2"] = 22] = "SignatoryRecordV2";
})(GovernanceAccountType || (GovernanceAccountType = {}));
export function getAccountTypes(accountClass) {
    switch (accountClass) {
        case Realm:
            return [GovernanceAccountType.RealmV1, GovernanceAccountType.RealmV2];
        case TokenOwnerRecord:
            return [GovernanceAccountType.TokenOwnerRecordV1, GovernanceAccountType.TokenOwnerRecordV2];
        case Proposal:
            return [GovernanceAccountType.ProposalV1, GovernanceAccountType.ProposalV2];
        case SignatoryRecord:
            return [GovernanceAccountType.SignatoryRecordV1, GovernanceAccountType.SignatoryRecordV2];
        case VoteRecord:
            return [GovernanceAccountType.VoteRecordV1, GovernanceAccountType.VoteRecordV2];
        case ProposalTransaction:
            return [GovernanceAccountType.ProposalInstructionV1, GovernanceAccountType.ProposalTransactionV2];
        case RealmConfigAccount:
            return [GovernanceAccountType.RealmConfig];
        case Governance:
            return [
                GovernanceAccountType.GovernanceV1,
                GovernanceAccountType.ProgramGovernanceV1,
                GovernanceAccountType.MintGovernanceV1,
                GovernanceAccountType.TokenGovernanceV1,
                GovernanceAccountType.GovernanceV2,
                GovernanceAccountType.ProgramGovernanceV2,
                GovernanceAccountType.MintGovernanceV2,
                GovernanceAccountType.TokenGovernanceV2
            ];
        case ProgramMetadata:
            return [GovernanceAccountType.ProgramMetadata];
        default:
            throw Error(`${accountClass} account is not supported`);
    }
}
export function getAccountProgramVersion(accountType) {
    switch (accountType) {
        case GovernanceAccountType.VoteRecordV2:
        case GovernanceAccountType.ProposalTransactionV2:
        case GovernanceAccountType.ProposalV2:
            return PROGRAM_VERSION_V2;
        default:
            return PROGRAM_VERSION_V1;
    }
}
export var VoteThresholdPercentageType;
(function (VoteThresholdPercentageType) {
    VoteThresholdPercentageType[VoteThresholdPercentageType["YesVote"] = 0] = "YesVote";
    VoteThresholdPercentageType[VoteThresholdPercentageType["Quorum"] = 1] = "Quorum";
})(VoteThresholdPercentageType || (VoteThresholdPercentageType = {}));
export class VoteThresholdPercentage {
    constructor(args) {
        this.type = VoteThresholdPercentageType.YesVote;
        this.value = args.value;
    }
}
export var VoteTipping;
(function (VoteTipping) {
    VoteTipping[VoteTipping["Strict"] = 0] = "Strict";
    VoteTipping[VoteTipping["Early"] = 1] = "Early";
    VoteTipping[VoteTipping["Disabled"] = 2] = "Disabled";
})(VoteTipping || (VoteTipping = {}));
export var InstructionExecutionStatus;
(function (InstructionExecutionStatus) {
    InstructionExecutionStatus[InstructionExecutionStatus["None"] = 0] = "None";
    InstructionExecutionStatus[InstructionExecutionStatus["Success"] = 1] = "Success";
    InstructionExecutionStatus[InstructionExecutionStatus["Error"] = 2] = "Error";
})(InstructionExecutionStatus || (InstructionExecutionStatus = {}));
export var InstructionExecutionFlags;
(function (InstructionExecutionFlags) {
    InstructionExecutionFlags[InstructionExecutionFlags["None"] = 0] = "None";
    InstructionExecutionFlags[InstructionExecutionFlags["Ordered"] = 1] = "Ordered";
    InstructionExecutionFlags[InstructionExecutionFlags["UseTransaction"] = 2] = "UseTransaction";
})(InstructionExecutionFlags || (InstructionExecutionFlags = {}));
export var MintMaxVoteWeightSourceType;
(function (MintMaxVoteWeightSourceType) {
    MintMaxVoteWeightSourceType[MintMaxVoteWeightSourceType["SupplyFraction"] = 0] = "SupplyFraction";
    MintMaxVoteWeightSourceType[MintMaxVoteWeightSourceType["Absolute"] = 1] = "Absolute";
})(MintMaxVoteWeightSourceType || (MintMaxVoteWeightSourceType = {}));
export class MintMaxVoteWeightSource {
    constructor(args) {
        this.type = MintMaxVoteWeightSourceType.SupplyFraction;
        this.value = args.value;
    }
    get isFullSupply() {
        return (this.type === MintMaxVoteWeightSourceType.SupplyFraction && this.value.cmp(MintMaxVoteWeightSource.SUPPLY_FRACTION_BASE) === 0);
    }
    get supplyFraction() {
        if (this.type !== MintMaxVoteWeightSourceType.SupplyFraction) {
            throw new Error('Max vote weight is not fraction');
        }
        return this.value;
    }
    get fmtSupplyFractionPercentage() {
        return new BigNumber(this.supplyFraction.toString())
            .shiftedBy(-MintMaxVoteWeightSource.SUPPLY_FRACTION_DECIMALS + 2).toFormat();
    }
}
MintMaxVoteWeightSource.SUPPLY_FRACTION_BASE = new BN(10000000000);
MintMaxVoteWeightSource.SUPPLY_FRACTION_DECIMALS = 10;
MintMaxVoteWeightSource.FULL_SUPPLY_FRACTION = new MintMaxVoteWeightSource({ value: MintMaxVoteWeightSource.SUPPLY_FRACTION_BASE });
export var VoteTypeKind;
(function (VoteTypeKind) {
    VoteTypeKind[VoteTypeKind["SingleChoice"] = 0] = "SingleChoice";
    VoteTypeKind[VoteTypeKind["MultiChoice"] = 1] = "MultiChoice";
})(VoteTypeKind || (VoteTypeKind = {}));
export class VoteType {
    constructor(args) {
        this.type = args.type;
        this.choiceCount = args.choiceCount;
    }
    get isSingleChoice() {
        return this.type === VoteTypeKind.SingleChoice;
    }
}
VoteType.SINGLE_CHOICE = new VoteType({
    type: VoteTypeKind.SingleChoice,
    choiceCount: undefined
});
VoteType.MULTI_CHOICE = (choiceCount) => new VoteType({ type: VoteTypeKind.MultiChoice, choiceCount: choiceCount });
export class RealmConfigArgs {
    constructor(args) {
        this.useCouncilMint = args.useCouncilMint;
        this.communityMintMaxVoteWeightSource = args.communityMintMaxVoteWeightSource;
        this.minCommunityTokensToCreateGovernance = args.minCommunityTokensToCreateGovernance;
        this.useCommunityVoterWeightAddin = args.useCommunityVoterWeightAddin;
        this.useMaxCommunityVoterWeightAddin = args.useMaxCommunityVoterWeightAddin;
    }
}
export class RealmConfig {
    constructor(args) {
        this.councilMint = args.councilMint;
        this.communityMintMaxVoteWeightSource =
            args.communityMintMaxVoteWeightSource;
        this.minCommunityTokensToCreateGovernance =
            args.minCommunityTokensToCreateGovernance;
        this.useCommunityVoterWeightAddin = !!args.useCommunityVoterWeightAddin;
        this.useMaxCommunityVoterWeightAddin = !!args.useMaxCommunityVoterWeightAddin;
        this.reserved = args.reserved;
    }
}
export class Realm {
    constructor(args) {
        this.accountType = GovernanceAccountType.RealmV1;
        this.name = args.name;
        this.communityMint = args.communityMint;
        this.config = args.config;
        this.reserved = args.reserved;
        this.votingProposalCount = args.votingProposalCount;
        this.authority = args.authority;
    }
}
export function getTokenHoldingAddress(programId, realm, governingTokenMint) {
    const seeds = [Buffer.from(GOVERNANCE_PROGRAM_SEED), realm.toBuffer(), governingTokenMint.toBuffer()];
    const [tokenHoldingAddress] = PublicKey.findProgramAddressSync(seeds, programId);
    return tokenHoldingAddress;
}
export class RealmConfigAccount {
    constructor(args) {
        this.accountType = GovernanceAccountType.RealmConfig;
        this.realm = args.realm;
        this.communityVoterWeightAddin = args.communityVoterWeightAddin;
        this.maxCommunityVoterWeightAddin = args.maxCommunityVoterWeightAddin;
    }
}
export function getRealmConfigAddress(programId, realm) {
    const [realmConfigAddress] = PublicKey.findProgramAddressSync([Buffer.from('realm-config'), realm.toBuffer()], programId);
    return realmConfigAddress;
}
export class GovernanceConfig {
    constructor(args) {
        var _a, _b;
        this.voteThresholdPercentage = args.voteThresholdPercentage;
        this.minCommunityTokensToCreateProposal =
            args.minCommunityTokensToCreateProposal;
        this.minInstructionHoldUpTime = args.minInstructionHoldUpTime;
        this.maxVotingTime = args.maxVotingTime;
        this.voteTipping = (_a = args.voteTipping) !== null && _a !== void 0 ? _a : VoteTipping.Strict;
        this.proposalCoolOffTime = (_b = args.proposalCoolOffTime) !== null && _b !== void 0 ? _b : 0;
        this.minCouncilTokensToCreateProposal =
            args.minCouncilTokensToCreateProposal;
    }
}
export class Governance {
    constructor(args) {
        this.accountType = args.accountType;
        this.realm = args.realm;
        this.governedAccount = args.governedAccount;
        this.config = args.config;
        this.reserved = args.reserved;
        this.proposalCount = args.proposalCount;
        this.votingProposalCount = args.votingProposalCount;
    }
    isProgramGovernance() {
        return (this.accountType === GovernanceAccountType.ProgramGovernanceV1 ||
            this.accountType === GovernanceAccountType.ProgramGovernanceV2);
    }
    isAccountGovernance() {
        return (this.accountType === GovernanceAccountType.GovernanceV1 ||
            this.accountType === GovernanceAccountType.GovernanceV2);
    }
    isMintGovernance() {
        return (this.accountType === GovernanceAccountType.MintGovernanceV1 ||
            this.accountType === GovernanceAccountType.MintGovernanceV2);
    }
    isTokenGovernance() {
        return (this.accountType === GovernanceAccountType.TokenGovernanceV1 ||
            this.accountType === GovernanceAccountType.TokenGovernanceV2);
    }
}
export class TokenOwnerRecord {
    constructor(args) {
        this.accountType = GovernanceAccountType.TokenOwnerRecordV1;
        this.realm = args.realm;
        this.governingTokenMint = args.governingTokenMint;
        this.governingTokenOwner = args.governingTokenOwner;
        this.governingTokenDepositAmount = args.governingTokenDepositAmount;
        this.unrelinquishedVotesCount = args.unrelinquishedVotesCount;
        this.totalVotesCount = args.totalVotesCount;
        this.outstandingProposalCount = args.outstandingProposalCount;
        this.reserved = args.reserved;
        this.governanceDelegate = args.governanceDelegate;
    }
}
export function getTokenOwnerRecordAddress(programId, realm, governingTokenMint, governingTokenOwner) {
    const seeds = [Buffer.from(GOVERNANCE_PROGRAM_SEED), realm.toBuffer(), governingTokenMint.toBuffer(), governingTokenOwner.toBuffer()];
    const [tokenOwnerRecordAddress] = PublicKey.findProgramAddressSync(seeds, programId);
    return tokenOwnerRecordAddress;
}
export var ProposalState;
(function (ProposalState) {
    ProposalState[ProposalState["Draft"] = 0] = "Draft";
    ProposalState[ProposalState["SigningOff"] = 1] = "SigningOff";
    ProposalState[ProposalState["Voting"] = 2] = "Voting";
    ProposalState[ProposalState["Succeeded"] = 3] = "Succeeded";
    ProposalState[ProposalState["Executing"] = 4] = "Executing";
    ProposalState[ProposalState["Completed"] = 5] = "Completed";
    ProposalState[ProposalState["Cancelled"] = 6] = "Cancelled";
    ProposalState[ProposalState["Defeated"] = 7] = "Defeated";
    ProposalState[ProposalState["ExecutingWithErrors"] = 8] = "ExecutingWithErrors";
})(ProposalState || (ProposalState = {}));
export var OptionVoteResult;
(function (OptionVoteResult) {
    OptionVoteResult[OptionVoteResult["None"] = 0] = "None";
    OptionVoteResult[OptionVoteResult["Succeeded"] = 1] = "Succeeded";
    OptionVoteResult[OptionVoteResult["Defeated"] = 2] = "Defeated";
})(OptionVoteResult || (OptionVoteResult = {}));
export class ProposalOption {
    constructor(args) {
        this.label = args.label;
        this.voteWeight = args.voteWeight;
        this.voteResult = args.voteResult;
        this.instructionsExecutedCount = args.instructionsExecutedCount;
        this.instructionsCount = args.instructionsCount;
        this.instructionsNextIndex = args.instructionsNextIndex;
    }
}
export class Proposal {
    constructor(args) {
        this.accountType = args.accountType;
        this.governance = args.governance;
        this.governingTokenMint = args.governingTokenMint;
        this.state = args.state;
        this.tokenOwnerRecord = args.tokenOwnerRecord;
        this.signatoriesCount = args.signatoriesCount;
        this.signatoriesSignedOffCount = args.signatoriesSignedOffCount;
        this.descriptionLink = args.descriptionLink;
        this.name = args.name;
        // V1
        this.yesVotesCount = args.yesVotesCount;
        this.noVotesCount = args.noVotesCount;
        this.instructionsExecutedCount = args.instructionsExecutedCount;
        this.instructionsCount = args.instructionsCount;
        this.instructionsNextIndex = args.instructionsNextIndex;
        //
        // V2
        this.voteType = args.voteType;
        this.options = args.options;
        this.denyVoteWeight = args.denyVoteWeight;
        this.vetoVoteWeight = args.vetoVoteWeight;
        this.abstainVoteWeight = args.abstainVoteWeight;
        this.startVotingAt = args.startVotingAt;
        this.maxVotingTime = args.maxVotingTime;
        this.draftAt = args.draftAt;
        this.signingOffAt = args.signingOffAt;
        this.votingAt = args.votingAt;
        this.votingAtSlot = args.votingAtSlot;
        this.votingCompletedAt = args.votingCompletedAt;
        this.executingAt = args.executingAt;
        this.closedAt = args.closedAt;
        this.executionFlags = args.executionFlags;
        this.maxVoteWeight = args.maxVoteWeight;
        this.voteThresholdPercentage = args.voteThresholdPercentage;
    }
    /// Returns true if Proposal has not been voted on yet
    get isPreVotingState() {
        return !this.votingAtSlot;
    }
    /// Returns true if Proposal is in state when no voting can happen any longer
    get isVoteFinalized() {
        switch (this.state) {
            case ProposalState.Succeeded:
            case ProposalState.Executing:
            case ProposalState.Completed:
            case ProposalState.Cancelled:
            case ProposalState.Defeated:
            case ProposalState.ExecutingWithErrors:
                return true;
            case ProposalState.Draft:
            case ProposalState.SigningOff:
            case ProposalState.Voting:
                return false;
        }
    }
    get isFinalState() {
        // 1) ExecutingWithErrors is not really a final state, it's undefined.
        //    However it usually indicates none recoverable execution error so we treat is as final for the ui purposes
        // 2) Succeeded with no instructions is also treated as final since it can't transition any longer
        //    It really doesn't make any sense but until it's solved in the program we have to consider it as final in the ui
        switch (this.state) {
            case ProposalState.Completed:
            case ProposalState.Cancelled:
            case ProposalState.Defeated:
            case ProposalState.ExecutingWithErrors:
                return true;
            case ProposalState.Succeeded:
                return this.instructionsCount === 0;
            case ProposalState.Executing:
            case ProposalState.Draft:
            case ProposalState.SigningOff:
            case ProposalState.Voting:
                return false;
        }
    }
    get stateTimestamp() {
        switch (this.state) {
            case ProposalState.Succeeded:
            case ProposalState.Defeated:
                return this.votingCompletedAt ? this.votingCompletedAt.toNumber() : 0;
            case ProposalState.Completed:
            case ProposalState.Cancelled:
                return this.closedAt ? this.closedAt.toNumber() : 0;
            case ProposalState.Executing:
            case ProposalState.ExecutingWithErrors:
                return this.executingAt ? this.executingAt.toNumber() : 0;
            case ProposalState.Draft:
                return this.draftAt.toNumber();
            case ProposalState.SigningOff:
                return this.signingOffAt ? this.signingOffAt.toNumber() : 0;
            case ProposalState.Voting:
                return this.votingAt ? this.votingAt.toNumber() : 0;
        }
        return 0;
    }
    get stateSortRank() {
        // Always show proposals in voting state at the top
        if (this.state === ProposalState.Voting) {
            return 2;
        }
        // Then show proposals in pending state and finalized at the end
        return this.isFinalState ? 0 : 1;
    }
    get yesVoteOption() {
        if (this.options.length !== 1 && !this.voteType.isSingleChoice) {
            throw new Error('Proposal is not Yes/No vote');
        }
        return this.options[0];
    }
    get yesVoteCount() {
        switch (this.accountType) {
            case GovernanceAccountType.ProposalV1:
                return this.yesVotesCount;
            case GovernanceAccountType.ProposalV2:
                return this.yesVoteOption.voteWeight;
        }
        return BN_ZERO;
    }
    get noVoteCount() {
        switch (this.accountType) {
            case GovernanceAccountType.ProposalV1:
                return this.noVotesCount;
            case GovernanceAccountType.ProposalV2:
                return this.denyVoteWeight;
        }
        return BN_ZERO;
    }
    timeToVoteEnd({ config: { maxVotingTime } }) {
        var _a, _b;
        const unixTimestampInSeconds = Date.now() / 1000;
        const votingAt = (_b = (_a = this.votingAt) === null || _a === void 0 ? void 0 : _a.toNumber()) !== null && _b !== void 0 ? _b : 0;
        return this.isPreVotingState ? maxVotingTime : votingAt + maxVotingTime - unixTimestampInSeconds;
    }
    timeToHoldupEnd({ config: { minInstructionHoldUpTime } }, instructions = []) {
        var _a, _b;
        const unixTimestampInSeconds = Date.now() / 1000;
        const votingAt = (_b = (_a = this.votingCompletedAt) === null || _a === void 0 ? void 0 : _a.toNumber()) !== null && _b !== void 0 ? _b : 0;
        const holdUp = instructions.length ? instructions.reduce((a, i) => a > i.holdUpTime ? a : i.holdUpTime, minInstructionHoldUpTime) :
            minInstructionHoldUpTime;
        return this.isPreVotingState ? holdUp : votingAt + holdUp - unixTimestampInSeconds;
    }
    isVotingTime(governance) {
        return this.timeToVoteEnd(governance) > 0;
    }
    canCancel(governance) {
        return [ProposalState.Draft, ProposalState.SigningOff, ProposalState.Voting].includes(this.state) && this.isVotingTime(governance);
    }
    canWalletCancel(governance, tokenOwner, wallet) {
        var _a;
        if (!this.canCancel(governance)) {
            return false;
        }
        return (tokenOwner.governingTokenOwner.equals(wallet) || !!((_a = tokenOwner.governanceDelegate) === null || _a === void 0 ? void 0 : _a.equals(wallet)));
    }
}
export class SignatoryRecord {
    constructor(args) {
        this.accountType = GovernanceAccountType.SignatoryRecordV1;
        this.proposal = args.proposal;
        this.signatory = args.signatory;
        this.signedOff = !!args.signedOff;
    }
}
export function getSignatoryRecordAddress(programId, proposalKey, signatoryKey) {
    const seeds = [Buffer.from(GOVERNANCE_PROGRAM_SEED), proposalKey.toBuffer(), signatoryKey.toBuffer()];
    const [signatoryRecordAddress] = PublicKey.findProgramAddressSync(seeds, programId);
    return signatoryRecordAddress;
}
export class VoteWeight {
    constructor(args) {
        this.yes = args.yes;
        this.no = args.no;
    }
}
export class VoteRecord {
    // -------------------------------
    constructor(args) {
        this.accountType = args.accountType;
        this.proposal = args.proposal;
        this.governingTokenOwner = args.governingTokenOwner;
        this.isRelinquished = !!args.isRelinquished;
        // V1
        this.voteWeight = args.voteWeight;
        // V2 -------------------------------
        this.voterWeight = args.voterWeight;
        this.vote = args.vote;
        // -------------------------------
    }
    get noVoteWeight() {
        var _a, _b;
        switch (this.accountType) {
            case GovernanceAccountType.VoteRecordV1: {
                return (_a = this.voteWeight) === null || _a === void 0 ? void 0 : _a.no;
            }
            case GovernanceAccountType.VoteRecordV2: {
                switch ((_b = this.vote) === null || _b === void 0 ? void 0 : _b.voteType) {
                    case VoteKind.Approve: {
                        return undefined;
                    }
                    case VoteKind.Deny: {
                        return this.voterWeight;
                    }
                    default:
                        throw new Error('Invalid voteKind');
                }
            }
            default:
                throw new Error(`Invalid account type ${this.accountType} `);
        }
    }
    get yesVoteWeight() {
        var _a, _b;
        switch (this.accountType) {
            case GovernanceAccountType.VoteRecordV1: {
                return (_a = this.voteWeight) === null || _a === void 0 ? void 0 : _a.yes;
            }
            case GovernanceAccountType.VoteRecordV2: {
                switch ((_b = this.vote) === null || _b === void 0 ? void 0 : _b.voteType) {
                    case VoteKind.Approve: {
                        return this.voterWeight;
                    }
                    case VoteKind.Deny: {
                        return undefined;
                    }
                    default:
                        throw new Error('Invalid voteKind');
                }
            }
            default:
                throw new Error(`Invalid account type ${this.accountType} `);
        }
    }
}
export function getVoteRecordAddress(programId, proposalKey, tokenOwnerRecordKey) {
    const seeds = [Buffer.from(GOVERNANCE_PROGRAM_SEED), proposalKey.toBuffer(), tokenOwnerRecordKey.toBuffer()];
    const [voteRecordAddress] = PublicKey.findProgramAddressSync(seeds, programId);
    return voteRecordAddress;
}
export class AccountMetaData {
    constructor(args) {
        this.pubkey = args.pubkey;
        this.isSigner = Boolean(args.isSigner);
        this.isWritable = Boolean(args.isWritable);
    }
}
export class InstructionData {
    constructor(args) {
        this.programId = args.programId;
        this.accounts = args.accounts;
        this.data = args.data;
    }
    static transform({ programId, data, keys }) {
        const accounts = keys.map(k => new AccountMetaData(k));
        return new InstructionData({ programId, accounts, data: Buffer.from(data) });
    }
}
export class ProposalTransaction {
    constructor(args) {
        this.accountType = args.accountType;
        this.proposal = args.proposal;
        this.instructionIndex = args.instructionIndex;
        this.optionIndex = args.optionIndex;
        this.holdUpTime = args.holdUpTime;
        this.instruction = args.instruction;
        this.executedAt = args.executedAt;
        this.executionStatus = args.executionStatus;
        this.instructions = args.instructions;
    }
    get instructionFirst() {
        if (this.accountType === GovernanceAccountType.ProposalInstructionV1) {
            return this.instruction;
        }
        if (this.instructions.length === 0) {
            throw new Error(`Transaction has no instructions`);
        }
        if (this.instructions.length > 1) {
            throw new Error(`Transaction has multiple instructions`);
        }
        return this.instructions[0];
    }
    get instructionsList() {
        if (this.accountType === GovernanceAccountType.ProposalInstructionV1) {
            return [this.instruction];
        }
        return this.instructions;
    }
}
export function getProposalTransactionAddress(programId, programVersion, proposal, optionIndex, transactionIndex) {
    const optionIndexBuffer = Buffer.alloc(1);
    optionIndexBuffer.writeUInt8(optionIndex);
    const instructionIndexBuffer = Buffer.alloc(2);
    instructionIndexBuffer.writeInt16LE(transactionIndex, 0);
    const seeds = programVersion === PROGRAM_VERSION_V1 ?
        [Buffer.from(GOVERNANCE_PROGRAM_SEED), proposal.toBuffer(), instructionIndexBuffer] :
        [Buffer.from(GOVERNANCE_PROGRAM_SEED), proposal.toBuffer(), optionIndexBuffer, instructionIndexBuffer];
    const [instructionAddress] = PublicKey.findProgramAddressSync(seeds, programId);
    return instructionAddress;
}
export class ProgramMetadata {
    constructor(args) {
        this.accountType = GovernanceAccountType.ProgramMetadata;
        this.updatedAt = args.updatedAt;
        this.reserved = args.reserved;
        this.version = args.version;
    }
}
export function getProgramMetadataAddress(programId) {
    const [signatoryRecordAddress] = PublicKey.findProgramAddressSync([Buffer.from('metadata')], programId);
    return signatoryRecordAddress;
}
export function getNativeTreasuryAddress(programId, governance) {
    const [signatoryRecordAddress] = PublicKey.findProgramAddressSync([Buffer.from('native-treasury'), governance.toBuffer()], programId);
    return signatoryRecordAddress;
}
export function getGovernanceAccountVersion(accountType) {
    switch (accountType) {
        case GovernanceAccountType.GovernanceV2:
        case GovernanceAccountType.VoteRecordV2:
        case GovernanceAccountType.ProposalTransactionV2:
        case GovernanceAccountType.ProposalV2:
            return ACCOUNT_VERSION_V2;
        default:
            return ACCOUNT_VERSION_V1;
    }
}
export var VoteThresholdType;
(function (VoteThresholdType) {
    // Approval Quorum
    VoteThresholdType[VoteThresholdType["YesVotePercentage"] = 0] = "YesVotePercentage";
    // Not supported in the current version
    VoteThresholdType[VoteThresholdType["QuorumPercentage"] = 1] = "QuorumPercentage";
    // Supported for VERSION >= 3
    VoteThresholdType[VoteThresholdType["Disabled"] = 2] = "Disabled";
})(VoteThresholdType || (VoteThresholdType = {}));
export class VoteThreshold {
    constructor(args) {
        this.type = args.type;
        this.value = args.value;
    }
}
var GoverningTokenType;
(function (GoverningTokenType) {
    GoverningTokenType[GoverningTokenType["Liquid"] = 0] = "Liquid";
    GoverningTokenType[GoverningTokenType["Membership"] = 1] = "Membership";
    GoverningTokenType[GoverningTokenType["Dormant"] = 2] = "Dormant";
})(GoverningTokenType || (GoverningTokenType = {}));
export class GoverningTokenConfigArgs {
    constructor(args) {
        this.useVoterWeightAddin = args.useVoterWeightAddin;
        this.useMaxVoterWeightAddin = args.useMaxVoterWeightAddin;
        this.tokenType = args.tokenType;
    }
}
export class GoverningTokenConfig {
    constructor(args) {
        this.voterWeightAddin = args.voterWeightAddin;
        this.maxVoterWeightAddin = args.maxVoterWeightAddin;
        this.tokenType = args.tokenType;
        this.reserved = args.reserved;
    }
}
export var VestingAccountType;
(function (VestingAccountType) {
    VestingAccountType[VestingAccountType["Unitialized"] = 0] = "Unitialized";
    VestingAccountType[VestingAccountType["VestingRecord"] = 1] = "VestingRecord";
})(VestingAccountType || (VestingAccountType = {}));
export class Vector {
    constructor(args) {
        this.length = args.length;
        this.items = args.items;
        this.data = args.data;
    }
}
export class VestingSchedule {
    constructor(args) {
        this.releaseTime = args.releaseTime;
        this.amount = args.amount;
    }
}
export class VestingRecord {
    constructor(args) {
        this.accountType = args.accountType;
        this.owner = args.owner;
        this.mint = args.mint;
        this.token = args.token;
        this.realm = args.realm;
        this.schedules = args.schedules;
    }
    actualSchedules() {
        return this.schedules.filter(i => i.releaseTime.toNumber() > 0 && i.amount.gt(BN_ZERO));
    }
}
