import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_character from "../character"
import * as g_this from "./glossary"

export namespace D {
    
    export type updatePosition = {
        readonly 'incrementWithOne': g_arithmetic.SYNC.A.F.Increment
        readonly 'incrementWithTabSize': g_arithmetic.SYNC.A.F.Increment
        readonly 'isTab': g_character.SYNC.A.F.IsTab
    }
}

export namespace A {
    
    export type updatePosition = ($: g_this.T.PositionSettings, $d: D.updatePosition, ) => g_this.SYNC.A.F.UpdatePosition
}

export type API = {
    readonly 'updatePosition': A.updatePosition
}