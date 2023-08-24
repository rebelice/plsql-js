import { IType, ReferenceKind, TypeKind } from "./types";
import { BaseSymbol } from "./BaseSymbol";
export declare class ArrayType extends BaseSymbol implements IType {
    readonly elementType: IType;
    readonly size: number;
    private referenceKind;
    constructor(name: string, referenceKind: ReferenceKind, elemType: IType, size?: number);
    get baseTypes(): IType[];
    get kind(): TypeKind;
    get reference(): ReferenceKind;
}
