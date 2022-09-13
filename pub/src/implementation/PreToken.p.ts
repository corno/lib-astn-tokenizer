import * as tc from "api-astn-tokenconsumer"

import * as api from "../interface"


export type WrappedStringType =
    | ["apostrophe", null]
    | ["quote", null]
    | ["multiline", {
        previousLines: string[]
    }]

/**
 * A PreToken is a low level token
 */
export type PreToken = {
    type:
    | ["header start", {
        range: api.Range
    }]
    | ["block comment begin", {
        range: api.Range
    }]
    | ["block comment end", {
        range: api.Range //| null
    }]
    | ["line comment begin", {
        range: api.Range
    }]
    | ["line comment end", {
        location: api.Location //| null
    }]
    | ["newline", {
        range: api.Range //| null
    }]
    | ["structural", {
        type: tc.StructuralTokenType
        range: api.Range
    }]
    | ["wrapped string begin", {
        range: api.Range
        type: WrappedStringType
    }]
    | ["wrapped string end", {
        range: api.Range
        wrapper: string | null
    }]
    | ["snippet", {
        chunk: string
        begin: number
        end: number
    }]
    | ["non wrapped string begin", {
        location: api.LocationInfo
    }]
    | ["non wrapped string end", {
        location: api.LocationInfo //| null
    }]
    | ["whitespace begin", {
        location: api.LocationInfo
    }]
    | ["whitespace end", {
        location: api.LocationInfo //| null
    }]
}