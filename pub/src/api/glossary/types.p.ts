//import * as tc from "glo-astn-tokenconsumer"

export type TLocationInfo = {
    /**
     * position within the document, first character has value 1
     */
    readonly "absolutePosition": number
    readonly "lineLocation": TLineLocation
}

export type TLineLocation = {

    /**
     * first line in document has value 1
     */
     readonly "line": number
     /**
      * first character on a line has value 1
      */
     readonly "character": number
}


export type TTokenizer2Error =
| ["unexpected newline", null]
| ["unexpected snippet", null]
| ["unexpected start of token", null]
| ["unexpected, parser is already in 'none' mode", null]
| ["Unexpected block comment end", null]
| ["Unexpected line comment end", null]
| ["Unexpected nonwrapped string end", null]
| ["Unexpected whitespace end", null]

export type TTokenizerError =
| ["pre", TTokenError]
| ["tokenizer", TTokenizer2Error]

export type TTokenError = {
    readonly "type":
    | ["unterminated block comment", null]
    | ["found dangling slash at the end of the text", null]
    | ["unterminated string", null]
    | ["found dangling slash", null]
    | ["expected hexadecimal digit", {
        readonly "found": string
    }]
    | ["expected special character after escape slash", {
        readonly "found": string
    }]
}

/**
 * A PreToken is a low level token
 */
export type TPreToken = {
    type:
    | ["header start", {
        range: TRange
    }]
    | ["block comment begin", {
        range: TRange
    }]
    | ["block comment end", {
        range: TRange //| null
    }]
    | ["line comment begin", {
        range: TRange
    }]
    | ["line comment end", {
        location: TLocationInfo //| null
    }]
    | ["newline", {
        range: TRange //| null
    }]
    // | ["structural", {
    //     type: sp.StructuralTokenType
    //     range: TRange
    // }]
    // | ["wrapped string begin", {
    //     range: TRange
    //     type: tc.TWrappedStringType
    // }]
    | ["wrapped string end", {
        range: TRange
        wrapper: string | null
    }]
    | ["snippet", {
        chunk: string
        begin: number
        end: number
    }]
    | ["non wrapped string begin", {
        location: TLocationInfo
    }]
    | ["non wrapped string end", {
        location: TLocationInfo //| null
    }]
    | ["whitespace begin", {
        location: TLocationInfo
    }]
    | ["whitespace end", {
        location: TLocationInfo //| null
    }]
}

// export type Comment = {
//     text: string
//     outerRange: g.Range
//     innerRange: g.Range
//     type:
//     | "block"
//     | "line"
//     indent: null | string
// }

// export type BeforeContextData = {
//     comments: Comment[]
// }

// export type ContextData = {
//     before: BeforeContextData
//     lineCommentAfter: null | Comment
// }

export type TTokenizerAnnotationData = {
    readonly "indentation": string
    //tokenString: string | null
    readonly "range": TRange
}

export type TRange = {
    readonly "start": TLocationInfo
    readonly "length": number
    readonly "size": TRangeSize
}

export type TRangeSize =
    | ["single line", {
        "column offset": number
    }]
    | ["multi line", {
        "line offset": number
        "column": number
    }]

