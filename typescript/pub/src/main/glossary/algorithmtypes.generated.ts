import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace ASYNC {
    
    export namespace I {
        
        export type PretokenErrorsHandler = {
            'data': ($: T.PretokenError, ) => void
            'end': () => void
        }
        
        export type PretokenHandler = {
            'data': ($: T.Pretoken, ) => void
            'end': ($: T.LocationInfo, ) => void
        }
        
        export type StringStreamConsumer = {
            'data': ($: g_common.T.String, ) => void
            'end': () => void
        }
        
        export type TokenErrorsHandler = {
            'data': ($: T.TokenError, ) => void
            'end': () => void
        }
    }
    
    export namespace C {
        
        export type CreatePretokenizer = ($is: {
            'errorHandler': I.PretokenErrorsHandler
            'handler': I.PretokenHandler
        }) => I.StringStreamConsumer
        
        export type CreateTokenizer = ($is: {
            'errorHandler': I.TokenErrorsHandler
            'handler': g_tc.ASYNC.I.TokenConsumer<T.TokenizerAnnotationData>
        }) => I.PretokenHandler
    }
    
    export namespace F {}
}

export namespace SYNC {
    
    export namespace I {}
    
    export namespace I2 {}
    
    export namespace I3 {}
    
    export namespace C {}
    
    export namespace C2 {}
    
    export namespace C3 {}
    
    export namespace F {
        
        export type CreatePretokenErrorMessage = ($: T.PretokenError) => g_common.T.String
        
        export type Increment = ($: g_common.T.Number) => g_common.T.Number
    }
}