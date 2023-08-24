import { IType, ReferenceKind, TypeKind } from "./types";
import { FieldSymbol } from "./FieldSymbol";
import { InterfaceSymbol } from "./InterfaceSymbol";
import { MethodSymbol } from "./MethodSymbol";
import { ScopedSymbol } from "./ScopedSymbol";
/** Classes and structs. */
export declare class ClassSymbol extends ScopedSymbol implements IType {
    isStruct: boolean;
    reference: ReferenceKind;
    /** Usually only one member, unless the language supports multiple inheritance (like C++). */
    readonly extends: ClassSymbol[];
    /** Typescript allows a class to implement a class, not only interfaces. */
    readonly implements: Array<ClassSymbol | InterfaceSymbol>;
    constructor(name: string, ext: ClassSymbol[], impl: Array<ClassSymbol | InterfaceSymbol>);
    get baseTypes(): IType[];
    get kind(): TypeKind;
    /**
     * @param includeInherited Not used.
     *
     * @returns a list of all methods.
     */
    getMethods(includeInherited?: boolean): Promise<MethodSymbol[]>;
    /**
     * @param includeInherited Not used.
     *
     * @returns all fields.
     */
    getFields(includeInherited?: boolean): Promise<FieldSymbol[]>;
}
