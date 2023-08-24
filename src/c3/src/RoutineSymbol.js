"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineSymbol = void 0;
const ParameterSymbol_1 = require("./ParameterSymbol");
const ScopedSymbol_1 = require("./ScopedSymbol");
const VariableSymbol_1 = require("./VariableSymbol");
/** A standalone function/procedure/rule. */
class RoutineSymbol extends ScopedSymbol_1.ScopedSymbol {
    returnType; // Can be null if result is void.
    constructor(name, returnType) {
        super(name);
        this.returnType = returnType;
    }
    getVariables(_localOnly = true) {
        return this.getSymbolsOfType(VariableSymbol_1.VariableSymbol);
    }
    getParameters(_localOnly = true) {
        return this.getSymbolsOfType(ParameterSymbol_1.ParameterSymbol);
    }
}
exports.RoutineSymbol = RoutineSymbol;
//# sourceMappingURL=RoutineSymbol.js.map