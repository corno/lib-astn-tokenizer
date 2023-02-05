import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'
import * as ps from 'pareto-core-state'

import * as api from "../api"

export const $$: api.CcreateTokenizer = ($d) => {
    type Optional<T> =
        | [false]
        | [true, T]

    function handleOptional<T>(
        $: Optional<T>,
        onSet: ($: T) => void,
        onNotSet?: () => void,
    ) {
        if ($[0] === true) {
            onSet($[1])
        } else {
            if (onNotSet !== undefined) {
                onNotSet()
            }
        }
    }

    type SCurrentToken = {
        'type':
        | ['block comment', {}]
        | ['line comment', {}]
        | ['non wrapped string', {}]
        | ['wrapped string', {}]
        | ['whitespace', {}]
        'stringBuilder': ps.ArrayBuilder<string>
    }


    type SState = {
        'currentToken': Optional<SCurrentToken>
        'lineIsDirty': boolean
    }

    return ($, $i) => {
        const $s: SState = {
            'currentToken': [false],
            'lineIsDirty': false,
        }

        function onToken($: api.TToken) {

        }
        return ($) => {
            const makesDirty = pl.cc($.type, ($) => {

                switch ($[0]) {
                    case 'newline':
                        return pl.cc($[1], ($) => {
                            return false //correct?
                        })
                    case 'snippet':
                        return pl.cc($[1], ($) => {
                            return false //correct?
                        })
                    case 'begin':
                        return pl.cc($[1], ($) => {
                            if ($.type[0] === 'whitespace') {
                                return false //correct?
                            }
                        })
                    // case 'whitespace end':
                    //     return pl.cc($[1], ($) => {
                    //         return false //correct?
                    //     })
                    default: return true
                }
            })
            handleOptional(
                $s.currentToken,
                ($s) => {
                    function pushSnippet($: string) {
                        $s.stringBuilder.push($)
                    }
                    pl.cc($s.type, ($s) => {
                        switch ($.type[0]) {
                            case 'end':
                                pl.cc($.type[1], ($) => {
                                    switch ($s[0]) {
                                        case 'block comment':
                                            pl.cc($s[1], ($s) => {
                                                onToken([])

                                            })
                                            break
                                        case 'line comment':
                                            pl.cc($s[1], ($s) => {
                                                onToken([])

                                            })
                                            break
                                        case 'non wrapped string':
                                            pl.cc($s[1], ($s) => {
                                                onToken([])

                                            })
                                            break
                                        case 'whitespace':
                                            pl.cc($s[1], ($s) => {
                                                onToken([])

                                            })
                                            break
                                        case 'wrapped string':
                                            pl.cc($s[1], ($s) => {
                                                onToken([])

                                            })
                                            break
                                        default: pl.au($s[0])
                                    }

                                })
                                break
                            case 'snippet':
                                pl.cc($.type[1], ($) => {
                                    pushSnippet($)
                                })
                                break
                            default: {
                                pl.panic(`unexpected pretoken '${$.type[0]}'`)
                            }
                        }
                    })

                },
                () => {
                    switch ($.type[0]) {
                        case 'begin':
                            pl.cc($.type[1], ($) => {

                            })
                            break
                        case 'header start':
                            pl.cc($.type[1], ($) => {

                            })
                            break
                        case 'newline':
                            pl.cc($.type[1], ($) => {

                            })
                            break
                        case 'structural':
                            pl.cc($.type[1], ($) => {

                            })
                            break
                        default: {
                            pl.panic(`unexpected pretoken '${$.type[0]}'`)
                        }
                    }
                }
            )
        }
    }
}