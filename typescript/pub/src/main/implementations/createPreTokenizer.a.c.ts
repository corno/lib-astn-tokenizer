import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'
import * as pd from 'pareto-core-dev'

import * as g_position from "../../submodules/position"
import * as g_this from "../glossary"
import * as g_pretokenizer from "res-astn-pretokenizer"
import * as g_character from "../../submodules/character"

import { A } from "../api.generated"


export const $$: A.createPreTokenizer = ($c, $d) => {

    ///STATE TYPES

    type SWrapped = {
        'type': SWrapped_Type
        'snippet': g_pretokenizer.ASYNC.I.CharacterStreamConsumer
    }

    type SContext =
        | ['non wrapped', SNonWrapped]
        | ['wrapped', SWrapped]

    type SWrapped_Type =
        | ['block comment', SBlockCommentContext]
        | ['line comment', null]
        | ['string', SStringContext]

    type SBlockCommentContext = {
        'found asterisk': boolean
    }

    type SNewlineCharacterType =
        | ['carriage return', null]
        | ['line feed', null]

    type SNonWrapped = {
        'found':
        | ['nothing', {
            'processing':
            | ['nothing', null]
            | ['string', {
                'snippet': g_pretokenizer.ASYNC.I.CharacterStreamConsumer
            }]
            | ['whitespace', {
                'snippet': g_pretokenizer.ASYNC.I.CharacterStreamConsumer
            }]

        }]
        | ['solidus', null]
    }

    type SWrapper =
        | ['apostrophe', null]
        | ['backtick', null]
        | ['quote', null]

    type SStringContext = {
        'slashed': boolean
        'wrapper': SWrapper
        'unicode': pt.OptionalValue<SUnicode>
    }

    type SUnicode = {
        'charactersLeft': number
        'foundCharacters': pt.Array<number>
    }

    type SPosition = {
        'absolute': number
        'relative': {
            'line': number
            'character': number
        }
    }

    type SState = {
        readonly errorHandler: {
            'data': ($: g_this.T.PreTokenError._ltype) => void;
            'end': () => void;
        }
        readonly handler: {
            'data': ($: g_this.T.PreToken._ltype) => void;
            'end': () => void;
        }
        'context': SContext
        'position': SPosition,
        'found newline': pt.OptionalValue<SNewlineCharacterType>

    }

    // END FUNCTIONS


    function end_Wrapped($s: SWrapped): void {
        $s.snippet.end()
    }

    function end_State($s: SState) {
        switch ($s['context'][0]) {
            case 'non wrapped':
                pl.cc($s['context'][1], ($s) => {
                })
                break
            case 'wrapped':
                pl.cc($s['context'][1], ($s) => {
                    end_Wrapped($s)
                })
                break
            default: pl.au($s['context'][0])
        }
        $s.handler.end()
        $s.errorHandler.end()
    }

    function xx($s: SState): g_pretokenizer.ASYNC.I.StringStreamConsumer {

        return $d.createStringSplitter.construct({
            'handler': {
                'data': ($) => {
                    const $s_state = $s
                    const character = $

                    const newPosition = $d.updatePosition({
                        'character': pl.optional(
                            $d.getPossibleNewlineCharacter($),
                            ($) => {
                                return pl.optional<g_character.T.NewlineCharacter, g_position.T.UpdatePositionData.character>(
                                    $s_state['found newline'],
                                    ($s) => {
                                        return ['consequetive newline', null]
                                    },
                                    () => {
                                        return ['initial newline', null]
                                    }
                                )
                            },
                            () => {
                                return ['other', character]
                            }
                        ),
                        'current position': $s.position,

                    })

                    //is the current character a newline
                    pl.optional(
                        $d.getPossibleNewlineCharacter($),
                        ($) => {
                            //the current character is a newline

                            switch ($[0]) {
                                case 'carriage return':
                                    pl.cc($[1], () => {
                                        //was the previous character a newline?
                                        pl.optional(
                                            $s_state['found newline'],
                                            ($s) => {
                                                //the previous character was a newline
                                                switch ($s[0]) {
                                                    case 'carriage return':
                                                        pl.cc($s[1], () => {
                                                            $s_state.handler.data(['newline', {
                                                                'type': ['cr', null],
                                                                'is suffix': false,
                                                            }])

                                                        })
                                                        break
                                                    case 'line feed':
                                                        pl.cc($s[1], () => {
                                                            $s_state.handler.data(['newline', {
                                                                'type': ['cr', null],
                                                                'is suffix': true,
                                                            }])
                                                            $s_state['found newline'] = [false]
                                                        })
                                                        break
                                                    default: pl.au($s[0])
                                                }
                                            },
                                            () => {
                                                //the previous character was not a newline

                                                $s_state.handler.data(['newline', {
                                                    'type': ['cr', null],
                                                    'is suffix': false,
                                                }])
                                                $s_state['found newline'] = [true, ['carriage return', null]]

                                            }
                                        )
                                    })
                                    break
                                case 'line feed':
                                    pl.cc($[1], () => {
                                        //was the previous character a newline?
                                        pl.optional(
                                            $s_state['found newline'],
                                            ($s) => {
                                                //the previous character was a newline
                                                switch ($s[0]) {
                                                    case 'carriage return':
                                                        pl.cc($s[1], () => {
                                                            $s_state.handler.data(['newline', {
                                                                'type': ['lf', null],
                                                                'is suffix': true,
                                                            }])
                                                            $s_state['found newline'] = [false]

                                                        })
                                                        break
                                                    case 'line feed':
                                                        pl.cc($s[1], () => {
                                                            $s_state.handler.data(['newline', {
                                                                'type': ['lf', null],
                                                                'is suffix': false,
                                                            }])
                                                        })
                                                        break
                                                    default: pl.au($s[0])
                                                }
                                            },
                                            () => {
                                                //the previous character was not a newline

                                                $s_state.handler.data(['newline', {
                                                    'type': ['lf', null],
                                                    'is suffix': false,
                                                }])
                                                $s_state['found newline'] = [true, ['line feed', null]]

                                            }
                                        )
                                    })
                                    break
                                default: pl.au($[0])
                            }

                        },
                        () => {
                            //the current character is *not* a newline

                            //was the previous character a newline?
                            pl.optional(
                                $s_state['found newline'],
                                ($s) => {
                                    //the previous character was a newline
                                    $s_state['found newline'] = [false]
                                },
                                () => {
                                    //the previous character was not a newline
                                }
                            )

                            //process the character

                            //what is the current context? is the tokenizer currenly processing a wrapped token or not?
                            switch ($s.context[0]) {
                                case 'non wrapped':
                                    pl.cc($s.context[1], ($s) => {
                                        //currently no wrapped token is being processed

                                        const $s_nonwrapped = $s

                                        function startWrappedToken($: g_this.T.PreToken._ltype.begin._ltype, $s: SWrapped_Type) {
                                            $s_state.context = ['wrapped', {
                                                'type': $s,
                                                'snippet': $d.createStringFromCharactersBuilder.construct({
                                                    'handler': ($) => {
                                                        $s_state.handler.data(['snippet', $])
                                                        $s_state.handler.data(['end', null])
                                                    }
                                                })
                                            }]
                                            $s_state.handler.data(['begin', {
                                                'type': $
                                            }])

                                        }
                                        function startWrappedString($: SWrapper) {
                                            startWrappedToken(
                                                ['wrapped string', null],
                                                ['string', {
                                                    'wrapper': $,
                                                    'slashed': false,
                                                    'unicode': [false]
                                                }]
                                            )

                                        }
                                        switch ($s.found[0]) {
                                            case 'nothing':
                                                pl.cc($s.found[1], ($s) => {

                                                    //when not processing a string, look for markers indicating a full token or the start of a (possible) token
                                                    const nwct = $d.getNonWrappedCharacterType($)
                                                    switch (nwct[0]) {
                                                        case 'marker':
                                                            pl.cc(nwct[1], ($) => {
                                                                //the current character is a marker

                                                                if ($s['processing'][0] !== 'nothing') {
                                                                    //the tokenizer was processing a string or whitespace, end it first
                                                                    $s['processing'][1].snippet.end()
                                                                    $s['processing'] = ['nothing', null]
                                                                }

                                                                //guaranteed to not be processing a string or whitespace, so cast to state
                                                                pl.cc($s['processing'][1], ($s) => {

                                                                    const $s_nonprocessing = $s

                                                                    switch ($[0]) {
                                                                        case 'apostrophe':
                                                                            pl.cc($[1], ($) => {
                                                                                startWrappedString(['apostrophe', null])
                                                                            })
                                                                            break
                                                                        case 'backtick':
                                                                            pl.cc($[1], ($) => {
                                                                                startWrappedString(['backtick', null])
                                                                            })
                                                                            break
                                                                        case 'quotation mark':
                                                                            pl.cc($[1], ($) => {
                                                                                startWrappedString(['quote', null])
                                                                            })
                                                                            break
                                                                        case 'close angle bracket':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['structural', {
                                                                                    'type': ['close shorthand group', null]
                                                                                }])
                                                                            })
                                                                            break
                                                                        case 'close brace':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['structural', {
                                                                                    'type': ['close dictionary', null]
                                                                                }])
                                                                            })
                                                                            break
                                                                        case 'close bracket':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['structural', {
                                                                                    'type': ['close list', null]
                                                                                }])
                                                                            })
                                                                            break
                                                                        case 'close parenthesis':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['structural', {
                                                                                    'type': ['close verbose group', null]
                                                                                }])
                                                                            })
                                                                            break
                                                                        case 'colon':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['colon', null])
                                                                            })
                                                                            break
                                                                        case 'comma':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['comma', null])

                                                                            })
                                                                            break
                                                                        case 'exclamation mark':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['header start', null])
                                                                            })
                                                                            break
                                                                        case 'open angle bracket':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['structural', {
                                                                                    'type': ['open shorthand group', null]
                                                                                }])
                                                                            })
                                                                            break
                                                                        case 'open brace':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['structural', {
                                                                                    'type': ['open dictionary', null]
                                                                                }])
                                                                            })
                                                                            break
                                                                        case 'open bracket':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['structural', {
                                                                                    'type': ['open list', null]
                                                                                }])
                                                                            })
                                                                            break
                                                                        case 'open parenthesis':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['structural', {
                                                                                    'type': ['open verbose group', null]
                                                                                }])
                                                                            })
                                                                            break
                                                                        case 'solidus':
                                                                            pl.cc($[1], ($) => {
                                                                                //start of comment
                                                                                $s_nonwrapped.found = ['solidus', null]
                                                                            })
                                                                            break
                                                                        case 'vertical line':
                                                                            pl.cc($[1], ($) => {
                                                                                $s_state.handler.data(['structural', {
                                                                                    'type': ['tagged union start', null]
                                                                                }])
                                                                            })
                                                                            break
                                                                        case 'whitespace':
                                                                            pl.cc($[1], ($) => {
                                                                                pd.logDebugMessage("FDSFSDFSDF")
                                                                                const handler = $d.createStringFromCharactersBuilder.construct({
                                                                                    'handler': ($) => {
                                                                                        $s_state.handler.data(['snippet', $])
                                                                                    }
                                                                                })
                                                                                // $s_state['context'] = ['string', {
                                                                                //     'type': ['whitespace', null],
                                                                                //     'snippet': handler
                                                                                // }]
                                                                                // handler.data(char.code)
                                                                            })
                                                                            break
                 
                                                                        default: pl.au($[0])
                                                                    }

                                                                })
                                                            })
                                                            break
                                                        case 'other':
                                                            //a non marker, basically any other valid unicode character
                                                            //this is part of a non wrapped string
                                                            pl.cc(nwct[1], ($) => {
                                                                //if currently not processing a string, start it
                                                                if ($s['processing'][0] === 'nothing') {
                                                                    $s['processing'] = ['string', {
                                                                        'snippet': $d.createStringFromCharactersBuilder.construct({
                                                                            'handler': ($) => {
                                                                                $s_state.handler.data(['snippet', $])
                                                                                $s_state.handler.data(['end', null])
                                                                            }
                                                                        })
                                                                    }]
                                                                    $s_state.handler.data(['begin', {
                                                                        'type': ['non wrapped string', null]
                                                                    }])
                                                                }
                                                                $s['processing'][1].snippet.data(character)
                                                            })
                                                            break
                                                        default: pl.au(nwct[0])
                                                    }
                                                })
                                                break
                                            case 'solidus':
                                                pl.cc($s.found[1], ($s) => {
                                                    pl.cc($d.getCommentCharacter(character), ($) => {
                                                        switch ($[0]) {
                                                            case 'asterisk':
                                                                pl.cc($[1], ($) => {
                                                                    startWrappedToken(
                                                                        ['block comment', null],
                                                                        ['block comment', {
                                                                            'found asterisk': false
                                                                        }],
                                                                    )
                                                                })
                                                                break
                                                            case 'illegal':
                                                                pl.cc($[1], ($) => {
                                                                    $s_state.errorHandler.data(['found dangling slash', null])
                                                                })
                                                                break
                                                            case 'solidus':
                                                                pl.cc($[1], ($) => {
                                                                    startWrappedToken(
                                                                        ['line comment', null],
                                                                        ['line comment', null],
                                                                    )
                                                                })
                                                                break
                                                            default: pl.au($[0])
                                                        }
                                                    })
                                                    $s_nonwrapped.found = ['nothing', {
                                                        'processing': ['nothing', null],

                                                    }]
                                                })
                                                break
                                            default: pl.au($s.found[0])
                                        }

                                    })
                                    break
                                case 'wrapped':
                                    pl.cc($s.context[1], ($s) => {
                                        //currently processing a wrapped token

                                        switch ($s.type[0]) {
                                            case 'block comment':
                                                pl.cc($s.type[1], ($s) => {

                                                })
                                                break
                                            case 'line comment':
                                                pl.cc($s.type[1], ($s) => {

                                                })
                                                break
                                            case 'string':
                                                pl.cc($s.type[1], ($s) => {

                                                })
                                                break
                                            default: pl.au($s.type[0])
                                        }
                                        pd.logDebugMessage("$$@#$@#$@#$")
                                        // function onStart($: g_this.T.PreToken._ltype.begin._ltype) {
                                        //     $s.handler.data(['begin', {
                                        //         'type': $,
                                        //     }])
                                        // }
                                        // function noCurrentToken() {
                                        //     $s['context'] = ['no', { 'found': ['nothing', null] }]
                                        // }
                                        // function init_ProcessingToken_No(): SProcessingToken {
                                        //     return ['no', {
                                        //         'found': ['nothing', null]
                                        //     }]
                                        // }
                                        // function init_ProcessingToken_Yes(props: {
                                        //     type: SProcessingToken_Type
                                        // }): SProcessingToken {
                                        //     return ['string', {
                                        //         'type': props.type,
                                        //         'snippet': $d.createStringFromCharactersBuilder.construct({
                                        //             'handler': ($) => {
                                        //                 $s.handler.data(['snippet', $])
                    
                                        //             }
                                        //         }),
                                        //     }]
                                        // }
                                        //handle the character
                                        // switch ($s['context'][0]) {
                                        //     case 'no':
                                        //         pl.cc($s['context'][1], ($s) => {
                                        //             const $s_pt = $s
                                        //             function handleChar() {
                                        //                 pl.optional(
                                        //                     $.type.nontoken,
                                        //                     ($) => {
                                        //                         handleNonWrappedCharacter($)
                                        //                     },
                                        //                     () => {
                                        //                         $s_state['context'] = ['string', {
                                        //                             'type': ['non string', null],
                                        //                             'snippet': $d.createStringFromCharactersBuilder.construct({
                                        //                                 'handler': ($) => {
                                        //                                     $s_state.handler.data(['snippet', $])
                                        //                                 }
                                        //                             })
                                        //                         }]
                                        //                     }
                                        //                 )
                                        //             }
                                        //             switch ($s.found[0]) {
                                        //                 case 'newlineCharacter':
                                        //                     pl.cc($s.found[1], ($s) => {
                                        //                         switch ($s.type[0]) {
                                        //                             case 'carriage return':
                                        //                                 pl.cc($s.type[1], ($s) => {
                                        //                                     if ($.type.whitespace[0] === true && $.type.whitespace[1][0] === 'line feed') {
                                        //                                         //carriage return / line feed combi
                                        //                                         //newline already sent
                                        //                                     } else {
                                        //                                         //other character
                                        //                                         $s_pt.found = ['nothing', null]
                                        //                                         handleChar()
                                        //                                     }
                                        //                                 })
                                        //                                 break
                                        //                             case 'line feed':
                                        //                                 pl.cc($s.type[1], ($s) => {
                                        //                                     if ($.type.whitespace[0] === true && $.type.whitespace[1][0] === 'carriage return') {
                                        //                                         //line feed / carriage return combi
                                        //                                     } else {
                                        //                                         $s_pt.found = ['nothing', null]
                                        //                                         handleChar()
                                        //                                     }
                                        //                                 })
                                        //                                 break
                                        //                             default: pl.au($s.type[0])
                                        //                         }
                                        //                     })
                                        //                     break
                                        //                 case 'nothing':
                                        //                     handleChar()
                                        //                     break
                                        //                 case 'solidus':
                                        //                     pl.cc($s.found[1], ($s) => {
                    
                                        //                         if ($.type.comment[0] === true && $.type.comment[1][0] === 'asterisk') {
                                        //                             //start of block comment
                                        //                             $s_state.handler.data(['begin', {
                                        //                                 'type': ['block comment', null],
                                        //                             }])
                                        //                             $s_state['context'] = ['string', {
                                        //                                 'type': ['block comment', {
                                        //                                     'foundAsterisk': [false]
                                        //                                 }],
                                        //                                 'snippet': $d.createStringFromCharactersBuilder.construct({
                                        //                                     'handler': ($) => {
                                        //                                         $s_state.handler.data(['snippet', $])
                                        //                                     }
                                        //                                 })
                                        //                             }]
                                        //                         } else {
                                        //                             //not the start of a block comment, a dangling solidus
                                        //                             $s_state.errorHandler.data(['found dangling slash', null])
                                        //                         }
                                        //                     })
                                        //                     break
                                        //                 default: pl.au($s.found[0])
                                        //             }
                                        //         })
                                        //         break
                                        //     case 'string':
                                        //         pl.cc($s['context'][1], ($s) => {
                                        //             const currentToken = $s
                                        //             switch ($s.type[0]) {
                                        //                 case 'block comment':
                                        //                     pl.cc($s.type[1], ($s) => {
                                        //                         pl.optional(
                                        //                             $s.foundAsterisk,
                                        //                             ($s) => {
                    
                                        //                                 if ($.type.comment[0] === true && $.type.comment[1][0] === 'solidus') {
                                        //                                     //end of the comment
                                        //                                     end_Wrapped(currentToken)
                                        //                                     $s_state['context'] = ['no', {
                                        //                                         'found': ['nothing', null]
                                        //                                     }]
                                        //                                 } else {
                                        //                                     //not the end of the comment
                                        //                                     currentToken.snippet.data($s) //send the asterisk
                                        //                                     currentToken.snippet.data($.code) //send the current char
                                        //                                 }
                                        //                             },
                                        //                             () => {
                                        //                                 if ($.type.comment[0] === true && $.type.comment[1][0] === 'asterisk') {
                                        //                                     //possible start of comment
                                        //                                     $s.foundAsterisk = [true, $.code]
                                        //                                 } else {
                                        //                                     currentToken.snippet.data($.code)
                                        //                                 }
                                        //                             }
                                        //                         )
                                        //                     })
                                        //                     break
                                        //                 case 'line comment':
                                        //                     pl.cc($s.type[1], ($s) => {
                                        //                         //if ()
                                        //                         pd.implementMe("@@@@1")
                                        //                     })
                                        //                     break
                                        //                 case 'non string':
                                        //                     pl.cc($s.type[1], ($s) => {
                                        //                         pl.optional(
                                        //                             $.type.nontoken,
                                        //                             ($) => {
                                        //                                 //the end of the non string
                                        //                                 currentToken.snippet.end()
                                        //                                 $s_state['context'] = ['no', {
                                        //                                     'found': ['nothing', null]
                                        //                                 }]
                                        //                                 handleNonWrappedCharacter($)
                                        //                             },
                                        //                             () => {
                                        //                                 //a regular character
                                        //                                 currentToken.snippet.data($.code)
                                        //                             }
                                        //                         )
                                        //                     })
                                        //                     break
                                        //                 case 'whitespace':
                                        //                     pl.cc($s.type[1], ($s) => {
                                        //                         pl.optional(
                                        //                             $.type.whitespace,
                                        //                             ($) => {
                                        //                                 //the end of the non string
                                        //                                 currentToken.snippet.end()
                                        //                                 $s_state['context'] = ['no', {
                                        //                                     'found': ['nothing', null]
                                        //                                 }]
                                        //                                 handleNonWrappedCharacter($)
                                        //                             },
                                        //                             () => {
                                        //                                 //a regular character
                                        //                                 currentToken.snippet.data($.code)
                                        //                             }
                                        //                         )
                                        //                     })
                                        //                     break
                                        //                 case 'string':
                                        //                     pl.cc($s.type[1], ($s) => {
                                        //                         pd.implementMe("@@@@5")
                                        //                         $s.foundNewlineCharacter
                                        //                         $s.slashed
                                        //                         $s.startCharacter
                                        //                         $s.unicode
                                        //                     })
                                        //                     break
                                        //                 default: pl.au($s.type[0])
                                        //             }
                    
                                        //         })
                                        //         break
                                        //     default: pl.au($s['context'][0])
                                        // }
                                    })
                                    break
                                default: pl.au($s.context[0])
                            }

                        }
                    )

                    //update position
                    $s_state.position = newPosition



                },
                'end': () => {
                    const $s_state = $s

                    //were we processing a wrapped token or not?
                    switch ($s['context'][0]) {
                        case 'non wrapped':
                            pl.cc($s['context'][1], ($s) => {
                                switch ($s.found[0]) {
                                    case 'nothing':
                                        pl.cc($s.found[1], ($s) => {
                                            //what (non wrapped) pretoken are we processing
                                            // switch ($s['processing'][0]) {
                                            //     case 'nothing':
                                            //         pl.cc($s['processing'][1], ($s) => {
                                            //         })
                                            //         break
                                            //     case 'string':
                                            //         pl.cc($s['processing'][1], ($s) => {
                                            //             //don't call snippet.end() here
                                            //         })
                                            //         break
                                            //     case 'whitespace':
                                            //         pl.cc($s['processing'][1], ($s) => {
                                            //             //don't call snippet.end() here
                                            //         })
                                            //         break
                                            //     default: pl.au($s['processing'][0])
                                            // }

                                        })
                                        break
                                    case 'solidus':
                                        pl.cc($s.found[1], ($s) => {
                                            $s_state.errorHandler.data(['found dangling slash at the end of the text', null])
                                        })
                                        break
                                    default: pl.au($s.found[0])
                                }
                            })
                            break
                        case 'wrapped':
                            pl.cc($s['context'][1], ($s) => {
                                switch ($s.type[0]) {
                                    case 'block comment':
                                        pl.cc($s.type[1], ($s) => {
                                            $s_state.errorHandler.data(['unterminated block comment', null])
                                        })
                                        break
                                    case 'line comment':
                                        pl.cc($s.type[1], ($s) => {
                                        })
                                        break
                                    case 'string':
                                        pl.cc($s.type[1], ($s) => {
                                            $s_state.errorHandler.data(['unterminated string', null])
                                        })
                                        break
                                    default: pl.au($s.type[0])
                                }
                                $s_state.handler.data(['end', null])
                            })
                            break
                        default: pl.au($s['context'][0])
                    }
                    end_State($s)
                }
            }
        })
    }

    return {
        'construct': ($is) => {

            function createLocation($s: SPosition): g_this.T.LocationInfo {
                return {
                    'absolute position': $s.absolute,
                    'line location': {
                        'character': $s.relative.character,
                        'line': $s.relative.line,
                    }
                }
            }

            const $s: SState = {
                'errorHandler': {
                    'data': ($) => {
                        $is.errorHandler.data({
                            'location': createLocation($s.position),
                            'type': $
                        })
                    },
                    'end': $is.errorHandler.end
                },
                'handler': {
                    'data': ($) => {
                        $is.handler.data({
                            'location': createLocation($s.position),
                            'type': $
                        })
                    },
                    'end': () => {
                        $is.handler.end(createLocation($s.position))
                    }
                },
                'context': ['non wrapped', {
                    'found': ['nothing', {

                        'processing': ['nothing', null],
                    }]

                }],
                'position': $c,
                'found newline': [false],
            }

            return xx($s)
        }
    }
}