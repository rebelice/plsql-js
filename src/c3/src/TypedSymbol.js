"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedSymbol = void 0;
const BaseSymbol_1 = require("./BaseSymbol");
/** A symbol with an attached type (variables, fields etc.). */
class TypedSymbol extends BaseSymbol_1.BaseSymbol {
    type;
    constructor(name, type) {
        super(name);
        this.type = type;
    }
}
exports.TypedSymbol = TypedSymbol;
//# sourceMappingURL=TypedSymbol.js.map