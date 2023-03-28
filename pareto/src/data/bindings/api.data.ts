import * as pd from 'pareto-core-data'

import { constructor, algorithm, aSideEffect, dependent } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({

        "createTokenizerCreator": algorithm(constructor("this", {}, "CreateTokenizer"), {}, dependent(null, {}, {
            "tokenErrorsHandler": aSideEffect("main", {}, "TokenErrorsHandler"),
            "preTokenErrorsHandler": aSideEffect("main", {}, "PretokenErrorsHandler"),
        })),
    }),
}