import * as pd from 'pareto-core-data'

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"
import { external, submodule, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

const d = pd.d

export const $: g_project.T.Module<pd.SourceLocation> = {
    'definition': {
        'glossary': {
            'root': glossary,
            'imports': d({
                "common": external("glo-pareto-common"),
                "tc": external("glo-astn-tokenconsumer"),
            }),
        },
        'api': {
            'root': api,
            'imports': d({
                "build": external("res-pareto-build"),
                "bool": external("res-pareto-boolean"),
                "string": external("res-pareto-string"),
                "pretokenizer": external("res-astn-pretokenizer"),
                "this": this_(),
                "position": submodule("position"),
                "character": submodule("character"),
            }),
        }
    },
    'implementation': ['typescript', null],
}