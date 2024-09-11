import * as pd from 'pareto-core-data'

import {
    aExternalInterfaceReference,
    aInterface,
    aInterfaceMethod,
    aInterfaceReference,
    array, boolean, constructor, data, externalTypeReference, group, imp, member, number, ref, sfunction, streamconsumer, string, taggedUnion, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'glossary parameters': d({}),
    'imports': d({
        "common": imp(),
        "tc": imp()
    }),
    'root': {
        'namespaces': d({}),
        'types': d({
            "LineLocation": type(group({
                //first line in document has value 1
                "line": member(number()),
                //first character on a line has value 1
                "character": member(number()),
            })),
            "LocationInfo": type(group({
                "absolute position": member(number()),
                "line location": member(ref(typeReference("LineLocation"))),
            })),
            "PreToken": type(group({
                "type": member(taggedUnion({
                    "header start": group({
                    }),
                    "begin": group({
                        "type": member(taggedUnion({
                            "block comment": group({
                            }),
                            "line comment": group({
                            }),
                            "wrapped string": group({
                                //"type": member(reference("tc", "WrappedStringType")),
                            }),
                            "non wrapped string": group({
                            }),
                            "whitespace": group({
                            }),
                        })),
                    }),
                    "end": group({}),
                    "newline": group({
                        "type": member(taggedUnion({
                            "lf": group({}),
                            "cr": group({}),
                        })),
                        "is suffix": member(boolean())
                    }),
                    "colon": group({
                    }),
                    "comma": group({
                    }),
                    "structural": group({
                        "type": member(ref(externalTypeReference("tc", "StructuralTokenType"))),
                    }),
                    "snippet": ref(externalTypeReference("common", "String")),
                })),
                "location": member(ref(typeReference("LocationInfo"))),
            })),
            "PreTokenError": type(group({
                "type": member(taggedUnion({
                    "unterminated block comment": group({}),
                    "found dangling slash at the end of the text": group({}),
                    "unterminated string": group({}),
                    "found dangling slash": group({}),
                    // | ["expected hexadecimal digit", {
                    //     readonly "found": string
                    // }]
                    // | ["expected special character after escape slash", {
                    //     readonly "found": string
                    // }]  
                })),
                "location": member(ref(typeReference("LocationInfo"))),
            })),
            "Range": type(group({
                "start": member(ref(typeReference("LocationInfo"))),
                "length": member(number()),
                "size": member(ref(typeReference("RangeSize"))),
            })),
            "RangeSize": type(taggedUnion({
                "singe line": group({
                    "column offset": member(number()),
                }),
                "multiline": group({
                    "line offset": member(number()),
                    "column": member(number()),
                }),
            })),
            "PostTokenError": type(taggedUnion({
                "unexpected pretoken": ref(typeReference("PreToken")),
                "unclosed token": group({
                    "location": member(ref(typeReference("LocationInfo"))),
                }),
            })),
            "NonTokenType": type(taggedUnion({
                "comma": group({}),
                "colon": group({}),
                "block comment": string(),
                "line comment": string(),
                "whitespace": string(),
                "newline": group({}),
            })),
            "NonToken": type(group({
                "range": member(ref(typeReference("Range"))),
                "type": member(ref(typeReference("NonTokenType"))),
            })),
            "TokenizerAnnotationData": type(group({
                "precedingNonTokens": member(array(ref(typeReference("NonToken")))),
                "location": member(ref(typeReference("LocationInfo"))),
            })),
        }),
    },
    'asynchronous': {
        'interfaces': d({
            "PreTokenErrorsHandler": aInterface(streamconsumer(
                aInterfaceMethod(typeReference("PreTokenError")),
                aInterfaceMethod(null),
            )),
            "PreTokenHandler": aInterface(streamconsumer(
                aInterfaceMethod(typeReference("PreToken")),
                aInterfaceMethod(typeReference("LocationInfo")),
            )),
            "PostTokenErrorsHandler": aInterface(streamconsumer(
                aInterfaceMethod(typeReference("PostTokenError")),
                aInterfaceMethod(null),
            )),
        }),
        'algorithms': d({
            "CreatePreTokenizer": constructor(aExternalInterfaceReference("common", "StringStream"), {
                "handler": aInterfaceReference("PreTokenHandler"),
                "errorHandler": aInterfaceReference("PreTokenErrorsHandler")
            }),
            "CreatePostTokenizer": constructor(aInterfaceReference("PreTokenHandler"), {
                "handler": aExternalInterfaceReference("tc", "TokenConsumer", { "Annotation": typeReference("TokenizerAnnotationData") }),
                "errorHandler": aInterfaceReference("PostTokenErrorsHandler")
            }),
        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({
            "CreatePreTokenErrorMessage": sfunction(externalTypeReference("common", "String"), data(typeReference("PreTokenError"))),
        }),
    },
}