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
    'glossary parameters': d({}),
    'imports': d({
        "common": imp(),
    }),
    'root': {
        'namespaces': d({}),
        'types': d({
            "CommentCharacter": type(taggedUnion({
                "solidus": group({}),               // /
                "asterisk": group({}),              // *
                "illegal": group({}),

            })),
            "NonWrappedMarkerType": type(taggedUnion({
                "solidus": group({}),               // /

                "quotation mark": group({}),        // "
                "apostrophe": group({}),            // '
                "backtick": group({}),              // `

                "exclamation mark": group({}),      // !
                "vertical line": group({}),         // |
                "comma": group({}),                 // ,
                "colon": group({}),                 // :
                "open brace": group({}),            // {
                "close brace": group({}),           // }
                "open parenthesis": group({}),      // (
                "close parenthesis": group({}),     // )
                "open bracket": group({}),          // [
                "close bracket": group({}),         // ]
                "open angle bracket": group({}),    // <
                "close angle bracket": group({}),   // >

                "whitespace": group({}),
            })),
            "NonWrappedCharacterType": type(taggedUnion({
                "marker": ref(typeReference("NonWrappedMarkerType")),
                "other": group({}),
            })),
            "NewlineCharacter": type(taggedUnion({
                "carriage return": group({}),       // \r
                "line feed": group({}),             // \n

            })),
            "PossibleNewlineCharacter": type(optional(ref(typeReference("NewlineCharacter"))))
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
            "GetNonWrappedCharacterType": sfunction(typeReference("NonWrappedCharacterType"), data(externalTypeReference("common", "Number"))),
            "GetCommentCharacter": sfunction(typeReference("CommentCharacter"), data(externalTypeReference("common", "Number"))),
            "GetPossibleNewlineCharacter": sfunction(typeReference("PossibleNewlineCharacter"), data(externalTypeReference("common", "Number"))),
            "IsTab": sfunction(externalTypeReference("common", "Boolean"), data(externalTypeReference("common", "Number"))),
        }),
    },
}