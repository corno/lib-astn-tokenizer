
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"

import * as api from "../api"

import * as pub from "../../../../../pub"

import * as mtest from "lib-pareto-test"
import * as mfs from "res-pareto-filesystem"
import * as mfsLib from "lib-pareto-filesystem"

export const $$: api.CgetTestSet = ($) => {

    const tok = pub.$a.createBoundPretokenizer({
        onError: ($) => {
            pl.logDebugMessage("ERROR")
        }
    })

    const tok2 = tok(null, ($) => {
        // switch ($.type[0]) {
        //     case '':
        //         pl.cc($.t[1], ($) => {

        //         })
        //         break
        //     default: pl.au($.t[0])
        // }
    })

    tok2.onData("FOOOO")
    tok2.onEnd()

    // pl.logDebugMessage(`TD> ${$.testDirectory}`)

    // mfsLib.f_createReadDirectoryOrAbort({
    //     onError: ($) => {

    //     },
    //     readDirectory: mfs.f_readDirectory
    // })({
    //     path: [$.testDirectory, "errors"],
    // })._execute(($) => {
    //     $.forEach(() => true, ($, key) => {
    //         pl.logDebugMessage(key)
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


    const builder = pm.createUnsafeDictionaryBuilder<mtest.TTestElement>()
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

    return pl.asyncValue({
        elements: builder.getDictionary()
    })
}