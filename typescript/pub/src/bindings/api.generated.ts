import * as pt from 'pareto-core-types'

import * as g_main from "../main"
import * as g_position from "../submodules/position"
import * as g_this from "./glossary"

export namespace D {
    
    
}

export namespace A {
    
    export type createPretokenizer = ($: g_this.T.Configuration, $se: {
        readonly 'errorsHandler': g_main.ASYNC.I.PretokenErrorsHandler
    }) => g_this.ASYNC.A.C.CreatePretokenizer
    
    export type createTokenizer = ($: g_this.T.Configuration, $se: {
        readonly 'preTokenErrorsHandler': g_main.ASYNC.I.PretokenErrorsHandler
        readonly 'tokenErrorsHandler': g_main.ASYNC.I.TokenErrorsHandler
    }) => g_this.ASYNC.A.C.CreateTokenizer
}

export type API = {
    readonly 'createPretokenizer': A.createPretokenizer
    readonly 'createTokenizer': A.createTokenizer
}