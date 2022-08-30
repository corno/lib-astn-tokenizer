/* eslint
    complexity: off
*/
import * as pl from "pareto-core-lib"
import * as pw from "pareto-core-raw"

import * as sp from "api-astn-tokenconsumer"
import * as uglyStuff from "api-pareto-ugly-stuff"

import * as api from "../interface"
import * as inf from "./internal_interface"
import * as iinf from "./interalInterface"

import { getEndLocationFromRange } from "./getEndLocationFromRange"
import { WrappedStringType } from "./PreToken"

function createRangeFromLocations(start: api.LocationInfo, end: api.LocationInfo): api.Range {
    return {
        start: start,
        length: end.absolutePosition - start.absolutePosition,
        size: ((): api.RangeSize => {
            if (start.lineLocation.line === end.lineLocation.line) {
                return ["single line", { "column offset": end.lineLocation.character - start.lineLocation.character }]
            } else {
                return ["multi line", { "line offset": end.lineLocation.line - start.lineLocation.line, "column": end.lineLocation.character }]
            }
        })(),
    }
}

function createRangeFromSingleLocation(location: api.LocationInfo): api.Range {
    return {
        start: location,
        length: 0,
        size: ["single line", { "column offset": 0 }],
    }
}

type NonWrappedStringContext = {
    nonwrappedStringNode: string
    readonly start: api.LocationInfo
}
type WhitespaceContext = {
    whitespaceNode: string
    readonly start: api.LocationInfo
}

type CommentContext = {
    commentNode: string
    readonly start: api.Range
    readonly indentation: null | string
}

type WrappedStringContext = {
    readonly type: WrappedStringType
    readonly start: api.Range
    wrappedStringNode: string
    indentation: string
}

type CurrentToken =
    | ["none", {}]
    | ["line comment", CommentContext]
    | ["block comment", CommentContext]
    | ["non wrapped string", NonWrappedStringContext]
    | ["wrapped string", WrappedStringContext]
    | ["whitespace", WhitespaceContext]


export function printTokenizer2Error(error: inf.Tokenizer2Error): string {
    return error[0]
}

