import { TRange } from "./Range.p"

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
