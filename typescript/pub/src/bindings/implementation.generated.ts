import { API } from "./api.generated"
import { $$ as icreatePretokenizer } from "./implementations/createPretokenizer.b"
import { $$ as icreateTokenizer } from "./implementations/createTokenizer.b"

export const $api: API = {
    'createPretokenizer': icreatePretokenizer,
    'createTokenizer': icreateTokenizer,
}