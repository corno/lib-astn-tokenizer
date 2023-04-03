import * as pt from 'pareto-core-types'

import * as g_main from "../main"
import * as g_position from "../submodules/position"
import * as g_this from "./glossary"

export namespace D {
    
    
}

export namespace A {
    
    export type createPreTokenizer = ($: g_this.T.Configuration, $se: {
        readonly 'errorsHandler': g_main.ASYNC.I.PreTokenErrorsHandler
    }) => g_this.ASYNC.A.C.CreatePreTokenizer
    
    export type createTokenizer = ($: g_this.T.Configuration, $se: {
        readonly 'postTokenErrorsHandler': g_main.ASYNC.I.PostTokenErrorsHandler
        readonly 'preTokenErrorsHandler': g_main.ASYNC.I.PreTokenErrorsHandler
    }) => g_this.ASYNC.A.C.CreateTokenizer
}

export type API = {
    readonly 'createPreTokenizer': A.createPreTokenizer
    readonly 'createTokenizer': A.createTokenizer
}