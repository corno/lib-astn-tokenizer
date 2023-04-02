import * as pd from 'pareto-core-data'

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"
import { external, sibling, submodule, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

const d = pd.d

export const $: g_project.T.Module<pd.SourceLocation> = {
    'definition': {
        'glossary': {
            'root': glossary,
            'imports': d({
                "common": external("glo-pareto-common"),
            }),
        },
        'api': {
            'root': api,
            'imports': d({
                "arithmetic": external("res-pareto-arithmetic"),
                //"pretokenizer": external("res-astn-pretokenizer"),
                "character": sibling("character"),
                "this": this_(),
            }),
        }
    },
    'implementation': ['typescript', null],
}