export function createTokenizer2(
    parser: sp.ITokenConsumer<api.TokenizerAnnotationData>,
    onError: ($: {
        error: inf.Tokenizer2Error
        range: api.Range
    }) => void,
    $d: {
        substr: uglyStuff.SubStr,
        push: uglyStuff.Push,
    },
): iinf.IPreTokenStreamConsumer {

    function onError1(error: inf.Tokenizer2Error, range: api.Range) {
        onError({
            error: error,
            range: range,
        })
    }
    const indentationState = (() => {
        let indentation = ""
        let lineIsDirty = false
        return {
            setLineDirty: () => {
                lineIsDirty = true
            },
            onWhitespace: (value: string) => {
                if (!lineIsDirty) {
                    indentation = value
                }
            },
            onNewline: () => {
                indentation = ""
                lineIsDirty = false
            },
            getIndentation: () => {
                return indentation
            },
        }
    })()

    function createAnnotation(
        range: api.Range,
    ): api.TokenizerAnnotationData {
        return {
            range: range,
            indentation: indentationState.getIndentation(),
        }
    }
    let currentToken: CurrentToken = ["none", {}]

    function setCurrentToken(contextType: CurrentToken, range: api.Range) {
        if (currentToken[0] !== "none") {
            onError1(["unexpected start of token", {}], range)
        }
        currentToken = contextType
    }
    function unsetCurrentToken(range: api.Range) {
        if (currentToken[0] === "none") {
            onError1(["unexpected, parser is already in 'none' mode", {}], range)
        }
        currentToken = ["none", {}]
    }

    return {
        onData: (data) => {
            switch (data.type[0]) {
                case "block comment begin": {
                    const $ = data.type[1]

                    setCurrentToken(["block comment", {
                        commentNode: "",
                        start: $.range,
                        indentation: indentationState.getIndentation(),
                    }], $.range)

                    indentationState.setLineDirty()
                    break
                }
                case "block comment end": {
                    const $ = data.type[1]

                    if (currentToken[0] !== "block comment") {
                        onError1(["Unexpected block comment end", {}], $.range)
                    }
                    //const $ = currentToken[1]
                    //const endOfStart = getEndLocationFromRange($.start)
                    // const od = parser.onData({
                    //     tokenString: "*/",
                    //     range: createRangeFromLocations(
                    //         $.start.start,
                    //         getEndLocationFromRange(end),
                    //     ),
                    //     type: [TokenType.Overhead, {
                    //         type: [OverheadTokenType.Comment, {
                    //             comment: $.commentNode,
                    //             innerRange: createRangeFromLocations(
                    //                 {
                    //                     position: endOfStart.position,
                    //                     line: endOfStart.line,
                    //                     column: endOfStart.column,
                    //                 },
                    //                 {
                    //                     position: end.start.position,
                    //                     line: end.start.line,
                    //                     column: end.start.column,
                    //                 },
                    //             ),
                    //             indentation: $.indentation,
                    //             type: "block",
                    //         }],
                    //     }],
                    // })
                    unsetCurrentToken($.range)
                    //return od
                    break
                }
                case "line comment begin": {
                    const $ = data.type[1]

                    setCurrentToken(
                        ["line comment", {
                            commentNode: "",
                            start: $.range,
                            indentation: indentationState.getIndentation(),
                        }],
                        $.range
                    )
                    indentationState.setLineDirty()
                    break
                }
                case "line comment end": {
                    const $ = data.type[1]
                    function onLineCommentEnd(location: api.LocationInfo) {

                        if (currentToken[0] !== "line comment") {
                            onError1(["Unexpected line comment end", {}], createRangeFromSingleLocation(location))
                        }

                        //const $ = currentToken[1]
                        // const range = createRangeFromLocations($.start.start, location)
                        // const endOfStart = getEndLocationFromRange($.start)
                        // const od = parser.onData({
                        //     tokenString: "",
                        //     range: range,
                        //     type: [TokenType.Overhead, {
                        //         type: [OverheadTokenType.Comment, {
                        //             comment: $.commentNode,
                        //             innerRange: createRangeFromLocations(
                        //                 {
                        //                     position: endOfStart.position,
                        //                     line: endOfStart.line,
                        //                     column: endOfStart.column,
                        //                 },
                        //                 location,
                        //             ),
                        //             indentation: $.indentation,
                        //             type: "line",
                        //         }],
                        //     }],
                        // })
                        unsetCurrentToken(createRangeFromSingleLocation(location))
                    }
                    onLineCommentEnd($.location)
                    break
                }
                case "newline": {
                    const $ = data.type[1]
                    function onNewLine(_range: api.Range, _tokenString: string) {

                        indentationState.onNewline()


                        switch (currentToken[0]) {
                            case "line comment": {
                                onError1(["unexpected newline", {}], _range)
                                break
                            }
                            case "block comment": {
                                pl.implementMe("BLOCK COMMENT NEWLINE")
                            }
                            case "none": {

                                // return parser.onData({
                                //     tokenString: tokenString,
                                //     range: range,
                                //     type: [TokenType.Overhead, {
                                //         type: [OverheadTokenType.NewLine, {
                                //         }],
                                //     }],
                                // })
                                break
                            }
                            case "wrapped string": {
                                const $ = currentToken[1]
                                if ($.type[0] !== "multiline") {
                                    onError1(["unexpected newline", {}], _range)
                                } else {
                                    $d.push($.type[1].previousLines, $.wrappedStringNode)
                                    $.wrappedStringNode = ""
                                }
                                break
                            }
                            case "non wrapped string": {
                                onError1(["unexpected newline", {}], _range)
                                break
                            }
                            case "whitespace": {
                                onError1(["unexpected newline", {}], _range)
                                break
                            }
                            default:
                                pl.au(currentToken[0])
                        }
                    }
                    onNewLine($.range, "FIXME NEWLINE TOKEN STRING")
                    break
                }
                case "header start": {
                    const $ = data.type[1]
                    indentationState.setLineDirty()
                    parser.onToken({
                        annotation: createAnnotation(
                            $.range,
                        ),
                        token: ["header start", {}],
                    })
                    break
                }
                case "structural": {
                    const $ = data.type[1]
                    indentationState.setLineDirty()
                    parser.onToken({
                        annotation: createAnnotation(
                            $.range,
                        ),
                        token: ["structural", {
                            //char: $.char,
                            type: $.type,
                        }],
                    })
                    break
                }
                case "snippet": {
                    const $$ = data.type[1]
                    switch (currentToken[0]) {
                        case "line comment": {
                            const $ = currentToken[1]
                            $.commentNode += $d.substr($$.chunk, $$.begin, $$.end - $$.begin)
                            break
                        }
                        case "block comment": {
                            const $ = currentToken[1]
                            $.commentNode += $d.substr($$.chunk, $$.begin, $$.end - $$.begin)
                            break
                        }
                        case "none": {
                            onError1(["unexpected snippet", {}], )
                            break
                        }
                        case "wrapped string": {
                            const $ = currentToken[1]
                            $.wrappedStringNode += $d.substr($$.chunk, $$.begin, $$.end - $$.begin)
                            break
                        }
                        case "non wrapped string": {
                            const $ = currentToken[1]
                            $.nonwrappedStringNode += $d.substr($$.chunk, $$.begin, $$.end - $$.begin)
                            break
                        }
                        case "whitespace": {
                            const $ = currentToken[1]
                            $.whitespaceNode += $d.substr($$.chunk, $$.begin, $$.end - $$.begin)
                            break
                        }
                        default:
                            pl.au(currentToken[0])
                    }
                    break
                }
                case "wrapped string begin": {
                    const $ = data.type[1]
                    indentationState.setLineDirty()
                    function onWrappedStringBegin(begin: api.Range, quote: WrappedStringType) {
                        setCurrentToken(
                            ["wrapped string", {
                                wrappedStringNode: "",
                                start: begin,
                                type: quote,
                                indentation: indentationState.getIndentation(),
                            }],
                            begin
                        )
                    }
                    onWrappedStringBegin($.range, $.type)
                    break
                }
                case "wrapped string end": {
                    const $ = data.type[1]
                    function onWrappedStringEnd(end: api.Range, wrapper: string | null) {
                        if (currentToken[0] !== "wrapped string") {
                            onError1(["Unexpected nonwrapped string end", {}], end)
                        } else {
                            const $tok = currentToken[1]
                            const $ = currentToken[1]

                            const range = createRangeFromLocations($tok.start.start, getEndLocationFromRange(end))

                            unsetCurrentToken(end)

                            switch ($.type[0]) {
                                case "apostrophe": {
                                    parser.onToken({
                                        annotation: createAnnotation(
                                            range,
                                        ),
                                        token: ["simple string", {
                                            value: $.wrappedStringNode,
                                            wrapping: ["apostrophe", {}],
                                        }],
                                    })
                                    break
                                }
                                case "multiline": {
                                    const $$ = $.type[1]
                                    function trimStringLines(lines: string[], indentation: string) {
                                        return pw.wrapRawArray(lines).map((line, index) => {
                                            if (index === 0) { //the first line needs no trimming
                                                return line
                                            }
                                            if (line.startsWith(indentation)) {
                                                return line.substr(indentation.length)
                                            }
                                            return line
                                        })
                                    }
                                    parser.onToken({
                                        annotation: createAnnotation(
                                            range,
                                        ),
                                        token: ["multiline string", {
                                            lines: trimStringLines($$.previousLines.concat([$.wrappedStringNode]), $.indentation),
                                        }],
                                    })
                                    break
                                }
                                case "quote": {
                                    parser.onToken({
                                        annotation: createAnnotation(
                                            range,
                                        ),
                                        token: ["simple string", {
                                            value: $.wrappedStringNode,
                                            wrapping: ["quote", {}],
                                        }],
                                    })
                                    break
                                }
                                default:
                                    pl.au($.type[0])
                            }
                        }
                    }
                    onWrappedStringEnd($.range, $.wrapper)
                    break
                }
                case "non wrapped string begin": {
                    const $ = data.type[1]
                    function onNonWrappedStringBegin(location: api.LocationInfo) {

                        indentationState.setLineDirty()

                        setCurrentToken(["non wrapped string", { nonwrappedStringNode: "", start: location }], createRangeFromSingleLocation(location))
                    }
                    onNonWrappedStringBegin($.location)
                    break
                }
                case "non wrapped string end": {
                    const $ = data.type[1]
                    function onNonWrappedStringEnd(location: api.LocationInfo) {

                        if (currentToken[0] !== "non wrapped string") {
                            onError1(["Unexpected nonwrapped string end", {}], createRangeFromSingleLocation(location))
                        } else {
                            const $ = currentToken[1]

                            const $tok = currentToken[1]
                            const value = $tok.nonwrappedStringNode
                            const range = createRangeFromLocations($.start, location)
                            unsetCurrentToken(createRangeFromSingleLocation(location))
                            parser.onToken({
                                annotation: createAnnotation(
                                    range,
                                ),
                                token: ["simple string", {
                                    value: value,
                                    wrapping: ["none", {}],
                                    //startCharacter: $tok.startCharacter,
                                    //wrapper: null,
                                }],
                            })
                        }
                    }
                    onNonWrappedStringEnd($.location)
                    break
                }
                case "whitespace begin": {
                    const $ = data.type[1]
                    function onWhitespaceBegin(location: api.LocationInfo) {
                        const $: WhitespaceContext = { whitespaceNode: "", start: location }

                        setCurrentToken(["whitespace", $], createRangeFromSingleLocation(location))
                    }

                    onWhitespaceBegin($.location)
                    break
                }
                case "whitespace end": {
                    const $ = data.type[1]
                    function onWhitespaceEnd(location: api.LocationInfo) {

                        if (currentToken[0] !== "whitespace") {
                            onError1(["Unexpected whitespace end", {}], createRangeFromSingleLocation(location))
                        } else {
                            const $ = currentToken[1]
                            //const range = createRangeFromLocations($.start, location)
                            indentationState.onWhitespace($.whitespaceNode)
                            // const od = parser.onData({
                            //     tokenString: $.whitespaceNode,
                            //     range: range,
                            //     type: [TokenType.Overhead, {
                            //         type: [OverheadTokenType.WhiteSpace, {
                            //             value: $.whitespaceNode,
                            //         }],
                            //     }],
                            // })
                            unsetCurrentToken(createRangeFromSingleLocation(location))
                            //return od
                        }
                    }
                    onWhitespaceEnd($.location)
                    break
                }
                default:
                    pl.au(data.type[0])
            }
        },
        onEnd: (location: api.LocationInfo) => {
            parser.onEnd(
                createAnnotation(
                    createRangeFromLocations(location, location),
                )
            )
        },
    }
}