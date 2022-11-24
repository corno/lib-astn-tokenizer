
// import * as tapi from "astn-tokenizer-api"
// import * as lib from "../../../lib"

// import * as pa from "pareto-core-types"
// import * as pl from "pareto-core-lib"
// import * as tc from "astn-tokenconsumer-api"

// import * as fsAPI from "pareto-filesystem-api"

// import { Directory, File } from "pareto-handledfilesystem-api"
// import * as ta from "pareto-test-api"
// import * as afAPI from "pareto-async-functions-api"


// export function getTests(
//     path: string,
//     rewrite: afAPI.Rewrite,
//     tuple3: afAPI.Tuple3,
//     directory: Directory,
//     file: File,
//     createCreateTokenizer: lib.CreateCreateTokenizer,
//     validateFile: ta.ValidateFile,
// ): pa.IAsync<ta.TTestResult> {
//     function getTests2(
//         path2: fsAPI.Path,
//     ): pa.IAsync<ta.TTestElement> {
//         return rewrite(
//             directory(
//                 path2,
//                 (data) => {
//                     //pr.log(data.path)
    
//                     return file(
//                         [data.path, "in.astn"],
//                         (fileData) => {
    
//                             type Step =
//                                 | ["token", {
//                                     token: tc.Token, 
//                                     annotation: tapi.TokenizerAnnotationData
//                                 }]
//                                 // | ["end", lib.TokenizerAnnotationData]
//                                 | ["error", {
//                                     error: lib.TokenizerError
//                                     range: tapi.Range
//                                 }]
    
//                             type Result = Step[]
//                             const result: Result = []
//                             const tok = createCreateTokenizer(
//                                 {
//                                     onError: ($) => {
//                                         result.push(["error", $])
//                                     }
//                                 },
//                             )({
//                                 consumer: {
//                                     onToken: ($) => {
//                                         result.push(["token", $])
//                                     },
//                                     onEnd: () => {
//                                         //result.push(["end", $])
//                                     }
//                                 },
//                             })
    
//                             tok.onData(fileData)
//                             tok.onEnd()
//                             return validateFile(
//                                 data.path,
//                                 "out",
//                                 "json",
//                                 JSON.stringify(result, undefined, "\t"),
//                             )
//                         }
//                     )
//                 }
//             ),
//             ($): ta.TTestElement => {
//                 return {
//                     type: ["subset", {
//                         elements: $
//                     }]
//                 }
//             }
//         )
//     }
    
//     return tuple3(
//         getTests2(
//             [path, "errors"],
//         ),
//         getTests2(
//             [path, "other"],
//         ),
//         getTests2(
//             [path, "tokens"],
//         ),
//         ($) => {
//             return {
//                 root: {
//                     elements: pl.createDictionary({
//                         "errors": $.first,
//                         "other": $.second,
//                         "tokens": $.third,
//                     })
//                 }
//             }
//         },
//     )
// }

