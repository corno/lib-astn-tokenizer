import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'
import * as ps from 'pareto-core-state'

import * as api from "../api"

export const $$: api.CcreatePretokenizer = ($c, $d) => {

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

    type SCurrentToken =
        | ['block comment', SBlockCommentContext]
        | ['line comment', {}]
        | ['none', SNoneContext]
        | ['non wrapped string', {}]
        | ['wrapped string', SStringContext]
        | ['whitespace', {}]

    type SBlockCommentContext = {
        'foundAsterisk': boolean
    }

    type SFoundNewlineCharacter = {
        'type':
        | ['carriage return', {}]
        | ['line feed', {}]
        'startLocation': api.T.LocationInfo
    }

    type SNoneContext = {
        'found':
        | ['nothing', {}]
        | ['newlineCharacter', SFoundNewlineCharacter]
        | ['solidus', api.T.LocationInfo]
    }

    type SStringContext = {
        'slashed': boolean
        'startCharacter': number
        'unicode': Optional<SUnicode>
        'foundNewlineCharacter': Optional<SFoundNewlineCharacter>
    }

    type SUnicode = {
        'charactersLeft': number
        'foundCharacters': pt.Array<number>
    }

    type SState = {
        'currentToken': SCurrentToken
        'location': {
            'foundNewlineCharacter': Optional<SFoundNewlineCharacter>
            'absolutePosition': number
            'line': number,
            'character': number,
        },
        'snippet': ps.ArrayBuilder<number>
    }

    const $s: SState = {
        'currentToken': ['none', {
            'found': ['nothing', {}]
        }],
        'location': {
            'foundNewlineCharacter': [false],
            'absolutePosition': $c.location.absolutePositionStart,
            'line': $c.location.firstLine,
            'character': $c.location.firstCharacter,

        },
        'snippet': ps.createArrayBuilder(),
    }

    return ($, $i) => {
        function createLocation(): api.T.LocationInfo {
            return {
                'absolutePosition': $s.location.absolutePosition,
                'lineLocation': {
                    'character': $s.location.character,
                    'line': $s.location.line,
                }
            }
        }
        function onError($: api.T.PretokenError._ltype) {
            $d.onError({
                'type': $,
                'location': createLocation()
            })
        }
        function onPretoken($: api.T.Pretoken._ltype) {
            $i({
                'type': $,
                'location': createLocation()
            })
        }
        function onStart($: api.T.Pretoken._ltype.begin._ltype) {
            onPretoken(['begin', {
                'type': $,
            }])
        }
        function onEnd() {
            onPretoken(['end', {}])
        }
        function flushSnippet() {
            const characters = $s.snippet.getArray()
            $s.snippet = ps.createArrayBuilder()
            onPretoken(['snippet', $d.convertToString(characters)])
        }
        function pushCharacter($: number) {
            $s.snippet.push($)
        }
        function noCurrentToken() {
            $s.currentToken = ['none', { 'found': ['nothing', {}] }]
        }
        return {
            onData: ($) => {
                $d.convertToCharacters($).forEach(($) => {
                    $s.location.absolutePosition = $d.increment($s.location.absolutePosition)
                    { //update the line and character
                        const location = $s.location
                        handleOptional(
                            $s.location.foundNewlineCharacter,
                            ($s) => {
                                location.line = $d.increment(location.line)
                                location.character = pl.cc(($s.type), ($s) => {
                                    switch ($s[0]) {
                                        case 'carriage return':
                                            return pl.cc($s[1], ($s) => {
                                                return $d.isEqual({ 'this': $, 'that': $c.characters.whitespace['line feed'] })
                                                    ? $c.location.firstCharacter
                                                    : $d.increment($c.location.firstCharacter) //this is already the next character
                                            })
                                        case 'line feed':
                                            return pl.cc($s[1], ($s) => {
                                                return $d.isEqual({ 'this': $, 'that': $c.characters.whitespace['carriage return'] })
                                                    ? $c.location.firstCharacter
                                                    : $d.increment($c.location.firstCharacter) //this is already the next character
                                            })
                                        default: return pl.au($s[0])
                                    }
                                })
                                location.foundNewlineCharacter = [false]
                            },
                            () => {
                                location.character = $d.increment(location.character)
                                if ($d.isEqual({ 'this': $, 'that': $c.characters.whitespace['carriage return'] })) {
                                    location.foundNewlineCharacter = [true, {
                                        'startLocation': createLocation(),
                                        'type': ['carriage return', {}],
                                    }]
                                } else {
                                    if ($d.isEqual({ 'this': $, 'that': $c.characters.whitespace['line feed'] })) {
                                        location.foundNewlineCharacter = [true, {
                                            'startLocation': createLocation(),
                                            'type': ['line feed', {}],
                                        }]
                                    } else {
                                        //nothing to do
                                    }
                                }
                            }
                        )
                    }
                    switch ($s.currentToken[0]) {
                        case 'block comment':
                            pl.cc($s.currentToken[1], ($s) => {
                                if ($s.foundAsterisk) {
                                    if ($d.isEqual({ 'this': $, 'that': $c.characters.comment.solidus })) {
                                        flushSnippet()
                                        onStart(['block comment', {}])
                                        noCurrentToken()
                                    } else {
                                        //not the end of the comment
                                        pushCharacter($c.characters.comment.asterisk)
                                        pushCharacter($)
                                    }

                                } else {
                                    if ($d.isEqual({ 'this': $, 'that': $c.characters.comment.asterisk })) {
                                        $s.foundAsterisk = true
                                    } else {
                                        pushCharacter($)
                                    }
                                }
                            })
                            break
                        case 'line comment':
                            pl.cc($s.currentToken[1], ($s) => {
                                pl.implementMe("@@@@1")
                            })
                            break
                        case 'non wrapped string':
                            pl.cc($s.currentToken[1], ($s) => {
                                pl.implementMe("@@@@2")
                            })
                            break
                        case 'none':
                            pl.cc($s.currentToken[1], ($s) => {
                                pl.implementMe("@@@@3")
                                $s.found
                            })
                            break
                        case 'whitespace':
                            pl.cc($s.currentToken[1], ($s) => {
                                pl.implementMe("@@@@4")
                            })
                            break
                        case 'wrapped string':
                            pl.cc($s.currentToken[1], ($s) => {
                                pl.implementMe("@@@@5")
                                $s.foundNewlineCharacter
                                $s.slashed
                                $s.startCharacter
                                $s.unicode
                            })
                            break
                        default: pl.au($s.currentToken[0])
                    }
                })
            },
            onEnd: () => {
                switch ($s.currentToken[0]) {
                    case 'block comment':
                        pl.cc($s.currentToken[1], ($s) => {
                            onError(['unterminated block comment', {}])
                            flushSnippet()
                            onEnd()
                            noCurrentToken()
                        })
                        break
                    case 'line comment':
                        pl.cc($s.currentToken[1], ($s) => {
                            flushSnippet()
                            onEnd()
                            noCurrentToken()
                        })
                        break
                    case 'non wrapped string':
                        pl.cc($s.currentToken[1], ($s) => {
                            flushSnippet()
                            onEnd()
                            noCurrentToken()
                        })
                        break
                    case 'none':
                        pl.cc($s.currentToken[1], ($s) => {
                            switch ($s.found[0]) {
                                case 'newlineCharacter':
                                    pl.cc($s.found[1], ($s) => {
                                        onPretoken(['newline', {}])
                                    })
                                    break
                                case 'nothing':
                                    pl.cc($s.found[1], ($s) => {
                                    })
                                    break
                                case 'solidus':
                                    pl.cc($s.found[1], ($s) => {
                                        onError(['found dangling slash at the end of the text', {}])
                                    })
                                    break
                                default: pl.au($s.found[0])
                            }
                            noCurrentToken()
                        })
                        break
                    case 'whitespace':
                        pl.cc($s.currentToken[1], ($s) => {
                            flushSnippet()
                            onEnd()
                            noCurrentToken()
                        })
                        break
                    case 'wrapped string':
                        pl.cc($s.currentToken[1], ($s) => {
                            onError(['unterminated string', {}])
                            flushSnippet()
                            onEnd()
                            noCurrentToken()
                        })
                        break
                    default: pl.au($s.currentToken[0])
                }
                $i.handler.onEnd(createLocation())
            }
        }
    }
}