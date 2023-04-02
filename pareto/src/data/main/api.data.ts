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
        "createPretokenizer": algorithm(constructor("this", {}, "CreatePretokenizer"), {}, dependent(data("position", {}, "Position"), {
            "createStringFromCharactersBuilder": constructor("pretokenizer", {}, "CreateStringFromCharactersBuilder"),
            "createStringSplitter": constructor("pretokenizer", {}, "CreateStringSplitter"),
            "getNonWrappedCharacterType": sfunction("character", {}, "GetNonWrappedCharacterType"),
            "updatePosition": sfunction("position", {}, "UpdatePosition"),
            "getCommentCharacter": sfunction("character", {}, "GetCommentCharacter"),
            "getPossibleNewlineCharacter": sfunction("character", {}, "GetPossibleNewlineCharacter"),
        }, {})),
        "createPretokenErrorMessage": algorithm(sfunction("this", {}, "CreatePretokenErrorMessage")),
        "createTokenizer": algorithm(constructor("this", {}, "CreateTokenizer"), {}, dependent(null, {
            "createStringBuilder": constructor("build", {}, "CreateStringBuilder"),
            "createArrayBuilder": constructor("build", {}, "CreateArrayBuilder"),
        }, {})),
    }),
}