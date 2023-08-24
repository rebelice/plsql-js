import { IType, ReferenceKind, TypeKind } from "./types";
import { ClassSymbol } from "./ClassSymbol";
import { FieldSymbol } from "./FieldSymbol";
import { MethodSymbol } from "./MethodSymbol";
import { ScopedSymbol } from "./ScopedSymbol";
export declare class InterfaceSymbol extends ScopedSymbol implements IType {
    reference: ReferenceKind;
    /** Typescript allows an interface to extend a class, not only interfaces. */
    readonly extends: Array<ClassSymbol | InterfaceSymbol>;
    constructor(name: string, ext: Array<ClassSymbol | InterfaceSymbol>);
    get baseTypes(): IType[];
    get kind(): TypeKind;
    /**
     * @param _includeInherited not used
     *
     * @returns a list of all methods.
     */
    getMethods(_includeInherited?: boolean): Promise<MethodSymbol[]>;
    /**
     * @param _includeInherited Not used.
     *
     * @returns all fields.
     */
    getFields(_includeInherited?: boolean): Promise<FieldSymbol[]>;
}
