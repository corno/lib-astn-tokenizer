import * as pd from 'pareto-core-data'

import {
    aExternalInterfaceReference,
    aInterface,
    aInterfaceMethod,
    aInterfaceReference,
    array, constructor, data, externalTypeReference, group, imp, member, number, ref, sfunction, streamconsumer, string, taggedUnion, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({
        "common": imp({}),
        "tc": imp({ "Annotation": typeReference("TokenizerAnnotationData") })
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
                "absolutePosition": member(number()),
                "lineLocation": member(ref(typeReference("LineLocation"))),
            })),
            "Pretoken": type(group({
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
                    }),
                    "structural": group({
                        "type": member(ref(externalTypeReference("tc", "StructuralTokenType"))),
                    }),
                    "snippet": ref(externalTypeReference("common", "String")),
                })),
                "location": member(ref(typeReference("LocationInfo"))),
            })),
            "PretokenError": type(group({
                "type": member(taggedUnion({
                    "unterminated block comment": group({}),
                    "found dangling slash at the end of the text": group({}),
                    "unterminated string": group({}),
                    // | ["found dangling slash", null]
                    // | ["expected hexadecimal digit", {
                    //     readonly "found": string
                    // }]
                    // | ["expected special character after escape slash", {
                    //     readonly "found": string
                    // }]  
                })),
                "location": member(ref(typeReference("LocationInfo"))),
            })),
            "PretokenizerConfigurationData": type(group({
                "location": member(group({
                    "spaces per tab": member(number()),
                    "absolutePositionStart": member(number()),
                    "firstLine": member(number()),
                    "firstCharacter": member(number()),
                })),
                "characters": member(group({
                    "whitespace": member(group({
                        "carriage return": member(number()),
                        "line feed": member(number()),
                        "space": member(number()),
                        "tab": member(number()),

                    })),
                    "comment": member(group({
                        "solidus": member(number()),
                        "asterisk": member(number()),
                    })),
                    "wrapped string": member(group({
                        "question mark": member(number()),
                        "apostrophe": member(number()),
                        "backtick": member(number()),
                        "reverse solidus": member(number()),
                        "solidus": member(number()),
                        "b": member(number()),
                        "f": member(number()),
                        "n": member(number()),
                        "r": member(number()),
                        "t": member(number()),
                        "u": member(number()),
                    })),
                    "structural": member(group({
                        "exclamation mark": member(number()),
                        "vertical line": member(number()),
                        "comma": member(number()),
                        "colon": member(number()),
                        "open brace": member(number()),
                        "close brace": member(number()),
                        "open paren": member(number()),
                        "close paren": member(number()),
                        "open bracket": member(number()),
                        "close bracket": member(number()),
                        "open angle bracket": member(number()),
                        "close angle bracket": member(number()),
                    })),
                    "unicode": member(group({
                        "0": member(number()),
                        "9": member(number()),
                        "A": member(number()),
                        "F": member(number()),
                        "a": member(number()),
                        "f": member(number()),
                    })),
                })),

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
            "TokenError": type(group({
                "type": member(taggedUnion({
                    "unexpected pretoken": group({

                    }),
                    "unclosed token": group({

                    }),
                })),
                "location": member(ref(typeReference("LocationInfo"))),
            })),
            "NonToken": type(taggedUnion({
                "block comment": string(),
                "line comment": string(),
                "whitespace": string(),
                "newline": group({}),
            })),
            "TokenizerAnnotationData": type(group({
                "nonTokens": member(array(ref(typeReference("NonToken")))),
            })),
        }),
    },
    // 'builders': d({
    // }),
    // 'interfaces': d({
    //     "OnTokenError": interfaceMethod(typeReference("TokenError")),
    //     "OnPretokenError": interfaceMethod(typeReference("PretokenError")),
    //     "PretokenConsumer": stream(
    //         interfaceMethod(typeReference("Pretoken")),
    //         interfaceMethod(typeReference("LocationInfo")),
    //     ),
    //     // "PretokenizerHandler": ['group', {
    //     //     'members': d({
    //     //         "handler": ['reference', interfaceReference("PretokenConsumer")],
    //     //         "onError": ['reference', interfaceReference("OnPretokenError")],
    //     //     }),
    //     // }],
    //     //"TokenHandler": interfaceMethod(parametrizedTypeReference("tc", { "Annotation": typeReference("TokenizerAnnotationData")}, "Token")),//REPLACE BY glo-pareto-tokenconsumer
    //     // "TokenizerHandler": ['group', {
    //     //     'members': d({
    //     //         "handler": ['reference', parametrizedInterfaceReference("tc", { "Annotation": typeReference("TokenizerAnnotationData") }, "TokenConsumer")],
    //     //         "onError": ['reference', interfaceReference("OnTokenError")],
    //     //     }),
    //     // }],


    // }),
    // 'functions': d({
    //     // "PretokenizeCharacters": func(typeReference("common", "Null"), null, interfaceReference("PretokenizerHandler"), inf(interfaceReference("common", "StringStream"))),
    //     // "Pretokenize": func(typeReference("common", "Null"), null, interfaceReference("PretokenizerHandler"), inf(interfaceReference("common", "StringStream"))),
    //     // "Tokenize": func(typeReference("common", "Null"), null, interfaceReference("TokenizerHandler"), inf(interfaceReference("PretokenConsumer"))),
    // }),
    'asynchronous': {
        'interfaces': d({
            "CharactersHandler": aInterface(streamconsumer(
                aInterfaceMethod(externalTypeReference("common", "String")),
                aInterfaceMethod(null),
            )),
            "PretokenErrorsHandler": aInterface(streamconsumer(
                aInterfaceMethod(typeReference("PretokenError")),
                aInterfaceMethod(null),
            )),
            "PretokenHandler": aInterface(streamconsumer(
                aInterfaceMethod(typeReference("Pretoken")),
                aInterfaceMethod(typeReference("LocationInfo")),
            )),
            "TokenErrorsHandler": aInterface(streamconsumer(
                aInterfaceMethod(typeReference("TokenError")),
                aInterfaceMethod(null),
            )),
        }),
        'algorithms': d({
            // "CreateArrayBuilder": constructor(aInterfaceReference("ElementConsumer"), {
            //     "handler": aInterfaceReference("ArrayConsumer"),
            // }),
            "CreatePretokenizer": constructor(aExternalInterfaceReference("common", "StringStream"), {
                "handler": aInterfaceReference("PretokenHandler"),
                "errorHandler": aInterfaceReference("PretokenErrorsHandler")
            }),
            "CreateTokenizer": constructor(aInterfaceReference("PretokenHandler"), {
                "handler": aExternalInterfaceReference("tc", "TokenConsumer"),
                "errorHandler": aInterfaceReference("TokenErrorsHandler")
            }),
            "ConvertStringStreamToCharacterStream": constructor(aExternalInterfaceReference("common", "StringStream"), {
                "charactersHandler": aInterfaceReference("CharactersHandler")
            })
        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({
            "CreatePretokenErrorMessage": sfunction(externalTypeReference("common", "String"), data(typeReference("PretokenError"))),
        }),
    },
}