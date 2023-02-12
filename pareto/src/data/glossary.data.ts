import * as pr from 'pareto-core-raw'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data, interfaceReference, inf, method, number, type
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pr.wrapRawDictionary

export const $: mglossary.T.Glossary<string> = {
    'imports': d({
        "common": "glo-pareto-common",
    }),
    'parameters': d({}),
    'types': d({
        "Characters": type( array(number())),
        "TokenError": type( group({
            // "type": member(taggedUnion({
            //     "unterminated block comment": group({}),
            //     "found dangling slash at the end of the text": group({}),
            //     "unterminated string": group({}),
            //     // | ["found dangling slash", null]
            //     // | ["expected hexadecimal digit", {
            //     //     readonly "found": string
            //     // }]
            //     // | ["expected special character after escape slash", {
            //     //     readonly "found": string
            //     // }]  
            // })),
            // "location": member(reference("LocationInfo")),
        })),
        "PretokenError": type( group({
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
            "location": member(reference("LocationInfo")),
        })),
        "LineLocation": type( group({
            //first line in document has value 1
            "line": member(number()),
            //first character on a line has value 1
            "character": member(number()),
        })),
        "LocationInfo": type( group({
            "absolutePosition": member(number()),
            "lineLocation": member(reference("LineLocation"))
        })),
        "Pretoken": type( group({
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
                    }))
                }),
                "end": group({}),
                "newline": group({
                }),
                "structural": group({
                    //"type": member(reference("tc", "StructuralTokenType")),
                }),
                "snippet": reference("common", "String"),
            })),
            "location": member(reference("LocationInfo"))
        })),
        "PretokenizerConfigurationData": type( group({
            "location": member(group({
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
        "Range": type( group({
            "start": member(reference("LocationInfo")),
            "length": member(number()),
            "size": member(reference("RangeSize")),
        })),
        "RangeSize": type( taggedUnion({
            "singe line": group({
                "column offset": member(number()),
            }),
            "multiline": group({
                "line offset": member(number()),
                "column": member(number()),
            }),
        })),
    }),
    'interfaces': d({
        "StringStreamConsumer": ['group', { //REPLACE BY THE STRINGSTREAMCONSUMER IN GLO-PARETO-COMMON
            'members': d({
                "onData": method(typeReference("common", "String")),
                "onEnd": method(null),
            }),
        }],
        "PretokenHandler": method(typeReference("Pretoken")),
        "TokenHandler": method(typeReference("Token")),//REPLACE BY glo-pareto-tokenconsumer
    }),
    'functions': d({
        "Increment": func(typeReference("common", "Number"), null, null, data(typeReference("common", "Number"), false)),
        "OnPretokenError": func(typeReference("PretokenError"), null, null, null),
        "OnTokenError": func(typeReference("TokenError"), null, null, null),
        "ConvertToCharacters": func(typeReference("common", "String"), null, null, data(typeReference("Characters"), false)),
        "ConvertToString": func(typeReference("Characters"), null, null, data(typeReference("common", "String"), false)),
        "PretokenizeCharacters": func(typeReference("common", "Null"), null, interfaceReference("PretokenHandler"), inf(interfaceReference("StringStreamConsumer"))),
        "Pretokenize": func(typeReference("common", "Null"), null, interfaceReference("PretokenHandler"), inf(interfaceReference("StringStreamConsumer"))),
        "Tokenize": func(typeReference("common", "Null"), null, interfaceReference("TokenHandler"), inf(interfaceReference("PretokenHandler"))),
    }),
}