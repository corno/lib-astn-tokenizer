import * as pt from 'pareto-core-types'

import * as g_main from "../main"
import * as g_this from "./glossary"
export namespace A {
    
    export type createTokenizerCreator = ($d: {}, $se: {
        readonly 'preTokenErrorsHandler': g_main.ASYNC.I.PretokenErrorsHandler
        readonly 'tokenErrorsHandler': g_main.ASYNC.I.TokenErrorsHandler
    }) => g_this.ASYNC.C.CreateTokenizer
}

export type API = {
    createTokenizerCreator: A.createTokenizerCreator
}