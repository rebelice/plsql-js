"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundamentalType = void 0;
const types_1 = require("./types");
/** A single class for all fundamental types. They are distinguished via the kind field. */
class FundamentalType {
    static integerType = new FundamentalType("int", types_1.TypeKind.Integer, types_1.ReferenceKind.Instance);
    static floatType = new FundamentalType("float", types_1.TypeKind.Float, types_1.ReferenceKind.Instance);
    static stringType = new FundamentalType("string", types_1.TypeKind.String, types_1.ReferenceKind.Instance);
    static boolType = new FundamentalType("bool", types_1.TypeKind.Boolean, types_1.ReferenceKind.Instance);
    name;
    typeKind;
    referenceKind;
    constructor(name, typeKind = types_1.TypeKind.Unknown, referenceKind = types_1.ReferenceKind.Irrelevant) {
        this.name = name;
        this.typeKind = typeKind;
        this.referenceKind = referenceKind;
    }
    get baseTypes() {
        return [];
    }
    get kind() {
        return this.typeKind;
    }
    get reference() {
        return this.referenceKind;
    }
}
exports.FundamentalType = FundamentalType;
//# sourceMappingURL=FundamentalType.js.map