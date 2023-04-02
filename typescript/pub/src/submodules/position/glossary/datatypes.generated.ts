import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"

export namespace N {}

export namespace T {
    
    export namespace Position {
        
        export type absolute = number
        
        export namespace relative {
            
            export type character = number
            
            export type line = number
        }
        
        export type relative = {
            readonly 'character': number
            readonly 'line': number
        }
    }
    
    export type Position = {
        readonly 'absolute': number
        readonly 'relative': {
            readonly 'character': number
            readonly 'line': number
        }
    }
    
    export namespace PositionSettings {
        
        export type absolutePositionStart = number
        
        export type firstCharacter = number
        
        export type firstLine = number
    }
    
    export type PositionSettings = {
        readonly 'absolutePositionStart': number
        readonly 'firstCharacter': number
        readonly 'firstLine': number
    }
    
    export namespace UpdatePositionData {
        
        export namespace character {
            
            export namespace consequetive__newline {}
            
            export type consequetive__newline = null
            
            export namespace initial__newline {}
            
            export type initial__newline = null
            
            export type other = number
        }
        
        export type character = 
            | ['consequetive newline', null]
            | ['initial newline', null]
            | ['other', number]
        
        export type current__position = T.Position
    }
    
    export type UpdatePositionData = {
        readonly 'character': 
            | ['consequetive newline', null]
            | ['initial newline', null]
            | ['other', number]
        readonly 'current position': T.Position
    }
}