import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace N {}

export namespace T {
    
    export namespace LineLocation {
        
        export type character = number
        
        export type line = number
    }
    
    export type LineLocation = {
        readonly 'character': number
        readonly 'line': number
    }
    
    export namespace LocationInfo {
        
        export type absolute__position = number
        
        export type line__location = T.LineLocation
    }
    
    export type LocationInfo = {
        readonly 'absolute position': number
        readonly 'line location': T.LineLocation
    }
    
    export namespace NonToken {
        
        export type range = T.Range
        
        export type _ltype = T.NonTokenType
    }
    
    export type NonToken = {
        readonly 'range': T.Range
        readonly 'type': T.NonTokenType
    }
    
    export namespace NonTokenType {
        
        export type block__comment = string
        
        export namespace colon {}
        
        export type colon = null
        
        export namespace comma {}
        
        export type comma = null
        
        export type line__comment = string
        
        export namespace newline {}
        
        export type newline = null
        
        export type whitespace = string
    }
    
    export type NonTokenType = 
        | ['block comment', string]
        | ['colon', null]
        | ['comma', null]
        | ['line comment', string]
        | ['newline', null]
        | ['whitespace', string]
    
    export namespace PostTokenError {
        
        export namespace unclosed__token {
            
            export type location = T.LocationInfo
        }
        
        export type unclosed__token = {
            readonly 'location': T.LocationInfo
        }
        
        export type unexpected__pretoken = T.PreToken
    }
    
    export type PostTokenError = 
        | ['unclosed token', {
            readonly 'location': T.LocationInfo
        }]
        | ['unexpected pretoken', T.PreToken]
    
    export namespace PreToken {
        
        export type location = T.LocationInfo
        
        export namespace _ltype {
            
            export namespace begin {
                
                export namespace _ltype {
                    
                    export namespace block__comment {}
                    
                    export type block__comment = null
                    
                    export namespace line__comment {}
                    
                    export type line__comment = null
                    
                    export namespace non__wrapped__string {}
                    
                    export type non__wrapped__string = null
                    
                    export namespace whitespace {}
                    
                    export type whitespace = null
                    
                    export namespace wrapped__string {}
                    
                    export type wrapped__string = null
                }
                
                export type _ltype = 
                    | ['block comment', null]
                    | ['line comment', null]
                    | ['non wrapped string', null]
                    | ['whitespace', null]
                    | ['wrapped string', null]
            }
            
            export type begin = {
                readonly 'type': 
                    | ['block comment', null]
                    | ['line comment', null]
                    | ['non wrapped string', null]
                    | ['whitespace', null]
                    | ['wrapped string', null]
            }
            
            export namespace colon {}
            
            export type colon = null
            
            export namespace comma {}
            
            export type comma = null
            
            export namespace end {}
            
            export type end = null
            
            export namespace header__start {}
            
            export type header__start = null
            
            export namespace newline {
                
                export type is__suffix = boolean
                
                export namespace _ltype {
                    
                    export namespace cr {}
                    
                    export type cr = null
                    
                    export namespace lf {}
                    
                    export type lf = null
                }
                
                export type _ltype = 
                    | ['cr', null]
                    | ['lf', null]
            }
            
            export type newline = {
                readonly 'is suffix': boolean
                readonly 'type': 
                    | ['cr', null]
                    | ['lf', null]
            }
            
            export type snippet = g_common.T.String
            
            export namespace structural {
                
                export type _ltype = g_tc.T.StructuralTokenType
            }
            
            export type structural = {
                readonly 'type': g_tc.T.StructuralTokenType
            }
        }
        
        export type _ltype = 
            | ['begin', {
                readonly 'type': 
                    | ['block comment', null]
                    | ['line comment', null]
                    | ['non wrapped string', null]
                    | ['whitespace', null]
                    | ['wrapped string', null]
            }]
            | ['colon', null]
            | ['comma', null]
            | ['end', null]
            | ['header start', null]
            | ['newline', {
                readonly 'is suffix': boolean
                readonly 'type': 
                    | ['cr', null]
                    | ['lf', null]
            }]
            | ['snippet', g_common.T.String]
            | ['structural', {
                readonly 'type': g_tc.T.StructuralTokenType
            }]
    }
    
    export type PreToken = {
        readonly 'location': T.LocationInfo
        readonly 'type': 
            | ['begin', {
                readonly 'type': 
                    | ['block comment', null]
                    | ['line comment', null]
                    | ['non wrapped string', null]
                    | ['whitespace', null]
                    | ['wrapped string', null]
            }]
            | ['colon', null]
            | ['comma', null]
            | ['end', null]
            | ['header start', null]
            | ['newline', {
                readonly 'is suffix': boolean
                readonly 'type': 
                    | ['cr', null]
                    | ['lf', null]
            }]
            | ['snippet', g_common.T.String]
            | ['structural', {
                readonly 'type': g_tc.T.StructuralTokenType
            }]
    }
    
    export namespace PreTokenError {
        
        export type location = T.LocationInfo
        
        export namespace _ltype {
            
            export namespace found__dangling__slash {}
            
            export type found__dangling__slash = null
            
            export namespace found__dangling__slash__at__the__end__of__the__text {}
            
            export type found__dangling__slash__at__the__end__of__the__text = null
            
            export namespace unterminated__block__comment {}
            
            export type unterminated__block__comment = null
            
            export namespace unterminated__string {}
            
            export type unterminated__string = null
        }
        
        export type _ltype = 
            | ['found dangling slash', null]
            | ['found dangling slash at the end of the text', null]
            | ['unterminated block comment', null]
            | ['unterminated string', null]
    }
    
    export type PreTokenError = {
        readonly 'location': T.LocationInfo
        readonly 'type': 
            | ['found dangling slash', null]
            | ['found dangling slash at the end of the text', null]
            | ['unterminated block comment', null]
            | ['unterminated string', null]
    }
    
    export namespace Range {
        
        export type length = number
        
        export type size = T.RangeSize
        
        export type start = T.LocationInfo
    }
    
    export type Range = {
        readonly 'length': number
        readonly 'size': T.RangeSize
        readonly 'start': T.LocationInfo
    }
    
    export namespace RangeSize {
        
        export namespace multiline {
            
            export type column = number
            
            export type line__offset = number
        }
        
        export type multiline = {
            readonly 'column': number
            readonly 'line offset': number
        }
        
        export namespace singe__line {
            
            export type column__offset = number
        }
        
        export type singe__line = {
            readonly 'column offset': number
        }
    }
    
    export type RangeSize = 
        | ['multiline', {
            readonly 'column': number
            readonly 'line offset': number
        }]
        | ['singe line', {
            readonly 'column offset': number
        }]
    
    export namespace TokenizerAnnotationData {
        
        export type location = T.LocationInfo
        
        export namespace precedingNonTokens {
            
            export type A = T.NonToken
        }
        
        export type precedingNonTokens = pt.Array<T.NonToken>
    }
    
    export type TokenizerAnnotationData = {
        readonly 'location': T.LocationInfo
        readonly 'precedingNonTokens': pt.Array<T.NonToken>
    }
}