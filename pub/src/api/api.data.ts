import { CCreatePretokenizer } from "./constructors.p"
import * as glossary from "./glossary"

export type API = {
    createLocationString: ($: glossary.TLineLocation) => string
    createPretokenizer: CCreatePretokenizer
}