import * as pt from 'pareto-core-types'

import * as g_bool from "res-pareto-boolean"
import * as g_build from "res-pareto-build"
import * as g_character from "../submodules/character"
import * as g_position from "../submodules/position"
import * as g_pretokenizer from "res-astn-pretokenizer"
import * as g_string from "res-pareto-string"
import * as g_this from "./glossary"

export namespace D {
    
    export type createPostTokenizer = {
        readonly 'createArrayBuilder': g_build.ASYNC.A.C.CreateArrayBuilder
        readonly 'createStringBuilder': g_build.ASYNC.A.C.CreateStringBuilder
    }
    
    
    export type createPreTokenizer = {
        readonly 'createStringFromCharactersBuilder': g_pretokenizer.ASYNC.A.C.CreateStringFromCharactersBuilder
        readonly 'createStringSplitter': g_pretokenizer.ASYNC.A.C.CreateStringSplitter
        readonly 'getCommentCharacter': g_character.SYNC.A.F.GetCommentCharacter
        readonly 'getNonWrappedCharacterType': g_character.SYNC.A.F.GetNonWrappedCharacterType
        readonly 'getPossibleNewlineCharacter': g_character.SYNC.A.F.GetPossibleNewlineCharacter
        readonly 'updatePosition': g_position.SYNC.A.F.UpdatePosition
    }
}

export namespace A {
    
    export type createPostTokenizer = ($d: D.createPostTokenizer, ) => g_this.ASYNC.A.C.CreatePostTokenizer
    
    export type createPreTokenErrorMessage = () => g_this.SYNC.A.F.CreatePreTokenErrorMessage
    
    export type createPreTokenizer = ($: g_position.T.Position, $d: D.createPreTokenizer, ) => g_this.ASYNC.A.C.CreatePreTokenizer
}

export type API = {
    readonly 'createPostTokenizer': A.createPostTokenizer
    readonly 'createPreTokenErrorMessage': A.createPreTokenErrorMessage
    readonly 'createPreTokenizer': A.createPreTokenizer
}