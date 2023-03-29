import { API } from "./api.generated"
import { $$ as icreatePretokenErrorMessage } from "./implementations/createPretokenErrorMessage.s.f"
import { $$ as icreatePretokenizerCreator } from "./implementations/createPretokenizerCreator.a.c"
import { $$ as icreateTokenizerCreator } from "./implementations/createTokenizerCreator.a.c"

export const $api: API = {
    'createPretokenErrorMessage': icreatePretokenErrorMessage,
    'createPretokenizerCreator': icreatePretokenizerCreator,
    'createTokenizerCreator': icreateTokenizerCreator,
}