import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_bool from "res-pareto-boolean"
import * as g_string from "res-pareto-string"
import * as g_this from "./glossary"
import * as g_tostring from "res-pareto-tostring"
export namespace A {
    
    export type createPretokenErrorMessage = g_this.SYNC.F.CreatePretokenErrorMessage
    
    export type createPretokenizerCreator = ($: g_this.T.PretokenizerConfigurationData, $d: {
        readonly 'add': g_arithmetic.SYNC.F.Add
        readonly 'convertToCharacters': g_string.SYNC.F.ToCharacterArray
        readonly 'convertToString': g_string.SYNC.F.FromCharacterArray
        readonly 'increment': g_this.SYNC.F.Increment
        readonly 'isEqual': g_bool.SYNC.F.Equal
    }, $se: {}) => g_this.ASYNC.C.CreatePretokenizer
    
    export type createTokenizerCreator = ($d: {
        readonly 'arrayToString': g_tostring.SYNC.F.GetArrayAsString
    }, $se: {}) => g_this.ASYNC.C.CreateTokenizer
}

export type API = {
    createPretokenErrorMessage: A.createPretokenErrorMessage
    createPretokenizerCreator: A.createPretokenizerCreator
    createTokenizerCreator: A.createTokenizerCreator
}