"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceSymbol = void 0;
const ScopedSymbol_1 = require("./ScopedSymbol");
class NamespaceSymbol extends ScopedSymbol_1.ScopedSymbol {
    inline;
    attributes;
    constructor(name, inline = false, attributes = []) {
        super(name);
        this.inline = inline;
        this.attributes = attributes;
    }
}
exports.NamespaceSymbol = NamespaceSymbol;
//# sourceMappingURL=NamespaceSymbol.js.map