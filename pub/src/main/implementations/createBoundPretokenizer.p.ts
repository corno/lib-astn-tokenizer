import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'

import * as api from "../api"

import * as mbool from "res-pareto-boolean"
import * as marith from "res-pareto-arithmetic"
import * as mstring from "res-pareto-string"

import { $$ as pretokenizer } from "./createPretokenizer.p"

// function splitString($: string): pt.Array<X> {
//     const out: X[] = []
//     for (let i = 0; i !== $.length; i += 1) {
//         out.push({
//             charCode: $.charCodeAt(i)
//         })
//     }
//     return pl.wrapRawArray(out)
// }

export const $$: api.CcreateBoundPretokenizer = ($d) => {

    return pretokenizer(
        {
            'location': {
                'spaces per tab': 4,
                'absolutePositionStart': 0,
                'firstCharacter': 1,
                'firstLine': 1,
            },
            'characters': {
                'comment': {
                    'asterisk': 0x2A,            // *
                    'solidus': 0x2F,             // /
                },
                'structural': {
                    'exclamation mark': 0x21,    // !
                    'vertical line': 0x7C,       // |
                    'comma': 0x2C,               // ,
                    'colon': 0x3A,               // :
                    'open brace': 0x7B,          // {
                    'close brace': 0x7D,         // }
                    'open paren': 0x28,          // )
                    'close paren': 0x29,         // )
                    'open bracket': 0x5B,        // [
                    'close bracket': 0x5D,       // ]
                    'open angle bracket': 0x3C,  // <
                    'close angle bracket': 0x3E, // >
                },
                'unicode': {
                    '0': 0x30,
                    '9': 0x39,
                    'A': 0x41,
                    'F': 0x46,
                    'a': 0x61,
                    'f': 0x66,
                },
                'whitespace': {
                    'tab': 0x09,                 // \t
                    'line feed': 0x0A,           // \n
                    'carriage return': 0x0D,     // \r
                    'space': 0x20,               //
                },
                'wrapped string': {
                    'question mark': 0x22,       // ?
                    'apostrophe': 0x27,          // '
                    'backtick': 0x60,            // `
                    'reverse solidus': 0x5C,     // \
                    'solidus': 0x2F,             // /

                    'b': 0x62,                   // b
                    'f': 0x66,                   // f
                    'n': 0x6E,                   // n
                    'r': 0x72,                   // r
                    't': 0x74,                   // t
                    'u': 0x75,                   // u
                },
            },
        },
        {
            onError: $d.onError,
            convertToCharacters: mstring.$a.toCharacterArray,
            convertToString: mstring.$a.fromCharacterArray,
            isEqual: mbool.$a.equal,
            increment: ($) => $ + 1,
            add: marith.$a.add,
        }
    )
}