import * as pd from 'pareto-core-data'

import { constructor, algorithm, aSideEffect, dependent, data } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({

        "createPreTokenizer": algorithm(constructor("this", {}, "CreatePreTokenizer"), {}, dependent(data("this", {}, "Configuration"), {}, {
            "errorsHandler": aSideEffect("main", {}, "PreTokenErrorsHandler"),
        })),
        "createTokenizer": algorithm(constructor("this", {}, "CreateTokenizer"), {}, dependent(data("this", {}, "Configuration"), {}, {
            "postTokenErrorsHandler": aSideEffect("main", {}, "PostTokenErrorsHandler"),
            "preTokenErrorsHandler": aSideEffect("main", {}, "PreTokenErrorsHandler"),
        })),
    }),
}