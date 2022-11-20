"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib = __importStar(require("../../../../lib"));
const pb = __importStar(require("pareto-core-exe"));
const fslib = __importStar(require("pareto-filesystem-res"));
const testlib = __importStar(require("pareto-test-lib"));
const diffLib = __importStar(require("pareto-diff-lib"));
const asyncLib = __importStar(require("pareto-async-functions-lib"));
const getTests_1 = require("../../imp/getTests");
pb.runProgram(($) => {
    if ($.argument === undefined) {
        throw new Error("missing path");
    }
    const path = $.argument;
    const async = asyncLib.init();
    const diff = diffLib.init();
    const tokLib = lib.init();
    const fs = fslib.init();
    const hfs = fs.createHandledFilesystem(($) => {
        throw new Error("IMPLEMENT ME!");
    });
    (0, getTests_1.getTests)(path, async.rewrite, async.tuple3, hfs.directory, hfs.file, tokLib.createCreateTokenizer, testlib.init(fs, diff, async).validateFile).execute(($ => {
        testlib.init(fs, diff, async).serializeTestResult({
            testResult: $,
            showSummary: true,
        }, (str) => {
            const out = pb.createStdOut();
            out.write(str);
            out.write(`\n`);
        });
    }));
});
