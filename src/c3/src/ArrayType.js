"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayType = void 0;
const types_1 = require("./types");
const BaseSymbol_1 = require("./BaseSymbol");
class ArrayType extends BaseSymbol_1.BaseSymbol {
    elementType;
    size; // > 0 if fixed length.
    referenceKind;
    constructor(name, referenceKind, elemType, size = 0) {
        super(name);
        this.referenceKind = referenceKind;
        this.elementType = elemType;
        this.size = size;
    }
    get baseTypes() { return []; }
    get kind() { return types_1.TypeKind.Array; }
    get reference() { return this.referenceKind; }
}
exports.ArrayType = ArrayType;
//# sourceMappingURL=ArrayType.js.map