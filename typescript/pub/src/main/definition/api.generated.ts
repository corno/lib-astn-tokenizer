import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_bool from "res-pareto-boolean"
import * as g_string from "res-pareto-string"
import * as g_this from "./glossary"
import * as g_tostring from "res-pareto-tostring"

export type createBoundPretokenizer = ($d: {
    readonly 'onError': g_this.F.OnPretokenError
}) => g_this.F.Pretokenize

export type createPretokenErrorMessage = g_this.F.CreatePretokenErrorMessage

export type createPretokenizer = ($: g_this.T.PretokenizerConfigurationData, $d: {
    readonly 'add': g_arithmetic.F.Add
    readonly 'convertToCharacters': g_string.F.ToCharacterArray
    readonly 'convertToString': g_string.F.FromCharacterArray
    readonly 'increment': g_this.F.Increment
    readonly 'isEqual': g_bool.F.Equal
    readonly 'onError': g_this.F.OnPretokenError
}) => g_this.F.PretokenizeCharacters

export type createTokenizer = ($d: {
    readonly 'arrayToString': g_tostring.F.GetArrayAsString
}) => g_this.F.Tokenize

export type API = {
    createBoundPretokenizer: createBoundPretokenizer
    createPretokenErrorMessage: createPretokenErrorMessage
    createPretokenizer: createPretokenizer
    createTokenizer: createTokenizer
}