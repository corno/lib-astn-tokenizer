import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as marithmetic from "res-pareto-arithmetic"
import * as mbool from "res-pareto-boolean"
import * as mstring from "res-pareto-string"
import * as mtostring from "res-pareto-tostring"

export type CcreateBoundPretokenizer = ($d: {
    readonly 'onError': glo.FOnPretokenError
}) => glo.FPretokenize

export type CcreatePretokenErrorMessage = glo.FCreatePretokenErrorMessage

export type CcreatePretokenizer = ($: glo.T.PretokenizerConfigurationData, $d: {
    readonly 'add': marithmetic.FAdd
    readonly 'convertToCharacters': mstring.FToCharacterArray
    readonly 'convertToString': mstring.FFromCharacterArray
    readonly 'increment': glo.FIncrement
    readonly 'isEqual': mbool.FEqual
    readonly 'onError': glo.FOnPretokenError
}) => glo.FPretokenizeCharacters

export type CcreateTokenizer = ($d: {
    readonly 'arrayToString': mtostring.FGetArrayAsString
}) => glo.FTokenize

export type API = {
    createBoundPretokenizer: CcreateBoundPretokenizer
    createPretokenErrorMessage: CcreatePretokenErrorMessage
    createPretokenizer: CcreatePretokenizer
    createTokenizer: CcreateTokenizer
}