
// import * as api from "../interface"
// import * as inf from "./internal_interface"

// import { createStreamPreTokenizer } from "./createStreamPreTokenizer";
// import { createTokenizer2 } from "./createTokenizer2";
// import { printTokenizerError } from "./printTokenizerError";

// export function createCreateTokenizer(
//     $x: {
//         onError: ($: {
//             error: inf.TokenizerError
//             range: api.Range
//         }) => void
//     }
// ): inf.CreateTokenizer {
//     return ($p) => {

//         return createStreamPreTokenizer(
//             createTokenizer2(
//                 $p.consumer,
//                 ($) => {
//                     $x.onError({
//                         error: ["tokenizer", $.error],
//                         range: $.range,
//                     })
//                 },
//             ),
//             ($) => {
//                 $x.onError({
//                     error: ["pre", $.error],
//                     range: $.range,
//                 })
//             },
//         )
//     }
// }


// export function createCreateTokenizerWithSerializedError(
//     $i: {
//         onError: (
//             $: {
//                 error: string,
//                 range: api.Range,
//             }
//         ) => void
//     }
// ): inf.CreateTokenizer {
//     return createCreateTokenizer(
//         {
//             onError: ($) => {
//                 $i.onError({
//                     error: `${printTokenizerError($.error)}`,
//                     range: $.range,
//                 })
//             }
//         }
//     )
// }