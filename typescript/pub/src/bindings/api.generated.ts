import * as pt from 'pareto-core-types'

import * as g_main from "../main"
import * as g_this from "./glossary"

export namespace D {
    
}

export namespace A {
    
    export type createTokenizerCreator = ($se: {
        readonly 'preTokenErrorsHandler': g_main.ASYNC.I.PretokenErrorsHandler
        readonly 'tokenErrorsHandler': g_main.ASYNC.I.TokenErrorsHandler
    }) => g_this.ASYNC.A.C.CreateTokenizer
}

export type API = {
    readonly 'createTokenizerCreator': A.createTokenizerCreator
}