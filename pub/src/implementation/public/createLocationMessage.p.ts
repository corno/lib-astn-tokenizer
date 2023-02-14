import * as api from "../api"

export const createLocationMessage: api.FCreateLocationMessage = (
    $
) => {
    return `${$.line}:${$.character}`
}