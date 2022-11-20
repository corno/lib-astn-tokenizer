import * as lib from "../../../lib";
import * as pa from "pareto-core-types";
import { Directory, File } from "pareto-handledfilesystem-api";
import * as ta from "pareto-test-api";
import * as afAPI from "pareto-async-functions-api";
export declare function getTests(path: string, rewrite: afAPI.Rewrite, tuple3: afAPI.Tuple3, directory: Directory, file: File, createCreateTokenizer: lib.CreateCreateTokenizer, validateFile: ta.ValidateFile): pa.IAsync<ta.TTestResult>;
