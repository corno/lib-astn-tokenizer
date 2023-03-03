import * as pt from 'pareto-core-types'

import * as garithmetic from "res-pareto-arithmetic"
import * as gbool from "res-pareto-boolean"
import * as gstring from "res-pareto-string"
import * as gthis from "./glossary"
import * as gtostring from "res-pareto-tostring"

export type CcreateBoundPretokenizer = ($d: {
    readonly 'onError': gthis.FOnPretokenError
}) => gthis.FPretokenize

export type CcreatePretokenErrorMessage = gthis.FCreatePretokenErrorMessage

export type CcreatePretokenizer = ($: gthis.T.PretokenizerConfigurationData, $d: {
    readonly 'add': garithmetic.FAdd
    readonly 'convertToCharacters': gstring.FToCharacterArray
    readonly 'convertToString': gstring.FFromCharacterArray
    readonly 'increment': gthis.FIncrement
    readonly 'isEqual': gbool.FEqual
    readonly 'onError': gthis.FOnPretokenError
}) => gthis.FPretokenizeCharacters

export type CcreateTokenizer = ($d: {
    readonly 'arrayToString': gtostring.FGetArrayAsString
}) => gthis.FTokenize

export type API = {
    createBoundPretokenizer: CcreateBoundPretokenizer
    createPretokenErrorMessage: CcreatePretokenErrorMessage
    createPretokenizer: CcreatePretokenizer
    createTokenizer: CcreateTokenizer
}