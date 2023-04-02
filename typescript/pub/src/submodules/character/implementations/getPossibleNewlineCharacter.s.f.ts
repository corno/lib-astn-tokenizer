import * as pl from 'pareto-core-lib'

import { A } from "../api.generated"

export const $$: A.getPossibleNewlineCharacter = ($d) => {
    return ($) => {
        return pl.optional(
            $d.getPossibleSymbol($),
            ($) => {
                switch ($[0]) {
                    case 'carriage return':
                        return pl.cc($[1], ($) => {
                            return [true, ['carriage return', null]]
                        })
                    case 'line feed':
                        return pl.cc($[1], ($) => {
                            return [true, ['line feed', null]]
                        })
                    default: {
                        return [false]
                    }
                }
            },
            () => {
                return [false]
            }
        )
    }
}