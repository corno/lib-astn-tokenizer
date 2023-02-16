import { API } from "./api"
import { $$ as icreateBoundPretokenizer } from "./implementations/createBoundPretokenizer.p"
import { $$ as icreatePretokenErrorMessage } from "./implementations/createPretokenErrorMessage.p"
import { $$ as icreatePretokenizer } from "./implementations/createPretokenizer.p"
import { $$ as icreateTokenizer } from "./implementations/createTokenizer.p"

export const $a: API = {
    'createBoundPretokenizer': icreateBoundPretokenizer,
    'createPretokenErrorMessage': icreatePretokenErrorMessage,
    'createPretokenizer': icreatePretokenizer,
    'createTokenizer': icreateTokenizer,
}