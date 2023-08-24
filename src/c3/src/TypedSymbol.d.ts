import { IType } from "./types";
import { BaseSymbol } from "./BaseSymbol";
/** A symbol with an attached type (variables, fields etc.). */
export declare class TypedSymbol extends BaseSymbol {
    type: IType | undefined;
    constructor(name: string, type?: IType);
}
