
import * as pm from 'pareto-core-state'
import * as pl from 'pareto-core-lib'
import * as pa from 'pareto-core-async'
import * as pd from 'pareto-core-dev'

import { A } from "../api.generated"

import * as g_pub from "../../../../../pub"
import * as g_test from "lib-pareto-test"

import * as a_builder from "res-pareto-build"

export const $$: A.getTestSet = ($) => {

    const pretokCons = g_pub.$b.createPreTokenizer(
        {
            'location settings': {
                'absolutePositionStart': 0,
                'firstCharacter': 0,
                'firstLine': 0,
            },
            'spaces per tab': 4,
        },
        {
            'errorsHandler': {
                'data': ($) => {
                    pd.logDebugMessage(`ERROR: ${$.type[0]}`)
                },
                'end': () => {
                    pd.logDebugMessage(`END ERROR`)
                },
            }
        }
    )

    const pretok = pretokCons.construct({
        'handler': pl.cc($, ($) => {
            const sb = a_builder.$r.createStringBuilder("").construct<null>({
                'handler': ($) => {
                    pd.logDebugMessage($.string)
                }
            })
            return {
                'data': ($) => {
                    sb.data(`${$.location['absolute position']},${$.location['line location'].line}:${$.location['line location'].character} `)
                    switch ($.type[0]) {
                        case 'begin':
                            pl.cc($.type[1], ($) => {
                                sb.data(`['begin', `)
                                switch ($.type[0]) {
                                    case 'block comment':
                                        pl.cc($.type[1], ($) => {
                                            sb.data(`['block comment', null]`)
                                        })
                                        break
                                    case 'line comment':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['line comment', null]`)
                                        })
                                        break
                                    case 'non wrapped string':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['non wrapped string', null]`)
                                        })
                                        break
                                    case 'whitespace':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['whitespace', null]`)
                                        })
                                        break
                                    case 'wrapped string':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['wrapped string', null]`)
                                        })
                                        break
                                    default: pl.au($.type[0])
                                }

                                sb.data(`]`)
                            })
                            break
                        case 'colon':
                            pl.cc($.type[1], ($) => {
                                sb.data(`['colon', null]`)
                            })
                            break
                        case 'comma':
                            pl.cc($.type[1], ($) => {
                                sb.data(`['comma', null]`)
                            })
                            break
                        case 'end':
                            pl.cc($.type[1], ($) => {
                                sb.data(`['end', null]`)
                            })
                            break
                        case 'header start':
                            pl.cc($.type[1], ($) => {
                                sb.data(`['header start', null]`)
                            })
                            break
                        case 'newline':
                            pl.cc($.type[1], ($) => {
                                sb.data(`['newline', { 'type': `)
                                switch ($.type[0]) {
                                    case 'cr':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['cr', null]`)
                                        })
                                        break
                                    case 'lf':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['lf', null]`)
                                        })
                                        break
                                    default: pl.au($.type[0])
                                }
                                sb.data(`, 'is suffix': ${$['is suffix']}]`)
                            })
                            break
                        case 'snippet':
                            pl.cc($.type[1], ($) => {
                                sb.data(`['snippet', "${$}"]`)
                            })
                            break
                        case 'structural':
                            pl.cc($.type[1], ($) => {
                                sb.data(`['structural', `)
                                switch ($.type[0]) {
                                    case 'close dictionary':
                                        pl.cc($.type[1], ($) => {
                                            sb.data(`['close dictionary', null]`)
                                        })
                                        break
                                    case 'close list':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['close list', null]`)
                                        })
                                        break
                                    case 'close shorthand group':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['close shorthand group', null]`)
                                        })
                                        break
                                    case 'close verbose group':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['close verbose group', null]`)
                                        })
                                        break
                                    case 'open dictionary':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['open dictionary', null]`)
                                        })
                                        break
                                    case 'open list':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['open list', null]`)
                                        })
                                        break
                                    case 'open shorthand group':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['open shorthand group', null]`)
                                        })
                                        break
                                    case 'open verbose group':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['open verbose group', null]`)
                                        })
                                        break
                                    case 'tagged union start':
                                        pl.cc($.type[1], () => {
                                            sb.data(`['tagged union start', null]`)
                                        })
                                        break
                                    default: pl.au($.type[0])
                                }

                                sb.data(`]`)

                            })
                            break
                        default: pl.au($.type[0])
                    }
                    sb.data("\n")
                },
                'end': () => {
                    sb.end(null)
                },
            }
        }),
    })

    pretok.data("asfkl;asjf 23424 \n \r \n\r \r\n asdf ,:! {}()[]<>| 'foo' `fu\nbar`   \t  /* bla*/")
    pretok.end()



    // const tok = g_pub.$b.createTokenizer(
    //     {
    //         'location settings': {
    //             'absolutePositionStart': 0,
    //             'firstCharacter': 0,
    //             'firstLine': 0,
    //         },
    //         'spaces per tab': 4,
    //     },
    //     {
    //         'preTokenErrorsHandler': {
    //             'data': ($) => {

    //             },
    //             'end': () => {

    //             },
    //         },
    //         'tokenErrorsHandler': {
    //             'data': ($) => {

    //             },
    //             'end': () => {

    //             },
    //         },
    //     })

    // const tok2 = tok.construct({
    //     'handler': {
    //         'data': ($) => {
    //             pl.cc($.token, ($) => {

    //                 switch ($[0]) {
    //                     case 'header start':
    //                         pl.cc($[1], ($) => {
    //                             pd.logDebugMessage("XXX")

    //                         })
    //                         break
    //                     case 'structural':
    //                         pl.cc($[1], ($) => {
    //                             pd.logDebugMessage("XXX")

    //                         })
    //                         break
    //                     case 'multiline string':
    //                         pl.cc($[1], ($) => {
    //                             pd.logDebugMessage("XXX")

    //                         })
    //                         break
    //                     case 'simple string':
    //                         pl.cc($[1], ($) => {
    //                             pd.logDebugMessage("XXX")

    //                         })
    //                         break
    //                     default: pl.au($[0])
    //                 }
    //             })
    //         },
    //         'end': ($) => {
    //             pd.logDebugMessage("END")
    //         },
    //     },
    // })

    // tok2.data("FOOOO")
    // tok2.end()

    // pd.logDebugMessage(`TD> ${$.testDirectory}`)

    // mfsLib.f_createReadDirectoryOrAbort({
    //     onError: ($) => {

    //     },
    //     readDirectory: mfs.f_readDirectory
    // })({
    //     path: [$.testDirectory, "errors"],
    // })._execute(($) => {
    //     $.forEach(() => true, ($, key) => {
    //         pd.logDebugMessage(key)
    //     })
    // })
    // // fs.f_readDirectory({
    // //     path: [ $.testDirectory, "errors" ],
    // // })._execute(($) => {

    // // })

    // const pt = pub.$a.createPreTokenizer(
    //     {
    //         consumer: ($) => {

    //         },
    //         onError: ($) => {

    //         },
    //         toArrayOfCharacters: ($) => {
    //             pl.panic("!!!")
    //         }
    //     }
    // )

    // pt("FOO")


    const builder = pm.createUnsafeDictionaryBuilder<g_test.T.TestElement>()
    function createTest(name: string, actual: string, expected: string) {
        builder.add(name, {
            type: ["test", {
                type: ["short string", {
                    actual: actual,
                    expected: expected
                }]
            }]
        })
    }

    return pa.asyncValue({
        elements: builder.getDictionary()
    })
}