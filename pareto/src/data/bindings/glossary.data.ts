import * as pd from 'pareto-core-data'

import {
    aExternalInterfaceReference,
    constructor, externalTypeReference, imp
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({
        "common": imp({}),
        "main": imp({}),
        "tc": imp({ "Annotation": externalTypeReference("main", "TokenizerAnnotationData") })

    }),
    'root': {
        'namespaces': d({}),
        'types': d({}),
    },
    'asynchronous': {
        'interfaces': d({}),
        'algorithms': d({
            "CreateTokenizer": constructor(aExternalInterfaceReference("common", "StringStream"), {
                "handler": aExternalInterfaceReference("tc", "TokenConsumer"),
            }),
        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },
}