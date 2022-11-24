import { TLocationInfo } from "./Location.p"

export type TRange = {
    readonly "start": TLocationInfo
    readonly "length": number
    readonly "size": TRangeSize
}

export type TRangeSize =
    | ["single line", {
        "column offset": number
    }]
    | ["multi line", {
        "line offset": number
        "column": number
    }]
