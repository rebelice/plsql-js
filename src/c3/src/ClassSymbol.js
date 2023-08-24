"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSymbol = void 0;
const types_1 = require("./types");
const FieldSymbol_1 = require("./FieldSymbol");
const MethodSymbol_1 = require("./MethodSymbol");
const ScopedSymbol_1 = require("./ScopedSymbol");
/** Classes and structs. */
class ClassSymbol extends ScopedSymbol_1.ScopedSymbol {
    isStruct = false;
    reference = types_1.ReferenceKind.Irrelevant;
    /** Usually only one member, unless the language supports multiple inheritance (like C++). */
    // eslint-disable-next-line no-use-before-define
    extends;
    /** Typescript allows a class to implement a class, not only interfaces. */
    // eslint-disable-next-line no-use-before-define
    implements;
    constructor(name, ext, impl) {
        super(name);
        this.extends = ext;
        this.implements = impl;
    }
    get baseTypes() { return this.extends; }
    get kind() { return types_1.TypeKind.Class; }
    /**
     * @param includeInherited Not used.
     *
     * @returns a list of all methods.
     */
    getMethods(includeInherited = false) {
        return this.getSymbolsOfType(MethodSymbol_1.MethodSymbol);
    }
    /**
     * @param includeInherited Not used.
     *
     * @returns all fields.
     */
    getFields(includeInherited = false) {
        return this.getSymbolsOfType(FieldSymbol_1.FieldSymbol);
    }
}
exports.ClassSymbol = ClassSymbol;
//# sourceMappingURL=ClassSymbol.js.map