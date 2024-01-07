"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseVersion = void 0;
function parseVersion(version) {
    const arr = version.split('.');
    const major = parseInt(arr[0]) || 0;
    const minor = parseInt(arr[1]) || 0;
    const patch = parseInt(arr[2]) || 0;
    return { major, minor, patch };
}
exports.parseVersion = parseVersion;
