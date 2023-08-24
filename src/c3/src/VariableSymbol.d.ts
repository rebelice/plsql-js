import { TypedSymbol } from "./TypedSymbol";
import { IType } from "./types";
export declare class VariableSymbol extends TypedSymbol {
    value: unknown;
    constructor(name: string, value: unknown, type?: IType);
}
