
export type TokenError = {
    readonly "type":
    | ["unterminated block comment", null]
    | ["found dangling slash at the end of the text", null]
    | ["unterminated string", null]
    | ["found dangling slash", null]
    | ["expected hexadecimal digit", {
        readonly "found": string
    }]
    | ["expected special character after escape slash", {
        readonly "found": string
    }]
}