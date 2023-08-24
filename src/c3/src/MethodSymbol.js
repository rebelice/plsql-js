"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodSymbol = exports.MethodFlags = void 0;
const RoutineSymbol_1 = require("./RoutineSymbol");
var MethodFlags;
(function (MethodFlags) {
    MethodFlags[MethodFlags["None"] = 0] = "None";
    MethodFlags[MethodFlags["Virtual"] = 1] = "Virtual";
    MethodFlags[MethodFlags["Const"] = 2] = "Const";
    MethodFlags[MethodFlags["Overwritten"] = 4] = "Overwritten";
    /** Distinguished by the return type. */
    MethodFlags[MethodFlags["SetterOrGetter"] = 8] = "SetterOrGetter";
    /** Special flag used e.g. in C++ for explicit c-tors. */
    MethodFlags[MethodFlags["Explicit"] = 16] = "Explicit";
})(MethodFlags || (exports.MethodFlags = MethodFlags = {}));
/** A function which belongs to a class or other outer container structure. */
class MethodSymbol extends RoutineSymbol_1.RoutineSymbol {
    methodFlags = MethodFlags.None;
}
exports.MethodSymbol = MethodSymbol;
//# sourceMappingURL=MethodSymbol.js.map