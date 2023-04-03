import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace ASYNC {
    
    export namespace I {
        
        export type PostTokenErrorsHandler = {
            'data': ($: T.PostTokenError, ) => void
            'end': () => void
        }
        
        export type PreTokenErrorsHandler = {
            'data': ($: T.PreTokenError, ) => void
            'end': () => void
        }
        
        export type PreTokenHandler = {
            'data': ($: T.PreToken, ) => void
            'end': ($: T.LocationInfo, ) => void
        }
    }
    
    export namespace A {
        
        
        export namespace C {
            export type CreatePostTokenizer = {
                'construct': ($is: {
                    readonly 'errorHandler': ASYNC.I.PostTokenErrorsHandler
                    readonly 'handler': g_tc.ASYNC.I.TokenConsumer<T.TokenizerAnnotationData>
                }) => ASYNC.I.PreTokenHandler
            }
        }
        
        
        export namespace C {
            export type CreatePreTokenizer = {
                'construct': ($is: {
                    readonly 'errorHandler': ASYNC.I.PreTokenErrorsHandler
                    readonly 'handler': ASYNC.I.PreTokenHandler
                }) => g_common.ASYNC.I.StringStream
            }
        }
    }
}

export namespace SYNC {
    
    export namespace A {
        
        
        export namespace F {
            export type CreatePreTokenErrorMessage = ($: T.PreTokenError) => g_common.T.String
        }
    }
}