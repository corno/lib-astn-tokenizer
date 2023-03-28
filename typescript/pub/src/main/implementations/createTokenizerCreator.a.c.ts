import * as pl from 'pareto-core-lib'
import * as ps from 'pareto-core-state'

import { A } from "../api.generated"

import * as g_this from "../glossary"
import * as g_tc from "glo-astn-tokenconsumer"

export const $$: A.createTokenizerCreator = ($d) => {
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
        'stringBuilder': g_this.ASYNC.I.StringStreamConsumer
    }


    type SState = {
        'nonTokens': ps.ArrayBuilder<g_this.T.NonToken>
        'currentToken': Optional<SCurrentToken>
        'lineIsDirty': boolean
    }

    return ($is) => {
        const $s: SState = {
            'currentToken': [false],
            'nonTokens': ps.createArrayBuilder(),
            'lineIsDirty': false,
        }

        function flushAnnotation(): g_this.T.TokenizerAnnotationData {
            const nt = $s.nonTokens.getArray()
            $s.nonTokens = ps.createArrayBuilder()
            return {
                'nonTokens': nt
            }
        }

        function onToken($: g_tc.T.Token<g_this.T.TokenizerAnnotationData>) {
            $is.handler.data({
                'annotation': flushAnnotation(),
                'token': $,
            })
            $s.currentToken = [false]
        }
        function onNonToken($: g_this.T.NonToken) {
            $s.nonTokens.push($)


        }
        return {
            'data': ($) => {
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
                                } else {
                                    return true
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
                        switch ($.type[0]) {
                            case 'end':
                                pl.cc($.type[1], ($) => {
                                    $s.stringBuilder.end()
                                })
                                break
                            case 'snippet':
                                pl.cc($.type[1], ($) => {
                                    $s.stringBuilder.data($)
                                })
                                break
                            default: {
                                pl.panic(`unexpected pretoken '${$.type[0]}'`)
                            }
                        }
                    },
                    () => {
                        const location = $.location
                        switch ($.type[0]) {
                            case 'begin':
                                pl.cc($.type[1], ($) => {
                                    const ctt = $.type
                                    $s.currentToken = [true, {
                                        'stringBuilder': $d.createStringBuilder({
                                            'handler': ($) => {
                                                const str = $
                                                switch (ctt[0]) {
                                                    case 'block comment':
                                                        pl.cc(ctt[1], ($s) => {
                                                            onNonToken(['block comment', $])

                                                        })
                                                        break
                                                    case 'line comment':
                                                        pl.cc(ctt, ($s) => {
                                                            onNonToken(['line comment', $])

                                                        })
                                                        break
                                                    case 'non wrapped string':
                                                        pl.cc(ctt, ($s) => {
                                                            onToken(['simple string', {
                                                                'value': $,
                                                                'wrapping': ['none', null],
                                                            }])

                                                        })
                                                        break
                                                    case 'whitespace':
                                                        pl.cc(ctt, ($s) => {
                                                            onNonToken(['whitespace', $])

                                                        })
                                                        break
                                                    case 'wrapped string':
                                                        pl.cc(ctt, ($s) => {
                                                            onToken(['simple string', {
                                                                'value': $,
                                                                'wrapping': ['none', null],
                                                            }])
                                                        })
                                                        break
                                                    default: pl.au(ctt[0])
                                                }
                                            }
                                        }),
                                    }]
                                })
                                break
                            case 'header start':
                                pl.cc($.type[1], ($) => {
                                    onToken(['header start', null])
                                })
                                break
                            case 'newline':
                                pl.cc($.type[1], ($) => {
                                    onNonToken(['newline', null])
                                })
                                break
                            case 'snippet':
                                pl.cc($.type[1], ($) => {
                                    $is.errorHandler.data({
                                        'type': ['unexpected pretoken', null],
                                        'location': location,
                                    })
                                })
                                break
                            case 'end':
                                pl.cc($.type[1], ($) => {
                                    $is.errorHandler.data({
                                        'type': ['unexpected pretoken', null],
                                        'location': location,
                                    })
                                })
                                break
                            case 'structural':
                                pl.cc($.type[1], ($) => {
                                    onToken(['structural', $])
                                })
                                break
                            default: {
                                pl.au($.type[1])
                            }
                        }
                    }
                )
            },
            'end': ($) => {
                handleOptional(
                    $s.currentToken,
                    ($s) => {
                        $is.errorHandler.data({
                            'type': ['unclosed token', null],
                            'location': $
                        })
                    },
                    () => {

                    }
                )
                $is.handler.end(flushAnnotation())
                $is.errorHandler.end()
            }
        }
    }
}