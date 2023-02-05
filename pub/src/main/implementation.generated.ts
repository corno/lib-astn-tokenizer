import { API } from "./api"
import { $$ as icreateBoundPretokenizer } from "./implementations/createBoundPretokenizer.p"
import { $$ as icreatePretokenizer } from "./implementations/createPretokenizer.p"
import { $$ as icreateTokenizer } from "./implementations/createTokenizer.p"

export const $a: API = {
    'createBoundPretokenizer': icreateBoundPretokenizer,
    'createPretokenizer': icreatePretokenizer,
    'createTokenizer': icreateTokenizer,
}