import { SendTransactionError } from '../tools';
export declare const GovernanceError: readonly ["Invalid instruction passed to program", "Realm with the given name and governing mints already exists", "Invalid realm", "Invalid Governing Token Mint", "Governing Token Owner must sign transaction", "Governing Token Owner or Delegate  must sign transaction", "All votes must be relinquished to withdraw governing tokens", "Invalid Token Owner Record account address", "Invalid GoverningMint for TokenOwnerRecord", "Invalid Realm for TokenOwnerRecord", "Invalid Proposal for ProposalTransaction", "Invalid Signatory account address", "Signatory already signed off", "Signatory must sign", "Invalid Proposal Owner", "Invalid Proposal for VoterRecord", "Invalid GoverningTokenOwner for VoteRecord", "Invalid Governance config: Vote threshold percentage out of range", "Proposal for the given Governance, Governing Token Mint and index already exists", "Token Owner already voted on the Proposal", "Owner doesn't have enough governing tokens to create Proposal", "Invalid State: Can't edit Signatories", "Invalid Proposal state", "Invalid State: Can't edit instructions", "Invalid State: Can't execute instruction", "Can't execute instruction within its hold up time", "Instruction already executed", "Invalid Instruction index", "Instruction hold up time is below the min specified by Governance", "Instruction at the given index for the Proposal already exists", "Invalid State: Can't sign off", "Invalid State: Can't vote", "Invalid State: Can't finalize vote", "Invalid State: Can't cancel Proposal", "Vote already relinquished", "Can't finalize vote. Voting still in progress", "Proposal voting time expired", "Invalid Signatory Mint", "Proposal does not belong to the given Governance", "Proposal does not belong to given Governing Mint", "Current mint authority must sign transaction", "Invalid mint authority", "Mint has no authority", "Invalid Token account owner", "Invalid Mint account owner", "Token Account is not initialized", "Token Account doesn't exist", "Token account data is invalid", "Token mint account data is invalid", "Token Mint account is not initialized", "Token Mint account doesn't exist", "Invalid ProgramData account address", "Invalid ProgramData account Data", "Provided upgrade authority doesn't match current program upgrade authority", "Current program upgrade authority must sign transaction", "Given program is not upgradable", "Invalid token owner", "Current token owner must sign transaction", "Given VoteThresholdPercentageType is not supported", "Given VoteWeightSource is not supported", "Proposal cool off time is not supported", "Governance PDA must sign", "Instruction already flagged with error", "Invalid Realm for Governance", "Invalid Authority for Realm", "Realm has no authority", "Realm authority must sign", "Invalid governing token holding account", "Realm council mint change is not supported", "Not supported mint max vote weight source", "Invalid max vote weight supply fraction", "Owner doesn't have enough governing tokens to create Governance", "Too many outstanding proposals", "All proposals must be finalized to withdraw governing tokens", "Invalid VoterWeightRecord for Realm", "Invalid VoterWeightRecord for GoverningTokenMint", "Invalid VoterWeightRecord for TokenOwner", "VoterWeightRecord expired", "Invalid RealmConfig for Realm", "TokenOwnerRecord already exists", "Governing token deposits not allowed", "Invalid vote choice weight percentage", "Vote type not supported", "Invalid proposal options", "Proposal is not not executable", "Invalid vote", "Cannot execute defeated option", "VoterWeightRecord invalid action", "VoterWeightRecord invalid action target", "Invalid MaxVoterWeightRecord for Realm", "MaxVoterWeightRecord expired", "Cannot execute defeated option", "Not supported VoteType", "RealmConfig change not allowed", "GovernanceConfig change not allowed"];
export declare const TokenError: readonly ["Lamport balance below rent-exempt threshold", "Insufficient funds", "Invalid Mint", "Account not associated with this Mint", "Owner does not match", "Fixed supply", "Already in use", "Invalid number of provided signers", "Invalid number of required signers", "State is uninitialized", "Instruction does not support native tokens", "Non-native account can only be closed if its balance is zero", "Invalid instruction", "State is invalid for requested operation", "Operation overflowed", "Account does not support specified authority type", "This token mint cannot freeze accounts", "Account is frozen", "The provided decimals value different from the Mint decimals"];
export declare const GovernanceToolsError: readonly ["Account already initialized", "Account doesn't exist", "Invalid account owner", "Invalid Account type"];
export declare function getTransactionErrorMsg(error: SendTransactionError): string;
