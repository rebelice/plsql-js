"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAlias = void 0;
const types_1 = require("./types");
const BaseSymbol_1 = require("./BaseSymbol");
/** An alias for another type. */
class TypeAlias extends BaseSymbol_1.BaseSymbol {
    targetType;
    constructor(name, target) {
        super(name);
        this.targetType = target;
    }
    get baseTypes() {
        return [this.targetType];
    }
    get kind() {
        return types_1.TypeKind.Alias;
    }
    get reference() {
        return types_1.ReferenceKind.Irrelevant;
    }
}
exports.TypeAlias = TypeAlias;
//# sourceMappingURL=TypeAlias.js.map