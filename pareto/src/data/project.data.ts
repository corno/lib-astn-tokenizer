import * as pr from 'pareto-core-raw'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pr.wrapRawDictionary

import { $ as api } from "./api.data"

export const $: mproject.T.Project = {
    'author': "Corno",
    'description': "the ASTN Tokenizer",
    'license': "ISC",

    'pubdependencies': d({
        "glo-pareto-common": {},
        "res-pareto-boolean": {},
        "glo-astn-tokenconsumer": {},
    }),
    'type': ['library', {
        'main': {
            'definition': api,
        },
        'submodules': d({
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
            }),
        }
    }],
}