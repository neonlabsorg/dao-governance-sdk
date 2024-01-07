"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructionDataFromBase64 = void 0;
const governance_1 = require("../governance");
const tools_1 = require("../tools");
function instructionDataFromBase64(instructionDataBase64) {
    const instructionDataBin = Buffer.from(instructionDataBase64, 'base64');
    return (0, tools_1.deserializeBorsh)(governance_1.GOVERNANCE_SCHEMA, governance_1.InstructionData, instructionDataBin);
}
exports.instructionDataFromBase64 = instructionDataFromBase64;
