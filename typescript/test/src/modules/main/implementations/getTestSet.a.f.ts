
import * as pm from 'pareto-core-state'
import * as pl from 'pareto-core-lib'
import * as pa from 'pareto-core-async'
import * as pd from 'pareto-core-dev'

import { A } from "../api.generated"

import * as g_pub from "../../../../../pub"

import * as g_test from "lib-pareto-test"
import * as g_fs from "res-pareto-filesystem"
import * as g_fsLib from "lib-pareto-filesystem"

export const $$: A.getTestSet = ($) => {

    const pretokCons = g_pub.$b.createPretokenizer(
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

                },
                'end': () => {

                },
            }
        }
    )

    const pretok = pretokCons.construct({
        'handler': {
            'data': ($) => {
                pd.logDebugMessage($.type[0])
            },
            'end': () => {
                pd.logDebugMessage(`END`)
            },
        },
    })

    pretok.data("asfkl;asjf  23424 asdf")
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

    // const pt = pub.$a.createPretokenizer(
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