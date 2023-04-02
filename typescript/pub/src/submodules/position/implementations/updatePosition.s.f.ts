import * as pl from 'pareto-core-lib'

import { A } from "../api.generated"

export const $$: A.updatePosition = ($c, $d) => {
    return ($) => {
        const $param = $
        return {
            'absolute': $d.incrementWithOne($param['current position'].absolute),
            'relative': pl.cc($.character, ($) => {
                switch ($[0]) {
                    case 'consequetive newline':
                        return pl.cc($[1], () => {
                            return $param['current position'].relative
                        })
                    case 'initial newline':
                        return pl.cc($[1], () => {
                            return {
                                'line': $d.incrementWithOne($param['current position'].relative.line),
                                'character': $c.firstCharacter,
                            }
                        })
                    case 'other':
                        return pl.cc($[1], ($) => {
                            return {
                                'line': $param['current position'].relative.line,
                                'character': $d.isTab($)
                                    ? $d.incrementWithTabSize($param['current position'].relative.character)
                                    : $d.incrementWithOne($param['current position'].relative.character)
                            }
                        })


                    default: return pl.au($[0])
                }
            }),
            // 'line': pl.cc(($d.getCharacterPositionType($.character)), ($) => {
            //     switch ($[0]) {
            //         case 'other':
            //             return pl.cc($[1], ($) => {
            //                 return $param['current position'].line
            //             })
            //         case 'tab':
            //             return pl.cc($[1], ($) => {
            //                 return $param['current position'].line
            //             })
            //         case 'carriage return':
            //             return pl.cc($[1], ($) => {
            //                 return pl.optional(
            //                     $param['current position']['found newline'],
            //                     ($) => {
            //                         return $[0] === 'line feed'
            //                             ? $param['current position'].line
            //                             : $d.incrementWithOne($param['current position'].line)
            //                     },
            //                     () => {
            //                         return $d.incrementWithOne($param['current position'].line)
            //                     }
            //                 )
            //             })
            //         case 'line feed':
            //             return pl.cc($[1], ($) => {
            //                 return pl.optional(
            //                     $param['current position']['found newline'],
            //                     ($) => {
            //                         return $[0] === 'carriage return'
            //                             ? $param['current position'].line
            //                             : $d.incrementWithOne($param['current position'].line)
            //                     },
            //                     () => {
            //                         return $d.incrementWithOne($param['current position'].line)
            //                     }
            //                 )
            //             })
            //         default: return pl.au($[0])
            //     }
            // }),
            // 'character': pl.cc(($d.getCharacterPositionType($.character)), ($) => {
            //     switch ($[0]) {
            //         case 'other':
            //             return pl.cc($[1], ($) => {
            //                 return $d.incrementWithOne($param['current position'].character)
            //             })
            //         case 'tab':
            //             return pl.cc($[1], ($) => {
            //                 return $d.incrementWithTabSize($param['current position'].character)
            //             })
            //         case 'carriage return':
            //             return $c.firstCharacter
            //         case 'line feed':
            //             return $c.firstCharacter
            //         default: return pl.au($[0])
            //     }
            // }),
            // 'found newline': pl.cc(($d.getCharacterPositionType($param.character)), ($) => {
            //     switch ($[0]) {
            //         case 'other':
            //             return pl.cc($[1], ($) => {
            //                 return [false]
            //             })
            //         case 'tab':
            //             return pl.cc($[1], ($) => {
            //                 return [false]
            //             })
            //         case 'carriage return':
            //             return pl.cc($[1], ($) => {
            //                 return pl.optional(
            //                     $param['current position']['found newline'],
            //                     ($) => {
            //                         return $[0] === 'line feed'
            //                             ? [false]
            //                             : [true, ['carriage return', null]]
            //                     },
            //                     () => {
            //                         return [false]
            //                     }
            //                 )
            //             })
            //         case 'line feed':
            //             return pl.cc($[1], ($) => {
            //                 return pl.optional(
            //                     $param['current position']['found newline'],
            //                     ($) => {
            //                         return $[0] === 'carriage return'
            //                             ? [false]
            //                             : [true, ['carriage return', null]]
            //                     },
            //                     () => {
            //                         return [false]
            //                     }
            //                 )
            //             })
            //         default: return pl.au($[0])
            //     }
            // })
        }
    }
}