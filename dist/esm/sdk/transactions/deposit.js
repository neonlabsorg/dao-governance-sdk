import { Transaction } from '@solana/web3.js';
import { getVoterWeightRecordAddress } from '../addins';
import { createVestingAccountInstructions, createVoterWeightRecordByVestingAddinInstruction, depositGoverningTokensInstruction } from '../governance';
import { PROGRAM_VERSION } from '../registry';
export function depositTransaction(realmKey, vestingProgramKey, governingTokenMintKey, payerKey, depositAmount, governingToken, voterWeight, maxVoterWeight, accountRentExempt = 0, programVersion = PROGRAM_VERSION) {
    var _a;
    const transaction = new Transaction();
    const instructions = [];
    const signers = [];
    const voterWeightRecordKey = getVoterWeightRecordAddress(vestingProgramKey, realmKey, governingTokenMintKey, payerKey);
    if (!voterWeight) {
        const instruction = createVoterWeightRecordByVestingAddinInstruction({
            governingTokenMintKey,
            voterWeightRecordKey,
            realmKey,
            walletKey: payerKey,
            payerKey: payerKey,
            vestingProgramKey
        });
        instructions.push(instruction);
    }
    const [vestingAccount, vestingTokenKeypair, vestingInstructions] = createVestingAccountInstructions(vestingProgramKey, governingTokenMintKey, payerKey, accountRentExempt);
    instructions.push(...vestingInstructions);
    signers.push(vestingTokenKeypair);
    instructions.push(depositGoverningTokensInstruction(voterWeightRecordKey, programVersion, realmKey, governingToken.pubkey, governingTokenMintKey, payerKey, payerKey, depositAmount, vestingProgramKey, (_a = voterWeight === null || voterWeight === void 0 ? void 0 : voterWeight.pubkey) !== null && _a !== void 0 ? _a : voterWeightRecordKey, maxVoterWeight === null || maxVoterWeight === void 0 ? void 0 : maxVoterWeight.pubkey, vestingTokenKeypair.publicKey, vestingAccount));
    return [signers, transaction];
}
