import * as pl from 'pareto-core-lib'

import * as tempinternals from 'pareto-core-internals'

import { A } from "../api.generated"

export const $$: A.getPossibleNewlineCharacter = ($d) => {
    return ($) => {
        return tempinternals.wrapRawOptionalValue(
            $d.getPossibleSymbol($)).map(
                ($) => {
                    switch ($[0]) {
                        // case 'carriage return':
                        //     return pl.cc($[1], ($) => {
                        //         return [true, ['carriage return', null]]
                        //     })
                        // case 'line feed':
                        //     return pl.cc($[1], ($) => {
                        //         return [true, ['line feed', null]]
                        //     })
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