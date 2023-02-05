import * as pt from 'pareto-core-types'

import * as mcommon from "glo-pareto-common"

export namespace GCharacters {}
export type GCharacters = pt.Array<number>
export type UCharacters = GCharacters

export namespace GLineLocation {}
export type GLineLocation = {
    readonly 'character': number
    readonly 'line': number
}
export type ULineLocation = GLineLocation

export namespace GLocationInfo {}
export type GLocationInfo = {
    readonly 'absolutePosition': number
    readonly 'lineLocation': ULineLocation
}
export type ULocationInfo = GLocationInfo

export namespace GPretoken {
    
    export namespace Ptype {
        
        export namespace Obegin {
            
            export namespace Ptype {
                
                export namespace Oblock__comment {}
                export type Oblock__comment = {}
                
                export namespace Oline__comment {}
                export type Oline__comment = {}
                
                export namespace Onon__wrapped__string {}
                export type Onon__wrapped__string = {}
                
                export namespace Owhitespace {}
                export type Owhitespace = {}
                
                export namespace Owrapped__string {}
                export type Owrapped__string = {}
            }
            export type Ptype = 
                | ['block comment', Ptype.Oblock__comment]
                | ['line comment', Ptype.Oline__comment]
                | ['non wrapped string', Ptype.Onon__wrapped__string]
                | ['whitespace', Ptype.Owhitespace]
                | ['wrapped string', Ptype.Owrapped__string]
        }
        export type Obegin = {
            readonly 'type': Obegin.Ptype
        }
        
        export namespace Oend {}
        export type Oend = {}
        
        export namespace Oheader__start {}
        export type Oheader__start = {}
        
        export namespace Onewline {}
        export type Onewline = {}
        
        export namespace Ostructural {}
        export type Ostructural = {}
    }
    export type Ptype = 
        | ['begin', Ptype.Obegin]
        | ['end', Ptype.Oend]
        | ['header start', Ptype.Oheader__start]
        | ['newline', Ptype.Onewline]
        | ['snippet', mcommon.TString]
        | ['structural', Ptype.Ostructural]
}
export type GPretoken = {
    readonly 'location': ULocationInfo
    readonly 'type': GPretoken.Ptype
}
export type UPretoken = GPretoken

export namespace GPretokenError {
    
    export namespace Ptype {
        
        export namespace Ofound__dangling__slash__at__the__end__of__the__text {}
        export type Ofound__dangling__slash__at__the__end__of__the__text = {}
        
        export namespace Ounterminated__block__comment {}
        export type Ounterminated__block__comment = {}
        
        export namespace Ounterminated__string {}
        export type Ounterminated__string = {}
    }
    export type Ptype = 
        | ['found dangling slash at the end of the text', Ptype.Ofound__dangling__slash__at__the__end__of__the__text]
        | ['unterminated block comment', Ptype.Ounterminated__block__comment]
        | ['unterminated string', Ptype.Ounterminated__string]
}
export type GPretokenError = {
    readonly 'location': ULocationInfo
    readonly 'type': GPretokenError.Ptype
}
export type UPretokenError = GPretokenError

export namespace GPretokenizerConfigurationData {
    
    export namespace Pcharacters {
        
        export namespace Pcomment {}
        export type Pcomment = {
            readonly 'asterisk': number
            readonly 'solidus': number
        }
        
        export namespace Pstructural {}
        export type Pstructural = {
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
        
        export namespace Punicode {}
        export type Punicode = {
            readonly '0': number
            readonly '9': number
            readonly 'a': number
            readonly 'A': number
            readonly 'f': number
            readonly 'F': number
        }
        
        export namespace Pwhitespace {}
        export type Pwhitespace = {
            readonly 'carriage return': number
            readonly 'line feed': number
            readonly 'space': number
            readonly 'tab': number
        }
        
        export namespace Pwrapped__string {}
        export type Pwrapped__string = {
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
    export type Pcharacters = {
        readonly 'comment': Pcharacters.Pcomment
        readonly 'structural': Pcharacters.Pstructural
        readonly 'unicode': Pcharacters.Punicode
        readonly 'whitespace': Pcharacters.Pwhitespace
        readonly 'wrapped string': Pcharacters.Pwrapped__string
    }
    
    export namespace Plocation {}
    export type Plocation = {
        readonly 'absolutePositionStart': number
        readonly 'firstCharacter': number
        readonly 'firstLine': number
    }
}
export type GPretokenizerConfigurationData = {
    readonly 'characters': GPretokenizerConfigurationData.Pcharacters
    readonly 'location': GPretokenizerConfigurationData.Plocation
}
export type UPretokenizerConfigurationData = GPretokenizerConfigurationData

export namespace GRange {}
export type GRange = {
    readonly 'length': number
    readonly 'size': URangeSize
    readonly 'start': ULocationInfo
}
export type URange = GRange

export namespace GRangeSize {
    
    export namespace Omultiline {}
    export type Omultiline = {
        readonly 'column': number
        readonly 'line offset': number
    }
    
    export namespace Osinge__line {}
    export type Osinge__line = {
        readonly 'column offset': number
    }
}
export type GRangeSize = 
    | ['multiline', GRangeSize.Omultiline]
    | ['singe line', GRangeSize.Osinge__line]
export type URangeSize = GRangeSize

export namespace GToken {
    
    export namespace OFoo {}
    export type OFoo = {}
}
export type GToken = 
    | ['Foo', GToken.OFoo]
export type UToken = GToken

export namespace GTokenError {}
export type GTokenError = {}
export type UTokenError = GTokenError