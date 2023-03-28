import * as pd from 'pareto-core-data'

import { algorithm, constructor, data, dependent, sfunction, } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        // "createBoundPretokenizer": algorithm(functionReference("this", {}, "Pretokenize"), dependent(null, {
        //     "onError": functionReference("this", {}, "OnPretokenError"),
        // }, {

        // })),
        "createPretokenizerCreator": algorithm(constructor("this", {}, "CreatePretokenizer"), {}, dependent(data("this", {}, "PretokenizerConfigurationData"), {
            "convertStringToCharacters": constructor("this", {}, "ConvertStringStreamToCharacterStream"),
            "isEqual": sfunction("bool", {}, "Equal"),
            "add": sfunction("arithmetic", {}, "Add"),
        }, {})),
        "createPretokenErrorMessage": algorithm(sfunction("this", {}, "CreatePretokenErrorMessage")),
        "createTokenizerCreator": algorithm(constructor("this", {}, "CreateTokenizer"), {}, dependent(null, {
            "createStringBuilder": constructor("string", {}, "CreateStringBuilder"),
            "createArrayBuilder": constructor("this", {}, "CreateArrayBuilder"),
        }, {})),
    }),
}