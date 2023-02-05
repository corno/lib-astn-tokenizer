import * as pt from "pareto-core-types"

//import * as tc from "glo-astn-tokenconsumer"
import { TLineLocation, TPreToken, TRange, TTokenizerAnnotationData, TTokenizerError } from "./types.p"

export type PStreamConsumer = pt.Procedure<string>

export type FCreateTokenizer = ($i: {
    //consumer: tc.ITokenConsumer<TTokenizerAnnotationData>,
    onError: ($: {
        error: TTokenizerError
        range: TRange
    }) => void,
}) => PStreamConsumer

export type PPreTokenConsumer = pt.Procedure<TPreToken>

export type FCreateLocationMessage = ($: TLineLocation) => string

export type FCreateRangeMessage = ($: TRange) => string
