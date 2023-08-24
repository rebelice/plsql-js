"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSymbol = void 0;
const VariableSymbol_1 = require("./VariableSymbol");
/** A field which belongs to a class or other outer container structure. */
class FieldSymbol extends VariableSymbol_1.VariableSymbol {
    setter;
    getter;
}
exports.FieldSymbol = FieldSymbol;
//# sourceMappingURL=FieldSymbol.js.map