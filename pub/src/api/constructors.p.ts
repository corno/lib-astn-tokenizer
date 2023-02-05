import * as pt from "pareto-core-types"
import { PPreTokenConsumer, PStreamConsumer, TRange, TTokenizerError } from "./glossary"

export type CCreatePretokenizer = pt.Creator<
    {
        consumer: PPreTokenConsumer,
        onError: ($: {
            error: TTokenizerError
            range: TRange
        }) => void,
        toArrayOfCharacters: pt.Function<string, pt.Array<number>>
    },
    PStreamConsumer
>