import { API } from "./api.generated"
import { $$ as icreatePreTokenizer } from "./implementations/createPreTokenizer.b"
import { $$ as icreateTokenizer } from "./implementations/createTokenizer.b"

export const $api: API = {
    'createPreTokenizer': icreatePreTokenizer,
    'createTokenizer': icreateTokenizer,
}