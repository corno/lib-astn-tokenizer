import * as api from "../interface"

export function getEndLocationFromRange(range: api.Range): api.LocationInfo {
    return {
        absolutePosition: range.start.absolutePosition + range.length,
        lineLocation: {
            line: range.start.lineLocation.line,
            character: range.size[0] === "single line" ? range.size[1]["column offset"] + range.start.lineLocation.character : range.size[1].column,
        }
    }
}
