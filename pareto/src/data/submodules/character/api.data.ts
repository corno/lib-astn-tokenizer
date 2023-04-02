import * as pd from 'pareto-core-data'

import { algorithm, constructor, data, dependent, sfunction, } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        "isTab": algorithm(sfunction("this", {}, "IsTab"), {}, dependent(null, {
            "getPossibleSymbol": sfunction("pretokenizer", {}, "GetPossibleSymbol")
        }, {})),
        "getNonWrappedCharacterType": algorithm(sfunction("this", {}, "GetNonWrappedCharacterType"), {}, dependent(null, {
            "getPossibleSymbol": sfunction("pretokenizer", {}, "GetPossibleSymbol")
        }, {})),
        "getCommentCharacter": algorithm(sfunction("this", {}, "GetCommentCharacter"), {}, dependent(null, {
            "getPossibleSymbol": sfunction("pretokenizer", {}, "GetPossibleSymbol")
        }, {})),
        "getPossibleNewlineCharacter": algorithm(sfunction("this", {}, "GetPossibleNewlineCharacter"), {}, dependent(null, {
            "getPossibleSymbol": sfunction("pretokenizer", {}, "GetPossibleSymbol")
        }, {})),

    }),
}