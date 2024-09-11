import * as pl from 'pareto-core-lib'
import * as pd from 'pareto-core-dev'

import * as tempinternals from 'pareto-core-internals'

import { A } from "../api.generated"

export const $$: A.isTab = ($d) => {
    return ($) => {
        return tempinternals.wrapRawOptionalValue(
            $d.getPossibleSymbol($)).map(
                ($) => {
                    //return $[0] === 'tab'
                    pd.implementMe("XXX")
                },
                () => {
                    return false
                }
            )
    }
}