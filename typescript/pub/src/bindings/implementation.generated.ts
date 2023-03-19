import { API } from "./api.generated"
import { $$ as icreateTokenizerCreator } from "./implementations/createTokenizerCreator.p"

export const $api: API = {
    'createTokenizerCreator': icreateTokenizerCreator,
}