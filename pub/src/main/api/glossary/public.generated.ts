import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as gcommon from "glo-pareto-common"
import * as gtc from "glo-astn-tokenconsumer"

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
    'onData': ($: gcommon.T.String, ) => void
    'onEnd': () => void
}

export type ITokenizerHandler = {
    'handler': gtc.ITokenConsumer<T.TokenizerAnnotationData>
    'onError': IOnTokenError
}

export type FCreatePretokenErrorMessage = ($: T.PretokenError,) => gcommon.T.String

export type FIncrement = ($: gcommon.T.Number,) => gcommon.T.Number

export type FOnPretokenError = ($: T.PretokenError,) => void

export type FPretokenize = ($: gcommon.T.Null, $i: IPretokenizerHandler,) => IStringStreamConsumer

export type FPretokenizeCharacters = ($: gcommon.T.Null, $i: IPretokenizerHandler,) => IStringStreamConsumer

export type FTokenize = ($: gcommon.T.Null, $i: ITokenizerHandler,) => IPretokenConsumer