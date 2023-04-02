import * as pl from 'pareto-core-lib'

import { A } from "../api.generated"

export const $$: A.isTab = ($d) => {
    return ($) => {
        return pl.optional(
            $d.getPossibleSymbol($),
            ($) => {
                return $[0] === 'tab'
            },
            () => {
                return false
            }
        )
    }
}