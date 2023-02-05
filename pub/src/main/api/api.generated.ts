import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as mbool from "res-pareto-boolean"

export type CcreateBoundPretokenizer = ($d: {
    readonly 'onError': glo.FOnPretokenError
}) => glo.FPretokenize

export type CcreatePretokenizer = ($: glo.TPretokenizerConfigurationData, $d: {
    readonly 'convertToCharacters': glo.FConvertToCharacters
    readonly 'convertToString': glo.FConvertToString
    readonly 'increment': glo.FIncrement
    readonly 'isEqual': mbool.FEqual
    readonly 'onError': glo.FOnPretokenError
}) => glo.FPretokenizeCharacters

export type CcreateTokenizer = ($d: {
    readonly 'onError': glo.FOnTokenError
}) => glo.FTokenize

export type API = {
    createBoundPretokenizer: CcreateBoundPretokenizer
    createPretokenizer: CcreatePretokenizer
    createTokenizer: CcreateTokenizer
}