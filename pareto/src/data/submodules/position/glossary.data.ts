import * as pd from 'pareto-core-data'

import {
    aExternalInterfaceReference,
    aInterface,
    aInterfaceMethod,
    aInterfaceReference,
    array, boolean, constructor, data, externalTypeReference, group, imp, member, number, optional, ref, sfunction, streamconsumer, string, taggedUnion, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({
        "common": imp({}),
        "tc": imp({})
    }),
    'root': {
        'namespaces': d({}),
        'types': d({
            "PositionSettings": type(group({
                "absolutePositionStart": member(number()),
                "firstLine": member(number()),
                "firstCharacter": member(number()),
            })),
            "Position": type(group({
                "absolute": member(number()),
                "relative": member(group({
                    "line": member(number()),
                    "character": member(number()),
                })),
            })),
            "UpdatePositionData": type(group({
                "current position": member(ref(typeReference("Position"))),
                "character": member(taggedUnion({
                    "initial newline": group({}),
                    "consequetive newline": group({}),
                    "other": number()
                })),
            }))
        }),
    },
    'asynchronous': {
        'interfaces': d({
        }),
        'algorithms': d({
        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({
            "UpdatePosition": sfunction(typeReference("Position"), data(typeReference("UpdatePositionData"))),
        }),
    },
}