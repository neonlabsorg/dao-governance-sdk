"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIG_ZERO = exports.BN_ZERO = void 0;
const bn_js_1 = require("bn.js");
const big_js_1 = require("big.js");
exports.BN_ZERO = new bn_js_1.BN(0);
exports.BIG_ZERO = new big_js_1.Big(0);
