import * as pd from 'pareto-core-data'

import {
    external,
    main, submodule, tempSubmodule, this_
} from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

const d = pd.d

export const $: g_project.T.ModuleDefinition<pd.SourceLocation> = {
    'glossary': {
        'root': glossary,
        'imports': d({
            "tc": external("glo-astn-tokenconsumer"),
            "main": main(),
            "common": external("glo-pareto-common"),
            "position": tempSubmodule("position"),

        }),
    },
    'api': {
        'root': api,
        'imports': d({
            "this": this_(),
            "position": submodule("position"),
            "main": ["main", null],
        }),
    },
}