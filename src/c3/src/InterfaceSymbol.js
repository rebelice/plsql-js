"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceSymbol = void 0;
const types_1 = require("./types");
const FieldSymbol_1 = require("./FieldSymbol");
const MethodSymbol_1 = require("./MethodSymbol");
const ScopedSymbol_1 = require("./ScopedSymbol");
class InterfaceSymbol extends ScopedSymbol_1.ScopedSymbol {
    reference = types_1.ReferenceKind.Irrelevant;
    /** Typescript allows an interface to extend a class, not only interfaces. */
    // eslint-disable-next-line no-use-before-define
    extends;
    constructor(name, ext) {
        super(name);
        this.extends = ext;
    }
    get baseTypes() { return this.extends; }
    get kind() { return types_1.TypeKind.Interface; }
    /**
     * @param _includeInherited not used
     *
     * @returns a list of all methods.
     */
    getMethods(_includeInherited = false) {
        return this.getSymbolsOfType(MethodSymbol_1.MethodSymbol);
    }
    /**
     * @param _includeInherited Not used.
     *
     * @returns all fields.
     */
    getFields(_includeInherited = false) {
        return this.getSymbolsOfType(FieldSymbol_1.FieldSymbol);
    }
}
exports.InterfaceSymbol = InterfaceSymbol;
//# sourceMappingURL=InterfaceSymbol.js.map