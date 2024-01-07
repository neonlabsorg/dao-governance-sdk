import { GOVERNANCE_SCHEMA, InstructionData } from '../governance';
import { deserializeBorsh } from '../tools';
export function instructionDataFromBase64(instructionDataBase64) {
    const instructionDataBin = Buffer.from(instructionDataBase64, 'base64');
    return deserializeBorsh(GOVERNANCE_SCHEMA, InstructionData, instructionDataBin);
}
