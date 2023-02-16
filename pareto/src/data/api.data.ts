import * as pr from 'pareto-core-raw'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    nested,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands.p"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

import { $ as glossary } from "./glossary.data"

const d = pr.wrapRawDictionary

export const $: mmoduleDefinition.T.ModuleDefinition = {
    'glossary': glossary,
    'api': {
        'imports': d({
            //"common": "glo-pareto-common",
            "bool": "res-pareto-boolean",
            "string": "res-pareto-string",
            "tostring": "res-pareto-tostring",
        }),
        'algorithms': d({
            "createBoundPretokenizer": algorithm(definitionReference("Pretokenize"), constructor(null, {
                "onError": definitionReference("OnPretokenError"),
            })),
            "createPretokenizer": algorithm(definitionReference("PretokenizeCharacters"), constructor(typeReference("PretokenizerConfigurationData"), {
                "onError": definitionReference("OnPretokenError"),
                "convertToCharacters": definitionReference("string", {}, "ToCharacterArray"),
                "convertToString": definitionReference("string", {}, "FromCharacterArray"),
                "isEqual": definitionReference("bool", {}, "Equal"),
                "increment": definitionReference("Increment"),
            })),
            "createPretokenErrorMessage": algorithm(definitionReference("CreatePretokenErrorMessage")),
            "createTokenizer": algorithm(definitionReference("Tokenize"), constructor(null, {
                "arrayToString": definitionReference("tostring", {}, "GetArrayAsString")
            })),
        })
    },
}
