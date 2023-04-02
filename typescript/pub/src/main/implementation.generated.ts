import { API } from "./api.generated"
import { $$ as icreatePretokenErrorMessage } from "./implementations/createPretokenErrorMessage.s.f"
import { $$ as icreatePretokenizer } from "./implementations/createPretokenizer.a.c"
import { $$ as icreateTokenizer } from "./implementations/createTokenizer.a.c"

export const $api: API = {
    'createPretokenErrorMessage': icreatePretokenErrorMessage,
    'createPretokenizer': icreatePretokenizer,
    'createTokenizer': icreateTokenizer,
}