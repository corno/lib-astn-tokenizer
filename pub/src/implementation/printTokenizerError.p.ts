import * as pl from "pareto-core-lib"

import * as inf from "./internal_interface"
import { printTokenizer2Error } from "./createTokenizer2"
import { printTokenError } from "./printTokenError"

export function printTokenizerError($: inf.TokenizerError): string {
    switch ($[0]) {
        case "pre":
            return pl.cc($[1], ($) => {
                return printTokenError($)
            })
        case "tokenizer":
            return pl.cc($[1], ($) => {
                return printTokenizer2Error($)
            })
        default:
            return pl.au($[0])
    }
}