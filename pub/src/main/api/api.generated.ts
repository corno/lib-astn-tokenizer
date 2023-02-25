import * as pt from 'pareto-core-types'

import * as gglo from "./glossary"

import * as garithmetic from "res-pareto-arithmetic"
import * as gbool from "res-pareto-boolean"
import * as gstring from "res-pareto-string"
import * as gtostring from "res-pareto-tostring"

export type CcreateBoundPretokenizer = ($d: {
    readonly 'onError': gglo.FOnPretokenError
}) => gglo.FPretokenize

export type CcreatePretokenErrorMessage = gglo.FCreatePretokenErrorMessage

export type CcreatePretokenizer = ($: gglo.T.PretokenizerConfigurationData, $d: {
    readonly 'add': garithmetic.FAdd
    readonly 'convertToCharacters': gstring.FToCharacterArray
    readonly 'convertToString': gstring.FFromCharacterArray
    readonly 'increment': gglo.FIncrement
    readonly 'isEqual': gbool.FEqual
    readonly 'onError': gglo.FOnPretokenError
}) => gglo.FPretokenizeCharacters

export type CcreateTokenizer = ($d: {
    readonly 'arrayToString': gtostring.FGetArrayAsString
}) => gglo.FTokenize

export type API = {
    createBoundPretokenizer: CcreateBoundPretokenizer
    createPretokenErrorMessage: CcreatePretokenErrorMessage
    createPretokenizer: CcreatePretokenizer
    createTokenizer: CcreateTokenizer
}