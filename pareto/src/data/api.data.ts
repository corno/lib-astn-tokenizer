import * as pd from 'pareto-core-data'

import { functionReference, constructor, algorithm, typeReference } from "lib-pareto-typescript-project/dist/submodules/api/shorthands"

import * as gapi from "lib-pareto-typescript-project/dist/submodules/api"
const d = pd.d

export const $: gapi.T.API<pd.SourceLocation> = {
    'algorithms': d({
        "createBoundPretokenizer": algorithm(functionReference("this", {}, "Pretokenize"), constructor(null, {
            "onError": functionReference("this", {}, "OnPretokenError"),
        })),
        "createPretokenizer": algorithm(functionReference("this", {}, "PretokenizeCharacters"), constructor(typeReference("this", {}, "PretokenizerConfigurationData"), {
            "onError": functionReference("this", {}, "OnPretokenError"),
            "convertToCharacters": functionReference("string", {}, "ToCharacterArray"),
            "convertToString": functionReference("string", {}, "FromCharacterArray"),
            "isEqual": functionReference("bool", {}, "Equal"),
            "increment": functionReference("this", {}, "Increment"),
            "add": functionReference("arithmetic", {}, "Add"),
        })),
        "createPretokenErrorMessage": algorithm(functionReference("this", {}, "CreatePretokenErrorMessage")),
        "createTokenizer": algorithm(functionReference("this", {}, "Tokenize"), constructor(null, {
            "arrayToString": functionReference("tostring", {}, "GetArrayAsString")
        })),
    })
}