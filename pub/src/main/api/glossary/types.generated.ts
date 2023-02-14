import * as pt from 'pareto-core-types'

import * as mcommon from "glo-pareto-common"
import * as mtc from "glo-astn-tokenconsumer"

export namespace T {
    
    export namespace Characters {
        
        export type A = number
    }
    
    export type Characters = pt.Array<number>
    
    export namespace LineLocation {
        
        export type character = number
        
        export type line = number
    }
    
    export type LineLocation = {
        readonly 'character': number
        readonly 'line': number
    }
    
    export namespace LocationInfo {
        
        export type absolutePosition = number
        
        export type lineLocation = T.LineLocation
    }
    
    export type LocationInfo = {
        readonly 'absolutePosition': number
        readonly 'lineLocation': T.LineLocation
    }
    
    export namespace Pretoken {
        
        export type location = T.LocationInfo
        
        export namespace _ltype {
            
            export namespace begin {
                
                export namespace _ltype {
                    
                    export namespace block__comment {}
                    
                    export type block__comment = {}
                    
                    export namespace line__comment {}
                    
                    export type line__comment = {}
                    
                    export namespace non__wrapped__string {}
                    
                    export type non__wrapped__string = {}
                    
                    export namespace whitespace {}
                    
                    export type whitespace = {}
                    
                    export namespace wrapped__string {}
                    
                    export type wrapped__string = {}
                }
                
                export type _ltype = 
                    | ['block comment', {}]
                    | ['line comment', {}]
                    | ['non wrapped string', {}]
                    | ['whitespace', {}]
                    | ['wrapped string', {}]
            }
            
            export type begin = {
                readonly 'type': 
                    | ['block comment', {}]
                    | ['line comment', {}]
                    | ['non wrapped string', {}]
                    | ['whitespace', {}]
                    | ['wrapped string', {}]
            }
            
            export namespace end {}
            
            export type end = {}
            
            export namespace header__start {}
            
            export type header__start = {}
            
            export namespace newline {}
            
            export type newline = {}
            
            export type snippet = mcommon.T.String
            
            export namespace structural {}
            
            export type structural = {}
        }
        
        export type _ltype = 
            | ['begin', {
                readonly 'type': 
                    | ['block comment', {}]
                    | ['line comment', {}]
                    | ['non wrapped string', {}]
                    | ['whitespace', {}]
                    | ['wrapped string', {}]
            }]
            | ['end', {}]
            | ['header start', {}]
            | ['newline', {}]
            | ['snippet', mcommon.T.String]
            | ['structural', {}]
    }
    
    export type Pretoken = {
        readonly 'location': T.LocationInfo
        readonly 'type': 
            | ['begin', {
                readonly 'type': 
                    | ['block comment', {}]
                    | ['line comment', {}]
                    | ['non wrapped string', {}]
                    | ['whitespace', {}]
                    | ['wrapped string', {}]
            }]
            | ['end', {}]
            | ['header start', {}]
            | ['newline', {}]
            | ['snippet', mcommon.T.String]
            | ['structural', {}]
    }
    
    export namespace PretokenError {
        
        export type location = T.LocationInfo
        
        export namespace _ltype {
            
            export namespace found__dangling__slash__at__the__end__of__the__text {}
            
            export type found__dangling__slash__at__the__end__of__the__text = {}
            
            export namespace unterminated__block__comment {}
            
            export type unterminated__block__comment = {}
            
            export namespace unterminated__string {}
            
            export type unterminated__string = {}
        }
        
        export type _ltype = 
            | ['found dangling slash at the end of the text', {}]
            | ['unterminated block comment', {}]
            | ['unterminated string', {}]
    }
    
    export type PretokenError = {
        readonly 'location': T.LocationInfo
        readonly 'type': 
            | ['found dangling slash at the end of the text', {}]
            | ['unterminated block comment', {}]
            | ['unterminated string', {}]
    }
    
    export namespace PretokenizerConfigurationData {
        
        export namespace characters {
            
            export namespace comment {
                
                export type asterisk = number
                
                export type solidus = number
            }
            
            export type comment = {
                readonly 'asterisk': number
                readonly 'solidus': number
            }
            
            export namespace structural {
                
                export type close__angle__bracket = number
                
                export type close__brace = number
                
                export type close__bracket = number
                
                export type close__paren = number
                
                export type colon = number
                
                export type comma = number
                
                export type exclamation__mark = number
                
                export type open__angle__bracket = number
                
                export type open__brace = number
                
                export type open__bracket = number
                
                export type open__paren = number
                
                export type vertical__line = number
            }
            
