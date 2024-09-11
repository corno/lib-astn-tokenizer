import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'
import * as pd from 'pareto-core-dev'

import * as tempinternals from 'pareto-core-internals'

import { A } from "../api.generated"

import * as g_build from "res-pareto-build"
import * as g_this from "../glossary"
import * as g_tc from "glo-astn-tokenconsumer"

export const $$: A.createPostTokenizer = ($d) => {


    type SCurrentToken = {
        'stringBuilder': g_build.ASYNC.I.StringStreamConsumer<null>
    }

    // type NonTokensHandler = ($: pt.Array<g_this.T.NonToken>) => void

    // type ChangeableHandler<T> = {
    //     'handler': T
    // }

    // type SNonTokens = {
    // }

    type SState = {
        readonly errorHandler: g_this.ASYNC.I.PostTokenErrorsHandler
        // readonly handler: {
        //     'data': ($: g_tc.T.Token) => void
        //     'end': ($: null) => void
        // }
        'nonTokensBuilder': g_build.ASYNC.I.Elements<
            pt.OptionalValue<g_tc.T.Token>,
            g_this.T.NonTokenType
        >

        // {
        //     'data': ($: ) => void
        //     'end': ($: ) => void
        // }
        'currentToken': pt.OptionalValue<SCurrentToken>
        'lineIsDirty': boolean
    }

    // function initNonTokens(): SNonTokens {
    //     const ch: ChangeableHandler<NonTokensHandler> = {
    //         'handler': ($) => {
    //             pl.panic("nontokenshandler not set")
    //         }
    //     }
    //     return {
    //         'handler': ch,
    //         'nonTokens': $d.createArrayBuilder({
    //             'handler': ($) => {
    //                 ch.handler($)
    //             }
    //         })
    //     }
    // }

    function init($s: SState): g_this.ASYNC.I.PreTokenHandler {
        const $s_state = $s
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

                //is there a current token?
                $s.currentToken.map(
                    ($s) => {
                        //there is a current token
                        switch ($.type[0]) {
                            case 'end':
                                pl.cc($.type[1], ($) => {
                                    $s.stringBuilder.end(null)
                                })
                                break
                            case 'snippet':
                                pl.cc($.type[1], ($) => {
                                    $s.stringBuilder.data($)
                                })
                                break
                            default: {
                                $s_state.errorHandler.data(['unexpected pretoken', $])
                            }
                        }
                    },
                    () => {
                        //there is no current token
                        const pt = $
                        switch ($.type[0]) {
                            case 'begin':
                                pl.cc($.type[1], ($) => {
                                    const ctt = $.type
                                    $s.currentToken = pl.set({
                                        'stringBuilder': $d.createStringBuilder.construct({
                                            'handler': ($) => {
                                                switch (ctt[0]) {
                                                    case 'block comment':
                                                        pl.cc(ctt[1], ($s) => {
                                                            $s_state.nonTokensBuilder.data(['block comment', $.string])

                                                        })
                                                        break
                                                    case 'line comment':
                                                        pl.cc(ctt, ($s) => {
                                                            $s_state.nonTokensBuilder.data(['line comment', $.string])

                                                        })
                                                        break
                                                    case 'non wrapped string':
                                                        pl.cc(ctt, ($s) => {
                                                            $s_state.nonTokensBuilder.end(pl.set(['simple string', {
                                                                'value': $.string,
                                                                'wrapping': ['none', null],
                                                            }]))

                                                        })
                                                        break
                                                    case 'whitespace':
                                                        pl.cc(ctt, ($s) => {
                                                            $s_state.nonTokensBuilder.data(['whitespace', $.string])

                                                        })
                                                        break
                                                    case 'wrapped string':
                                                        pl.cc(ctt, ($s) => {
                                                            $s_state.nonTokensBuilder.end(pl.set(['simple string', {
                                                                'value': $.string,
                                                                'wrapping': ['none', null],
                                                            }]))
                                                        })
                                                        break
                                                    default: pl.au(ctt[0])
                                                }
                                            }
                                        }),
                                    })
                                })
                                break
                            case 'colon':
                                pl.cc($.type[1], ($) => {
                                    $s_state.nonTokensBuilder.data(['colon', null])
                                })
                                break
                            case 'comma':
                                pl.cc($.type[1], ($) => {
                                    $s_state.nonTokensBuilder.end(pl.set(['header start', null]))
                                })
                                break
                            case 'header start':
                                pl.cc($.type[1], ($) => {
                                    $s_state.nonTokensBuilder.end(pl.set(['header start', null]))
                                })
                                break
                            case 'newline':
                                pl.cc($.type[1], ($) => {
                                    $s_state.nonTokensBuilder.data(['newline', null])
                                })
                                break
                            case 'snippet':
                                pl.cc($.type[1], ($) => {
                                    $s_state.errorHandler.data(['unexpected pretoken', pt])
                                })
                                break
                            case 'end':
                                pl.cc($.type[1], ($) => {
                                    $s_state.errorHandler.data(['unexpected pretoken', pt])
                                })
                                break
                            case 'structural':
                                pl.cc($.type[1], ($) => {
                                    $s_state.nonTokensBuilder.end(pl.set(['structural', $]))
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
                $s.currentToken.map(
                    ($s) => {
                        $s_state.errorHandler.data(['unclosed token', {
                            'location': $
                        }])
                    },
                    () => {
                        //there was no current token
                    }
                )
                $s_state.nonTokensBuilder.end(pl.notSet())
                $s_state.errorHandler.end()
            }
        }
    }

    return {
        'construct': ($is) => {

            // function flushAnnotation(): g_this.T.TokenizerAnnotationData {
            //     // const nt = $s_state.nonTokens.end()
            //     // $s_state.nonTokens = $d.createArrayBuilder({
            //     //     'handler': ($) => {
            //     //         FIXME
            //     //     }
            //     // })
            //     // $s.nonTokens = ps.createArrayBuilder()
            //     return {
            //         'nonTokens': nt
            //     }
            // }

            return init({
                'errorHandler': $is.errorHandler,
                'nonTokensBuilder': $d.createArrayBuilder.construct({
                    'handler': ($) => {
                        const nontokens = $.array
                        $.end.map(
                            ($) => {
                                // $is.handler.data({
                                //     'annotation': {
                                //         'location': 42,
                                //         'precedingNonTokens': nontokens,
                                //     },
                                //     'token': $,
                                // })

                            },
                            () => {

                            }
                        )
                        pd.implementMe("@@@@@")
                    }

                }),
                // 'tokenBuilder': {
                //     'data': ($) => {

                //     },
                //     'end': ($) => {

                //     }
                // },
                'currentToken': pl.notSet(),
                //'nt': initNonTokens(),
                'lineIsDirty': false,
            })
        }
    }
}