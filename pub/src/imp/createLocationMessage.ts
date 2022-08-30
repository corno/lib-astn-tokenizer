import * as inf from "../interface"

export function printLocation(
    $: {
        location: inf.LocationInfo,
        zerobased: boolean,
    }
): string {
    if ($.zerobased) {
        return `${$.location.line - 1}:${$.location.character - 1}`
    } else {
        return `${$.location.line}:${$.location.character}`
    }
}