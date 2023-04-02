import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'

import { A } from "../api.generated"

import * as a_bool from "res-pareto-boolean"
import * as a_arith from "res-pareto-arithmetic"
import * as a_string from "res-pareto-string"
import * as a_build from "res-pareto-build"
import * as a_position from "../../submodules/position"
import * as a_pretokenizer from "res-astn-pretokenizer"
import * as a_character from "../../submodules/character"

import * as a_main from "../../main/implementation.generated"

// function splitString($: string): pt.Array<X> {
//     const out: X[] = []
//     for (let i = 0; i !== $.length; i += 1) {
//         out.push({
//             charCode: $.charCodeAt(i)
//         })
//     }
//     return pl.wrapRawArray(out)api
// }

export const $$: A.createPretokenizer = ($, $se) => {
    return {
        'construct': ($is) => {
            return a_main.$api.createPretokenizer(
                {
                    'absolute': $['location settings'].absolutePositionStart,
                    'relative': {
                        'character': $['location settings'].firstCharacter,
                        'line': $['location settings'].firstLine,
                    },
                },
                {
                    // onError: $d.onError,
                    'createStringFromCharactersBuilder': a_pretokenizer.$r.createStringFromCharactersBuilder(),
                    'createStringSplitter': a_pretokenizer.$r.createStringSplitter(),
                    'getNonWrappedCharacterType': a_character.$a.getNonWrappedCharacterType({
                        'getPossibleSymbol': a_pretokenizer.$r.getPossibleSymbol()
                    }),
                    // 'isAsterisk': a_pretokenizer.$r.isAsterisk(),
                    'getCommentCharacter': a_character.$a.getCommentCharacter({
                        'getPossibleSymbol': a_pretokenizer.$r.getPossibleSymbol()
                    }),
                    'getPossibleNewlineCharacter': a_character.$a.getPossibleNewlineCharacter({
                        'getPossibleSymbol': a_pretokenizer.$r.getPossibleSymbol()
                    }),
                    'updatePosition': a_position.$a.updatePosition($['location settings'], {
                        'incrementWithOne': a_arith.$r.increment({
                            'stepsize': 1,
                        }),
                        'incrementWithTabSize': a_arith.$r.increment({
                            'stepsize': $['spaces per tab'],
                        }),
                        'isTab': a_character.$a.isTab({
                            'getPossibleSymbol': a_pretokenizer.$r.getPossibleSymbol()
                        }),
                    })
                },
            ).construct({
                'errorHandler': $se.errorsHandler,
                'handler': $is.handler,
            })
        }
    }
}