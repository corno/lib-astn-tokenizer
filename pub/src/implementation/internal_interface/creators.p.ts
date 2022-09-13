import * as tc from "api-astn-tokenconsumer"

import * as api from "../../interface"

import { TokenizerError } from "./types/TokenizerError"


export type IStreamConsumer = {
    onData: ($: string) => void
    onEnd: () => void
}


export type CreateTokenizer = ($p: {
    consumer: tc.ITokenConsumer<api.TokenizerAnnotationData>
}) => IStreamConsumer


export type CreateCreateTokenizer = (
    $i: {
        onError: ($: {
            error: TokenizerError
            range: api.Range
        }) => void
    }
) => CreateTokenizer

export type CreateCreateTokenizerWithSerializedError = (
    $i: {
        onError: (
            $: {
                error: string,
                range: api.Range
            }
        ) => void
    }
) => CreateTokenizer