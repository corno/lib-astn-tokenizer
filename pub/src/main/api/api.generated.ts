import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as mbool from "res-pareto-boolean"

export type CcreateBoundPretokenizer = ($d: {
    readonly 'onError': glo.FOnError
}) => glo.FPretokenize

export type CcreatePretokenizer = ($: glo.TPretokenizerConfigurationData, $d: {
    readonly 'convertToCharacters': glo.FConvertToCharacters
    readonly 'convertToString': glo.FConvertToString
    readonly 'increment': glo.FIncrement
    readonly 'isEqual': mbool.FEqual
    readonly 'onError': glo.FOnError
}) => glo.FPretokenizeCharacters

export type API = {
    createBoundPretokenizer: CcreateBoundPretokenizer
    createPretokenizer: CcreatePretokenizer
}