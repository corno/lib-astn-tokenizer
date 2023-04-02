import { API } from "./api.generated"
import { $$ as iupdatePosition } from "./implementations/updatePosition.s.f"

export const $api: API = {
    'updatePosition': iupdatePosition,
}