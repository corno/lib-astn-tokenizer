import { TokenError } from "./TokenError"

export type Tokenizer2Error =
| ["unexpected newline", null]
| ["unexpected snippet", null]
| ["unexpected start of token", null]
| ["unexpected, parser is already in 'none' mode", null]
| ["Unexpected block comment end", null]
| ["Unexpected line comment end", null]
| ["Unexpected nonwrapped string end", null]
| ["Unexpected whitespace end", null]

export type TokenizerError =
| ["pre", TokenError]
| ["tokenizer", Tokenizer2Error]