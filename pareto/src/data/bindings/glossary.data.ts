import * as pd from 'pareto-core-data'

import {
    aconstructor,
    aInterfaceMethod,
    aInterfaceReference,
    array, data, externalTypeReference, group, imp, member, number, ref, sfunction, stream, string, taggedUnion, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({
        "main": imp({}),
        "tc": imp({ "Annotation": externalTypeReference("main", "TokenizerAnnotationData") })

    }),
    'types': d({}),
    'asynchronous': {
        'interfaces': d({}),
        'constructors': d({
            "CreateTokenizer": aconstructor(aInterfaceReference("main", "StringStreamConsumer"), {
                "handler": aInterfaceReference("tc", "TokenConsumer"),
            }),
        }),
        'functions': d({}),
    },
    'synchronous': {
        'interfaces': d({}),
        'constructors': d({}),
        'functions': d({}),
    },
}