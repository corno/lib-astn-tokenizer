import { API } from "./api.generated"
import { $$ as igetCommentCharacter } from "./implementations/getCommentCharacter.s.f"
import { $$ as igetNonWrappedCharacterType } from "./implementations/getNonWrappedCharacterType.s.f"
import { $$ as igetPossibleNewlineCharacter } from "./implementations/getPossibleNewlineCharacter.s.f"
import { $$ as iisTab } from "./implementations/isTab.s.f"

export const $api: API = {
    'getCommentCharacter': igetCommentCharacter,
    'getNonWrappedCharacterType': igetNonWrappedCharacterType,
    'getPossibleNewlineCharacter': igetPossibleNewlineCharacter,
    'isTab': iisTab,
}