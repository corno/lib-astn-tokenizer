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

    type SCurrentTokenType =
        | ['block comment', {}]
        | ['line comment', {}]
        | ['non wrapped string', {}]
        | ['wrapped string', {}]
        | ['whitespace', {}]

    type SCurrentToken = {
        'type': SCurrentTokenType
        'stringBuilder': ps.ArrayBuilder<string>
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
                        function pushSnippet($: string) {
                            $s.stringBuilder.push($)
                        }
                        function flushString(): string {
                            const str = $d.arrayToString($s.stringBuilder.getArray())
                            //$s.stringBuilder = ps.createArrayBuilder()
                            return str
                        }
                        pl.cc($s.type, ($s) => {
                            switch ($.type[0]) {
                                case 'end':
                                    pl.cc($.type[1], ($) => {
                                        function doEnd() {
                                            switch ($s[0]) {
                                                case 'block comment':
                                                    pl.cc($s[1], ($s) => {
                                                        onNonToken(['block comment', flushString()])

                                                    })
                                                    break
                                                case 'line comment':
                                                    pl.cc($s[1], ($s) => {
                                                        onNonToken(['line comment', flushString()])

                                                    })
                                                    break
                                                case 'non wrapped string':
                                                    pl.cc($s[1], ($s) => {
                                                        onToken(['simple string', {
                                                            'value': flushString(),
                                                            'wrapping': ['none', null],
                                                        }])

                                                    })
                                                    break
                                                case 'whitespace':
                                                    pl.cc($s[1], ($s) => {
                                                        onNonToken(['whitespace', flushString()])

                                                    })
                                                    break
                                                case 'wrapped string':
                                                    pl.cc($s[1], ($s) => {
                                                        onToken(['simple string', {
                                                            'value': flushString(),
                                                            'wrapping': ['none', null],
                                                        }])


                                                    })
                                                    break
                                                default: pl.au($s[0])
                                            }

                                        }
                                        doEnd()

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
                        const location = $.location
                        switch ($.type[0]) {
                            case 'begin':
                                pl.cc($.type[1], ($) => {
                                    $s.currentToken = [true, {
                                        'type': pl.cc($.type, ($) => {
                                            switch ($[0]) {
                                                case 'block comment':
                                                    return pl.cc($[1], ($) => {
                                                        return ['block comment', {}]
                                                    })
                                                case 'line comment':
                                                    return pl.cc($[1], ($) => {
                                                        return ['line comment', {}]
                                                    })
                                                case 'non wrapped string':
                                                    return pl.cc($[1], ($) => {
                                                        return ['non wrapped string', {}]
                                                    })
                                                case 'whitespace':
                                                    return pl.cc($[1], ($) => {
                                                        return ['whitespace', {}]
                                                    })
                                                case 'wrapped string':
                                                    return pl.cc($[1], ($) => {
                                                        return ['wrapped string', {}]
                                                    })
                                                default: return pl.au($[0])
                                            }
                                        }),
                                        'stringBuilder': ps.createArrayBuilder(),
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