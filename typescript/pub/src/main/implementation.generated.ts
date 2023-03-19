import { API } from "./api.generated"
import { $$ as icreatePretokenErrorMessage } from "./implementations/createPretokenErrorMessage.p"
import { $$ as icreatePretokenizerCreator } from "./implementations/createPretokenizerCreator.p"
import { $$ as icreateTokenizerCreator } from "./implementations/createTokenizerCreator.p"

export const $api: API = {
    'createPretokenErrorMessage': icreatePretokenErrorMessage,
    'createPretokenizerCreator': icreatePretokenizerCreator,
    'createTokenizerCreator': icreateTokenizerCreator,
}