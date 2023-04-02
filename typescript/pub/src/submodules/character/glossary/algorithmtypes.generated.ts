import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"

export namespace ASYNC {
    
    export namespace I {}
    
    export namespace A {}
}

export namespace SYNC {
    
    export namespace A {
        
        
        export namespace F {
            export type GetCommentCharacter = ($: g_common.T.Number) => T.CommentCharacter
        }
        
        
        export namespace F {
            export type GetNonWrappedCharacterType = ($: g_common.T.Number) => T.NonWrappedCharacterType
        }
        
        
        export namespace F {
            export type GetPossibleNewlineCharacter = ($: g_common.T.Number) => T.PossibleNewlineCharacter
        }
        
        
        export namespace F {
            export type IsTab = ($: g_common.T.Number) => g_common.T.Boolean
        }
    }
}