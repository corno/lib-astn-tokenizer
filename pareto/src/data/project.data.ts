import * as pd from 'pareto-core-data'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { external, sibling, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

export const $: mproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "the ASTN Tokenizer",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": null,
        "res-pareto-arithmetic": null,
        "res-pareto-boolean": null,
        "res-pareto-tostring": null,
        "res-pareto-string": null,
        "glo-astn-tokenconsumer": null,
    }),
    'type': ['library', {
        'main': {
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
                        //"common": "glo-pareto-common",
                        "arithmetic": external("res-pareto-arithmetic"),
                        "bool": external("res-pareto-boolean"),
                        "string": external("res-pareto-string"),
                        "tostring": external("res-pareto-tostring"),
                        "this": this_(),
                    }),
                }
            },
            'implementation': ['typescript', null],
        },
        'submodules': d({
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
            }),
            'glossary': {
                'functions': d({}),
                'parameters': d({}),
                'types': d({}),
                'interfaces': d({}),
            },
            'imports': d({}),
        }
    }],
}