import { createCreateTokenizer, createCreateTokenizerWithSerializedError } from "./createCreateTokenizer"
import { printTokenizerError } from "./printTokenizerError"
import { printLocation } from "./createLocationMessage"
import { printRange } from "./printRange"
import { getEndLocationFromRange } from "./getEndLocationFromRange"
import { API } from "./api"

export function init(): API {
    return {
        createCreateTokenizer: createCreateTokenizer,
        createCreateTokenizerWithSerializedError: createCreateTokenizerWithSerializedError,
        createTokenizerErrorMessage: printTokenizerError,
        createLocationMessage: printLocation,
        createRangeMessage: printRange,
        getEndLocationFromRange: getEndLocationFromRange,
    }

}