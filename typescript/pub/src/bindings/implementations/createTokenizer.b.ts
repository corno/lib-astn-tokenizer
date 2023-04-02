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

import { $$ as pretok } from "./createPretokenizer.b"

// function splitString($: string): pt.Array<X> {
//     const out: X[] = []
//     for (let i = 0; i !== $.length; i += 1) {
//         out.push({
//             charCode: $.charCodeAt(i)
//         })
//     }
//     return pl.wrapRawArray(out)api
// }

export const $$: A.createTokenizer = ($, $se) => {
    return {
        'construct': ($is) => {

            return pretok(
                $,
                {
                    'errorsHandler': $se.preTokenErrorsHandler,
                }
            ).construct({
                //'errorHandler': $se.preTokenErrorsHandler,
                'handler': a_main.$api.createTokenizer(
                    {
                        'createStringBuilder': a_build.$r.createStringBuilder(""),
                        'createArrayBuilder': a_build.$r.createArrayBuilder(),
                    },
                ).construct({
                    'errorHandler': $se.tokenErrorsHandler,
                    'handler': $is.handler,
                }),
            })
        }
    }
}