            export type structural = {
                readonly 'close angle bracket': number
                readonly 'close brace': number
                readonly 'close bracket': number
                readonly 'close paren': number
                readonly 'colon': number
                readonly 'comma': number
                readonly 'exclamation mark': number
                readonly 'open angle bracket': number
                readonly 'open brace': number
                readonly 'open bracket': number
                readonly 'open paren': number
                readonly 'vertical line': number
            }
            
            export namespace unicode {
                
                export type _0 = number
                
                export type _9 = number
                
                export type a = number
                
                export type A = number
                
                export type f = number
                
                export type F = number
            }
            
            export type unicode = {
                readonly '0': number
                readonly '9': number
                readonly 'a': number
                readonly 'A': number
                readonly 'f': number
                readonly 'F': number
            }
            
            export namespace whitespace {
                
                export type carriage__return = number
                
                export type line__feed = number
                
                export type space = number
                
                export type tab = number
            }
            
            export type whitespace = {
                readonly 'carriage return': number
                readonly 'line feed': number
                readonly 'space': number
                readonly 'tab': number
            }
            
            export namespace wrapped__string {
                
                export type apostrophe = number
                
                export type b = number
                
                export type backtick = number
                
                export type f = number
                
                export type n = number
                
                export type question__mark = number
                
                export type r = number
                
                export type reverse__solidus = number
                
                export type solidus = number
                
                export type t = number
                
                export type u = number
            }
            
            export type wrapped__string = {
                readonly 'apostrophe': number
                readonly 'b': number
                readonly 'backtick': number
                readonly 'f': number
                readonly 'n': number
                readonly 'question mark': number
                readonly 'r': number
                readonly 'reverse solidus': number
                readonly 'solidus': number
                readonly 't': number
                readonly 'u': number
            }
        }
        
        export type characters = {
            readonly 'comment': {
                readonly 'asterisk': number
                readonly 'solidus': number
            }
            readonly 'structural': {
                readonly 'close angle bracket': number
                readonly 'close brace': number
                readonly 'close bracket': number
                readonly 'close paren': number
                readonly 'colon': number
                readonly 'comma': number
                readonly 'exclamation mark': number
                readonly 'open angle bracket': number
                readonly 'open brace': number
                readonly 'open bracket': number
                readonly 'open paren': number
                readonly 'vertical line': number
            }
            readonly 'unicode': {
                readonly '0': number
                readonly '9': number
                readonly 'a': number
                readonly 'A': number
                readonly 'f': number
                readonly 'F': number
            }
            readonly 'whitespace': {
                readonly 'carriage return': number
                readonly 'line feed': number
                readonly 'space': number
                readonly 'tab': number
            }
            readonly 'wrapped string': {
                readonly 'apostrophe': number
                readonly 'b': number
                readonly 'backtick': number
                readonly 'f': number
                readonly 'n': number
                readonly 'question mark': number
                readonly 'r': number
                readonly 'reverse solidus': number
                readonly 'solidus': number
                readonly 't': number
                readonly 'u': number
            }
        }
        
        export namespace location {
            
            export type absolutePositionStart = number
            
            export type firstCharacter = number
            
            export type firstLine = number
        }
        
        export type location = {
            readonly 'absolutePositionStart': number
            readonly 'firstCharacter': number
            readonly 'firstLine': number
        }
    }
    
    export type PretokenizerConfigurationData = {
        readonly 'characters': {
            readonly 'comment': {
                readonly 'asterisk': number
                readonly 'solidus': number
            }
            readonly 'structural': {
                readonly 'close angle bracket': number
                readonly 'close brace': number
                readonly 'close bracket': number
                readonly 'close paren': number
                readonly 'colon': number
                readonly 'comma': number
                readonly 'exclamation mark': number
                readonly 'open angle bracket': number
                readonly 'open brace': number
                readonly 'open bracket': number
                readonly 'open paren': number
                readonly 'vertical line': number
            }
            readonly 'unicode': {
                readonly '0': number
                readonly '9': number
                readonly 'a': number
                readonly 'A': number
                readonly 'f': number
                readonly 'F': number
            }
            readonly 'whitespace': {
                readonly 'carriage return': number
                readonly 'line feed': number
                readonly 'space': number
                readonly 'tab': number
            }
            readonly 'wrapped string': {
                readonly 'apostrophe': number
                readonly 'b': number
                readonly 'backtick': number
                readonly 'f': number
                readonly 'n': number
                readonly 'question mark': number
                readonly 'r': number
                readonly 'reverse solidus': number
                readonly 'solidus': number
                readonly 't': number
                readonly 'u': number
            }
        }
        readonly 'location': {
            readonly 'absolutePositionStart': number
            readonly 'firstCharacter': number
            readonly 'firstLine': number
        }
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
    
    export namespace TokenError {}
    
    export type TokenError = {}
    
    export namespace TokenizerAnnotationData {}
    
    export type TokenizerAnnotationData = {}
}