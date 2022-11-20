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
exports.getTests = void 0;
const pl = __importStar(require("pareto-core-lib"));
function getTests(path, rewrite, tuple3, directory, file, createCreateTokenizer, validateFile) {
    function getTests2(path2) {
        return rewrite(directory(path2, (data) => {
            //pr.log(data.path)
            return file([data.path, "in.astn"], (fileData) => {
                const result = [];
                const tok = createCreateTokenizer({
                    onError: ($) => {
                        result.push(["error", $]);
                    }
                })({
                    consumer: {
                        onToken: ($) => {
                            result.push(["token", $]);
                        },
                        onEnd: () => {
                            //result.push(["end", $])
                        }
                    },
                });
                tok.onData(fileData);
                tok.onEnd();
                return validateFile(data.path, "out", "json", JSON.stringify(result, undefined, "\t"));
            });
        }), ($) => {
            return {
                type: ["subset", {
                        elements: $
                    }]
            };
        });
    }
    return tuple3(getTests2([path, "errors"]), getTests2([path, "other"]), getTests2([path, "tokens"]), ($) => {
        return {
            root: {
                elements: pl.createDictionary({
                    "errors": $.first,
                    "other": $.second,
                    "tokens": $.third,
                })
            }
        };
    });
}
exports.getTests = getTests;
