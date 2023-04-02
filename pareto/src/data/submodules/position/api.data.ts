import * as pd from 'pareto-core-data'

import { algorithm, constructor, data, dependent, sfunction, } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({

        "updatePosition": algorithm(sfunction("this", {}, "UpdatePosition"), {}, dependent(data("this", {}, "PositionSettings"), {
            "incrementWithTabSize": sfunction("arithmetic", {}, "Increment"),
            "incrementWithOne": sfunction("arithmetic", {}, "Increment"),
            "isTab": sfunction("character", {}, "IsTab"),
        }, {}))
    }),
}