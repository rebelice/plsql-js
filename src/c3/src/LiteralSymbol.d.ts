import { TypedSymbol } from "./TypedSymbol";
import { IType } from "./types";
export declare class LiteralSymbol extends TypedSymbol {
    readonly value: unknown;
    constructor(name: string, value: unknown, type?: IType);
}
