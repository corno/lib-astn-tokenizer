import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_main from "../../main"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace ASYNC {
    
    export namespace I {}
    
    export namespace C {
        
        export type CreateTokenizer = ($is: {
            'handler': g_tc.ASYNC.I.TokenConsumer<g_main.T.TokenizerAnnotationData>
        }) => g_main.ASYNC.I.StringStreamConsumer
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
    
    export namespace F {}
}