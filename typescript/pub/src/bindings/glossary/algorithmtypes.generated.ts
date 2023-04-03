import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_main from "../../main"
import * as g_position from "../../submodules/position"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace ASYNC {
    
    export namespace I {}
    
    export namespace A {
        
        
        export namespace C {
            export type CreatePreTokenizer = {
                'construct': ($is: {
                    readonly 'handler': g_main.ASYNC.I.PreTokenHandler
                }) => g_common.ASYNC.I.StringStream
            }
        }
        
        
        export namespace C {
            export type CreateTokenizer = {
                'construct': ($is: {
                    readonly 'handler': g_tc.ASYNC.I.TokenConsumer<g_main.T.TokenizerAnnotationData>
                }) => g_common.ASYNC.I.StringStream
            }
        }
    }
}

export namespace SYNC {}