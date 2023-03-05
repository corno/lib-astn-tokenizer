import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace I {
    
    export type OnPretokenError = ($: T.PretokenError, ) => void
    
    export type OnTokenError = ($: T.TokenError, ) => void
    
    export type PretokenConsumer = {
        'data': ($: T.Pretoken, ) => void
        'end': ($: T.LocationInfo, ) => void
    }
}

export namespace B {}

export namespace F {
    
    export type CreatePretokenErrorMessage = ($: T.PretokenError,) => g_common.T.String
    
    export type Increment = ($: g_common.T.Number,) => g_common.T.Number
    
    export type OnPretokenError = ($: T.PretokenError,) => void
}