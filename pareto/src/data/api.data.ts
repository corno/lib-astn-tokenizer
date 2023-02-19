import * as pd from 'pareto-core-data'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    nested,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

import { $ as glossary } from "./glossary.data"

const d = pd.d

export const $: mmoduleDefinition.T.ModuleDefinition<pd.SourceLocation> = {
    'glossary': glossary,
    'api': {
        'imports': d({
            //"common": "glo-pareto-common",
            "arithmetic": "res-pareto-arithmetic",
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
                "add": definitionReference("arithmetic", {}, "Add"),
            })),
            "createPretokenErrorMessage": algorithm(definitionReference("CreatePretokenErrorMessage")),
            "createTokenizer": algorithm(definitionReference("Tokenize"), constructor(null, {
                "arrayToString": definitionReference("tostring", {}, "GetArrayAsString")
            })),
        })
    },
}
