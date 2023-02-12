import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"

export type IPretokenHandler = ($: T.Pretoken, ) => void

export type IStringStreamConsumer = {
    'onData': ($: mcommon.T.String, ) => void
    'onEnd': () => void
}

export type ITokenHandler = ($: T.Token, ) => void

export type FConvertToCharacters = ($: mcommon.T.String,) => T.Characters

export type FConvertToString = ($: T.Characters,) => mcommon.T.String

export type FIncrement = ($: mcommon.T.Number,) => mcommon.T.Number

export type FOnPretokenError = ($: T.PretokenError,) => void

export type FOnTokenError = ($: T.TokenError,) => void

export type FPretokenize = ($: mcommon.T.Null, $i: IPretokenHandler,) => IStringStreamConsumer

export type FPretokenizeCharacters = ($: mcommon.T.Null, $i: IPretokenHandler,) => IStringStreamConsumer

export type FTokenize = ($: mcommon.T.Null, $i: ITokenHandler,) => IPretokenHandler