import { API } from "./api"
import { $$ as icreateBoundPretokenizer } from "./implementations/createBoundPretokenizer.p"
import { $$ as icreatePretokenizer } from "./implementations/createPretokenizer.p"

export const $a: API = {
    'createBoundPretokenizer': icreateBoundPretokenizer,
    'createPretokenizer': icreatePretokenizer,
}