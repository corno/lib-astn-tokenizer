import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'
import * as ps from 'pareto-core-state'

import * as api from "../api"

import * as mtc from "glo-astn-tokenconsumer"

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
        'nonTokens': ps.ArrayBuilder<api.T.NonToken>
        'currentToken': Optional<SCurrentToken>
        'lineIsDirty': boolean
    }

    return ($, $i) => {
        const $s: SState = {
            'currentToken': [false],
            'nonTokens': ps.createArrayBuilder(),
            'lineIsDirty': false,
        }

        function flushAnnotation(): api.T.TokenizerAnnotationData {
            const nt = $s.nonTokens.getArray()
            $s.nonTokens = ps.createArrayBuilder()
            return {
                'nonTokens': nt
            }
        }

        function onToken($: mtc.T.Token<api.T.TokenizerAnnotationData>) {
            $i.handler.onToken({
                'annotation': flushAnnotation(),
                'token': $,
            })
            $s.currentToken = [false]
        }
        function onNonToken($: api.T.NonToken) {
            $s.nonTokens.push($)


        }
        return {
            'onData': ($) => {
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
                                                            'wrapping': ['none', {}],
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
                                                            'wrapping': ['none', {}],
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
                                    switch ($.type[0]) {
                                        case 'block comment':
                                            pl.cc($.type[1], ($) => {
                                                $s.currentToken = [true, {
                                                    'type': ['block comment', {}],
                                                    'stringBuilder': ps.createArrayBuilder(),
                                                }]
                                            })
                                            break
                                        case 'line comment':
                                            pl.cc($.type[1], ($) => {
                                                $s.currentToken = [true, {
                                                    'type': ['line comment', {}],
                                                    'stringBuilder': ps.createArrayBuilder(),
                                                }]
                                            })
                                            break
                                        case 'non wrapped string':
                                            pl.cc($.type[1], ($) => {
                                                $s.currentToken = [true, {
                                                    'type': ['non wrapped string', {}],
                                                    'stringBuilder': ps.createArrayBuilder(),
                                                }]
                                            })
                                            break
                                        case 'whitespace':
                                            pl.cc($.type[1], ($) => {
                                                $s.currentToken = [true, {
                                                    'type': ['whitespace', {}],
                                                    'stringBuilder': ps.createArrayBuilder(),
                                                }]
                                            })
                                            break
                                        case 'wrapped string':
                                            pl.cc($.type[1], ($) => {
                                                $s.currentToken = [true, {
                                                    'type': ['wrapped string', {}],
                                                    'stringBuilder': ps.createArrayBuilder(),
                                                }]
                                            })
                                            break
                                        default: pl.au($.type[0])
                                    }
                                })
                                break
                            case 'header start':
                                pl.cc($.type[1], ($) => {
                                    onToken(['header start', {}])
                                })
                                break
                            case 'newline':
                                pl.cc($.type[1], ($) => {
                                    onNonToken(['newline', {}])
                                })
                                break
                            case 'snippet':
                                pl.cc($.type[1], ($) => {
                                    $i.onError({
                                        'type': ['unexpected pretoken', {

                                        }],
                                        'location': location,
                                    })
                                })
                                break
                            case 'end':
                                pl.cc($.type[1], ($) => {
                                    $i.onError({
                                        'type': ['unexpected pretoken', {

                                        }],
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
            'onEnd': ($) => {
                handleOptional(
                    $s.currentToken,
                    ($s) => {
                        $i.onError({
                            'type': ['unclosed token', {

                            }],
                            'location': $
                        })
                    },
                    () => {

                    }
                )
                $i.handler.onEnd(flushAnnotation())
            }
        }
    }
}