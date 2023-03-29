import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_bool from "res-pareto-boolean"
import * as g_common from "glo-pareto-common"
import * as g_string from "res-pareto-string"
import * as g_this from "./glossary"

export namespace D {
    
    
    export type createPretokenizerCreator = {
        readonly 'add': g_arithmetic.SYNC.A.F.Add
        readonly 'convertStringToCharacters': g_this.ASYNC.A.C.ConvertStringStreamToCharacterStream
        readonly 'isEqual': g_bool.SYNC.A.F.Equal
    }
    
    export type createTokenizerCreator = {
        readonly 'createArrayBuilder': g_this.ASYNC.A.C.CreateArrayBuilder
        readonly 'createStringBuilder': g_string.ASYNC.A.C.CreateStringBuilder
    }
}

export namespace A {
    
    export type createPretokenErrorMessage = () => g_this.SYNC.A.F.CreatePretokenErrorMessage
    
    export type createPretokenizerCreator = ($: g_this.T.PretokenizerConfigurationData, $d: D.createPretokenizerCreator, ) => g_this.ASYNC.A.C.CreatePretokenizer
    
    export type createTokenizerCreator = ($d: D.createTokenizerCreator, ) => g_this.ASYNC.A.C.CreateTokenizer
}

export type API = {
    readonly 'createPretokenErrorMessage': A.createPretokenErrorMessage
    readonly 'createPretokenizerCreator': A.createPretokenizerCreator
    readonly 'createTokenizerCreator': A.createTokenizerCreator
}