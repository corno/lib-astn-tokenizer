import { API } from "./api.generated"
import { $$ as icreatePostTokenizer } from "./implementations/createPostTokenizer.a.c"
import { $$ as icreatePreTokenErrorMessage } from "./implementations/createPreTokenErrorMessage.s.f"
import { $$ as icreatePreTokenizer } from "./implementations/createPreTokenizer.a.c"

export const $api: API = {
    'createPostTokenizer': icreatePostTokenizer,
    'createPreTokenErrorMessage': icreatePreTokenErrorMessage,
    'createPreTokenizer': icreatePreTokenizer,
}