import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'

import * as api from "../api"

import * as mbool from "res-pareto-boolean"

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
                'absolutePositionStart': 0,
                'firstCharacter': 1,
                'firstLine': 1,
            },
            'whitespace': {
                'tab': 0x09,               // \t
                'line feed': 0x0A,         // \n
                'carriage return': 0x0D,   // \r
                'space': 0x20,             //
            },
        },
        {
            onError: $d.onError,
            convertToCharacters: y,
            convertToString: y,
            isEqual: mbool.$a.equal,
            increment: ($) => $ +1
        }
    )
}