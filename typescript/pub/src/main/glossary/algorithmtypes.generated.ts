import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace ASYNC {
    
    export namespace I {
        
        export type CharactersHandler = {
            'data': ($: g_common.T.String, ) => void
            'end': () => void
        }
        
        export type PretokenErrorsHandler = {
            'data': ($: T.PretokenError, ) => void
            'end': () => void
        }
        
        export type PretokenHandler = {
            'data': ($: T.Pretoken, ) => void
            'end': ($: T.LocationInfo, ) => void
        }
        
        export type TokenErrorsHandler = {
            'data': ($: T.TokenError, ) => void
            'end': () => void
        }
    }
    
    export namespace A {
        
        
        export namespace C {
            export type ConvertStringStreamToCharacterStream = ($is: {
                readonly 'charactersHandler': ASYNC.I.CharactersHandler
            }) => g_common.ASYNC.I.StringStream
        }
        
        
        export namespace C {
            export type CreatePretokenizer = ($is: {
                readonly 'errorHandler': ASYNC.I.PretokenErrorsHandler
                readonly 'handler': ASYNC.I.PretokenHandler
            }) => g_common.ASYNC.I.StringStream
        }
        
        
        export namespace C {
            export type CreateTokenizer = ($is: {
                readonly 'errorHandler': ASYNC.I.TokenErrorsHandler
                readonly 'handler': g_tc.ASYNC.I.TokenConsumer<T.TokenizerAnnotationData>
            }) => ASYNC.I.PretokenHandler
        }
    }
}

export namespace SYNC {
    
    export namespace A {
        
        
        export namespace F {
            export type CreatePretokenErrorMessage = ($: T.PretokenError) => g_common.T.String
        }
    }
}