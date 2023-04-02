import * as pl from 'pareto-core-lib'

import { A } from "../api.generated"

export const $$: A.getCommentCharacter = ($d) => {
    return ($) => {
        return pl.optional(
            $d.getPossibleSymbol($),
            ($) => {
                switch ($[0]) {
                    case 'solidus':
                        return pl.cc($[1], ($) => {
                            return ['solidus', null]
                        })
                    case 'asterisk':
                        return pl.cc($[1], ($) => {
                            return ['asterisk', null]
                        })
                    default: {
                        return ['illegal', null]
                    }
                }
            },
            () => {
                return ['illegal', null]
            }
        )
    }
}