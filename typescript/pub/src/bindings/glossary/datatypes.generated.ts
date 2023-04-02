import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_main from "../../main"
import * as g_position from "../../submodules/position"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace N {}

export namespace T {
    
    export namespace Configuration {
        
        export type location__settings = g_position.T.PositionSettings
        
        export type spaces__per__tab = number
    }
    
    export type Configuration = {
        readonly 'location settings': g_position.T.PositionSettings
        readonly 'spaces per tab': number
    }
}