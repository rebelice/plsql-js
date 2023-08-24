"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolTable = void 0;
const BaseSymbol_1 = require("./BaseSymbol");
const ScopedSymbol_1 = require("./ScopedSymbol");
const NamespaceSymbol_1 = require("./NamespaceSymbol");
/** The main class managing all the symbols for a top level entity like a file, library or similar. */
class SymbolTable extends ScopedSymbol_1.ScopedSymbol {
    options;
    /**  Other symbol information available to this instance. */
    dependencies = new Set();
    constructor(name, options) {
        super(name);
        this.options = options;
    }
    get info() {
        return {
            dependencyCount: this.dependencies.size,
            symbolCount: this.children.length,
        };
    }
    clear() {
        super.clear();
        this.dependencies.clear();
    }
    addDependencies(...tables) {
        tables.forEach((value) => {
            this.dependencies.add(value);
        });
    }
    removeDependency(table) {
        if (this.dependencies.has(table)) {
            this.dependencies.delete(table);
        }
    }
    addNewSymbolOfType(t, parent, ...args) {
        const result = new t(...args);
        if (!parent || parent === this) {
            this.addSymbol(result);
        }
        else {
            parent.addSymbol(result);
        }
        return result;
    }
    async addNewNamespaceFromPath(parent, path, delimiter = ".") {
        const parts = path.split(delimiter);
        let i = 0;
        let currentParent = (parent === undefined) ? this : parent;
        while (i < parts.length - 1) {
            let namespace = await currentParent.resolve(parts[i], true);
            if (namespace === undefined) {
                namespace = this.addNewSymbolOfType(NamespaceSymbol_1.NamespaceSymbol, currentParent, parts[i]);
            }
            currentParent = namespace;
            ++i;
        }
        return this.addNewSymbolOfType(NamespaceSymbol_1.NamespaceSymbol, currentParent, parts[parts.length - 1]);
    }
    addNewNamespaceFromPathSync(parent, path, delimiter = ".") {
        const parts = path.split(delimiter);
        let i = 0;
        let currentParent = (parent === undefined) ? this : parent;
        while (i < parts.length - 1) {
            let namespace = currentParent.resolveSync(parts[i], true);
            if (namespace === undefined) {
                namespace = this.addNewSymbolOfType(NamespaceSymbol_1.NamespaceSymbol, currentParent, parts[i]);
            }
            currentParent = namespace;
            ++i;
        }
        return this.addNewSymbolOfType(NamespaceSymbol_1.NamespaceSymbol, currentParent, parts[parts.length - 1]);
    }
    async getAllSymbols(t, localOnly = false) {
        const result = await super.getAllSymbols(t, localOnly);
        if (!localOnly) {
            const dependencyResults = await Promise.all([...this.dependencies].map((dependency) => {
                return (dependency.getAllSymbols(t, localOnly));
            }));
            dependencyResults.forEach((value) => {
                result.push(...value);
            });
        }
        return result;
    }
    getAllSymbolsSync(t, localOnly = false) {
        const result = super.getAllSymbolsSync(t, localOnly);
        if (!localOnly) {
            this.dependencies.forEach((dependency) => {
                result.push(...dependency.getAllSymbolsSync(t, localOnly));
            });
        }
        return result;
    }
    async symbolWithContext(context) {
        /**
         * Local function to find a symbol recursively.
         *
         * @param symbol The symbol to search through.
         *
         * @returns The symbol with the given context, if found.
         */
        const findRecursive = (symbol) => {
            if (symbol.context === context) {
                return symbol;
            }
            if (symbol instanceof ScopedSymbol_1.ScopedSymbol) {
                for (const child of symbol.children) {
                    const result = findRecursive(child);
                    if (result) {
                        return result;
                    }
                }
            }
            return undefined;
        };
        let symbols = await this.getAllSymbols(BaseSymbol_1.BaseSymbol);
        for (const symbol of symbols) {
            const result = findRecursive(symbol);
            if (result) {
                return result;
            }
        }
        for (const dependency of this.dependencies) {
            symbols = await dependency.getAllSymbols(BaseSymbol_1.BaseSymbol);
            for (const symbol of symbols) {
                const result = findRecursive(symbol);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
    symbolWithContextSync(context) {
        /**
         * Local function to find a symbol recursively.
         *
         * @param symbol The symbol to search through.
         *
         * @returns The symbol with the given context, if found.
         */
        const findRecursive = (symbol) => {
            if (symbol.context === context) {
                return symbol;
            }
            if (symbol instanceof ScopedSymbol_1.ScopedSymbol) {
                for (const child of symbol.children) {
                    const result = findRecursive(child);
                    if (result) {
                        return result;
                    }
                }
            }
            return undefined;
        };
        let symbols = this.getAllSymbolsSync(BaseSymbol_1.BaseSymbol);
        for (const symbol of symbols) {
            const result = findRecursive(symbol);
            if (result) {
                return result;
            }
        }
        for (const dependency of this.dependencies) {
            symbols = dependency.getAllSymbolsSync(BaseSymbol_1.BaseSymbol);
            for (const symbol of symbols) {
                const result = findRecursive(symbol);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
    async resolve(name, localOnly = false) {
        let result = await super.resolve(name, localOnly);
        if (!result && !localOnly) {
            for (const dependency of this.dependencies) {
                result = await dependency.resolve(name, false);
                if (result) {
                    return result;
                }
            }
        }
        return result;
    }
    resolveSync(name, localOnly = false) {
        let result = super.resolveSync(name, localOnly);
        if (!result && !localOnly) {
            for (const dependency of this.dependencies) {
                result = dependency.resolveSync(name, false);
                if (result) {
                    return result;
                }
            }
        }
        return result;
    }
}
exports.SymbolTable = SymbolTable;
//# sourceMappingURL=SymbolTable.js.map