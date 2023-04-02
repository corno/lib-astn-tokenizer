import * as pd from 'pareto-core-data'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { external, main, sibling, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import { $ as bindings } from "./bindings/moduledefinition.data"
import { $ as main_ } from "./main/module.data"
import { $ as position } from "./submodules/position/module.data"
import { $ as character } from "./submodules/character/module.data"

export const $: mproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "the ASTN Tokenizer",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": null,
        "res-pareto-arithmetic": null,
        "res-pareto-boolean": null,
        // "res-pareto-tostring": null,
        "res-pareto-build": null,
        "res-pareto-string": null,
        "res-astn-pretokenizer": null,
        "glo-astn-tokenconsumer": null,
    }),
    'type': ['library', {
        'main': main_,
        'submodules': d({
            "position": position,
            "character": character,
        }),
        'bindings': [true, {
            'definition': bindings,
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
                        'root': {
                            'namespaces': d({}),
                            'types': d({}),
                        },
                        'asynchronous': {
                            'interfaces': d({}),
                            'algorithms': d({}),
                        },
                        'synchronous': {
                            'interfaces': d({}),
                            'algorithms': d({}),
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