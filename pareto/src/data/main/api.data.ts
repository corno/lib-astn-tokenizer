import * as pd from 'pareto-core-data'

import { aconstructor, algorithm, dependent, sfunction, sFunctionReference, typeReference } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        // "createBoundPretokenizer": algorithm(functionReference("this", {}, "Pretokenize"), dependent(null, {
        //     "onError": functionReference("this", {}, "OnPretokenError"),
        // }, {

        // })),
        "createPretokenizerCreator": algorithm(aconstructor("this", {}, "CreatePretokenizer"), dependent(typeReference("this", {}, "PretokenizerConfigurationData"), {
            "convertToCharacters": sFunctionReference("string", {}, "ToCharacterArray"),
            "convertToString": sFunctionReference("string", {}, "FromCharacterArray"),
            "isEqual": sFunctionReference("bool", {}, "Equal"),
            "increment": sFunctionReference("this", {}, "Increment"),
            "add": sFunctionReference("arithmetic", {}, "Add"),
        }, {

        })),
        "createPretokenErrorMessage": algorithm(sfunction("this", {}, "CreatePretokenErrorMessage")),
        "createTokenizerCreator": algorithm(aconstructor("this", {}, "CreateTokenizer"), dependent(null, {
            "arrayToString": sFunctionReference("tostring", {}, "GetArrayAsString"),
        }, {})),
    }),
}