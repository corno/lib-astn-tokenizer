import * as pd from 'pareto-core-data'

import {
    aExternalInterfaceReference,
    constructor, externalTypeReference, group, imp, member, number, ref, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({
        "common": imp({}),
        "main": imp({}),
        "position": imp({}),
        "tc": imp({}),

    }),
    'root': {
        'namespaces': d({}),
        'types': d({
            "Configuration": type(group({
                "spaces per tab": member(number()),
                "location settings": member(ref(externalTypeReference("position", "PositionSettings")))
            }))
        }),
    },
    'asynchronous': {
        'interfaces': d({}),
        'algorithms': d({
            "CreatePretokenizer": constructor(aExternalInterfaceReference("common", "StringStream"), {
                "handler": aExternalInterfaceReference("main", "PretokenHandler"),
            }),
            "CreateTokenizer": constructor(aExternalInterfaceReference("common", "StringStream"), {
                "handler": aExternalInterfaceReference("tc", "TokenConsumer", {"Annotation": externalTypeReference("main", "TokenizerAnnotationData")}),
            }),
        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },
}