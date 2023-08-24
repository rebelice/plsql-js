"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableSymbol = void 0;
const TypedSymbol_1 = require("./TypedSymbol");
class VariableSymbol extends TypedSymbol_1.TypedSymbol {
    value;
    constructor(name, value, type) {
        super(name, type);
        this.value = value;
    }
}
exports.VariableSymbol = VariableSymbol;
//# sourceMappingURL=VariableSymbol.js.map