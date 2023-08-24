import { ParameterSymbol } from "./ParameterSymbol";
import { ScopedSymbol } from "./ScopedSymbol";
import { VariableSymbol } from "./VariableSymbol";
import { IType } from "./types";
/** A standalone function/procedure/rule. */
export declare class RoutineSymbol extends ScopedSymbol {
    returnType?: IType;
    constructor(name: string, returnType?: IType);
    getVariables(_localOnly?: boolean): Promise<VariableSymbol[]>;
    getParameters(_localOnly?: boolean): Promise<ParameterSymbol[]>;
}
