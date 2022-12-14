import * as api from "../api"
import { createLocationMessage } from "./public/createLocationMessage.p"

export const $a: api.API = {
    createLocationString: createLocationMessage,
}

// import { createCreateTokenizer, createCreateTokenizerWithSerializedError } from "./createCreateTokenizer"
// import { printTokenizerError } from "./printTokenizerError"
// import { printLocation } from "./createLocationMessage"
// import { printRange } from "./printRange"
// import { getEndLocationFromRange } from "./getEndLocationFromRange"

// export function init(): API {
//     return {
//         createCreateTokenizer: createCreateTokenizer,
//         createCreateTokenizerWithSerializedError: createCreateTokenizerWithSerializedError,
//         createTokenizerErrorMessage: printTokenizerError,
//         createLocationMessage: printLocation,
//         createRangeMessage: printRange,
//         getEndLocationFromRange: getEndLocationFromRange,
//     }

// }

// export type PrintTokenizerError = ($: api.TokenizerError) => string


export * from "./public/createLocationMessage.p"