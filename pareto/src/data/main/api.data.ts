import * as pd from 'pareto-core-data'

import { algorithm, constructor, data, dependent, sfunction, } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        // "createBoundPreTokenizer": algorithm(functionReference("this", {}, "PreTokenize"), dependent(null, {
        //     "onError": functionReference("this", {}, "OnPreTokenError"),
        // }, {

        // })),
        "createPreTokenizer": algorithm(constructor("this", {}, "CreatePreTokenizer"), {}, dependent(data("position", {}, "Position"), {
            "createStringFromCharactersBuilder": constructor("pretokenizer", {}, "CreateStringFromCharactersBuilder"),
            "createStringSplitter": constructor("pretokenizer", {}, "CreateStringSplitter"),
            "getNonWrappedCharacterType": sfunction("character", {}, "GetNonWrappedCharacterType"),
            "updatePosition": sfunction("position", {}, "UpdatePosition"),
            "getCommentCharacter": sfunction("character", {}, "GetCommentCharacter"),
            "getPossibleNewlineCharacter": sfunction("character", {}, "GetPossibleNewlineCharacter"),
        }, {})),
        "createPreTokenErrorMessage": algorithm(sfunction("this", {}, "CreatePreTokenErrorMessage")),
        "createPostTokenizer": algorithm(constructor("this", {}, "CreatePostTokenizer"), {}, dependent(null, {
            "createStringBuilder": constructor("build", {}, "CreateStringBuilder"),
            "createArrayBuilder": constructor("build", {}, "CreateArrayBuilder"),
        }, {})),
    }),
}