import * as pd from 'pareto-core-data'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { external, main, sibling, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import { $ as bindings_api } from "./bindings/api.data"
import { $ as bindings_glossary } from "./bindings/glossary.data"
import { $ as api } from "./main/api.data"
import { $ as glossary } from "./main/glossary.data"

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
        'bindings': [true, {
            'definition': {
                'glossary': {
                    'root': bindings_glossary,
                    'imports': d({
                        "tc": external("glo-astn-tokenconsumer"),
                        "main": main(),
                    }),
                },
                'api': {
                    'root': bindings_api,
                    'imports': d({
                        "this": this_(),
                        "main": ["main", null],
                    }),
                },
            },
            'implementation': ['typescript', null]

        }],
        'executables': d({}),
        'test': {
            'dependencies': d({
            }),
            'definition': {
                'glossary': {
                    'root': {
                        'parameters': d({}),
                        'imports': d({}),
                        'types': d({}),
                        'asynchronous': {
                            'interfaces': d({}),
                            'constructors': d({}),
                            'functions': d({}),
                        },
                        'synchronous': {
                            'interfaces': d({}),
                            'constructors': d({}),
                            'functions': d({}),
                        },
                    },
                    'imports': d({}),
                },
                'api': {
                    'root': {
                        'algorithms': d({}),
                    },
                    'imports': d({}),
                },
            },
            'imports': d({}),
        },
    }],
}