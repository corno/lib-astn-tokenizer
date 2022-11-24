

import * as tc from "glo-astn-tokenconsumer"
import { IStreamConsumer } from "../interfaces/interfaces.p"

import { TTokenizerAnnotationData } from "../types/TokenizerAnnotationData.p"

export type FCreateTokenizer = ($i: {
    consumer: tc.ITokenConsumer<TTokenizerAnnotationData>,
    onError: ($: {
        error: glosar.TTokenizerError
        range: api.Range
    }) => void,
}) => IStreamConsumer

