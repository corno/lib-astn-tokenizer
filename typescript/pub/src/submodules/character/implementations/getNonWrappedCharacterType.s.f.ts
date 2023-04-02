import * as pl from 'pareto-core-lib'

import { A } from "../api.generated"

export const $$: A.getNonWrappedCharacterType = ($d) => {
    return ($) => {
        return pl.optional(
            $d.getPossibleSymbol($),
            ($) => {
                switch ($[0]) {
                    case 'quotation mark': return ['marker', ['quotation mark', null]]
                    case 'apostrophe': return ['marker', ['apostrophe', null]]
                    case 'backtick': return ['marker', ['backtick', null]]

                    case 'solidus': return ['marker', ['solidus', null]]

                    case 'line feed': return ['marker', ['whitespace', null]] //linefeed
                    case 'carriage return': return ['marker', ['whitespace', null]] //carriage return
                    case 'space': return ['marker', ['whitespace', null]] //space
                    case 'tab': return ['marker', ['whitespace', null]] //tab

                    case 'exclamation mark': return ['marker', ['exclamation mark', null]]
                    case 'open parenthesis': return ['marker', ['open parenthesis', null]]
                    case 'close parenthesis': return ['marker', ['close parenthesis', null]]
                    case 'comma': return ['marker', ['comma', null]]
                    case 'colon': return ['marker', ['colon', null]]
                    case 'open angle bracket': return ['marker', ['open angle bracket', null]]
                    case 'close angle bracket': return ['marker', ['close angle bracket', null]]
                    case 'open bracket': return ['marker', ['open bracket', null]]
                    case 'close bracket': return ['marker', ['close bracket', null]]
                    case 'open brace': return ['marker', ['open brace', null]]
                    case 'vertical line': return ['marker', ['vertical line', null]]
                    case 'close brace': return ['marker', ['close brace', null]]
                    default: {
                        return ['other', null]
                    }
                }
            },
            () => {
                return ['other', null]
            })
    }


}