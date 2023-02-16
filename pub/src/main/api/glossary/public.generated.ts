import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as mtc from "glo-astn-tokenconsumer"

export type IOnPretokenError = ($: T.PretokenError, ) => void

export type IOnTokenError = ($: T.TokenError, ) => void

export type IPretokenConsumer = {
    'onData': ($: T.Pretoken, ) => void
    'onEnd': ($: T.LocationInfo, ) => void
}

export type IPretokenizerHandler = {
    'handler': IPretokenConsumer
    'onError': IOnPretokenError
}

export type IStringStreamConsumer = {
    'onData': ($: mcommon.T.String, ) => void
    'onEnd': () => void
}

export type ITokenizerHandler = {
    'handler': mtc.ITokenConsumer<T.TokenizerAnnotationData>
    'onError': IOnTokenError
}

export type FCreatePretokenErrorMessage = ($: T.PretokenError,) => mcommon.T.String

export type FIncrement = ($: mcommon.T.Number,) => mcommon.T.Number

export type FOnPretokenError = ($: T.PretokenError,) => void

export type FPretokenize = ($: mcommon.T.Null, $i: IPretokenizerHandler,) => IStringStreamConsumer

export type FPretokenizeCharacters = ($: mcommon.T.Null, $i: IPretokenizerHandler,) => IStringStreamConsumer

export type FTokenize = ($: mcommon.T.Null, $i: ITokenizerHandler,) => IPretokenConsumer