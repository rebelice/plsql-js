import { ReferenceKind, IType, TypeKind } from "./types";
import { BaseSymbol } from "./BaseSymbol";
/** An alias for another type. */
export declare class TypeAlias extends BaseSymbol implements IType {
    private targetType;
    constructor(name: string, target: IType);
    get baseTypes(): IType[];
    get kind(): TypeKind;
    get reference(): ReferenceKind;
}
