"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopedSymbol = void 0;
const BaseSymbol_1 = require("./BaseSymbol");
const DuplicateSymbolError_1 = require("./DuplicateSymbolError");
/** A symbol with a scope (so it can have child symbols). */
class ScopedSymbol extends BaseSymbol_1.BaseSymbol {
    /** All child symbols in definition order. */
    #children = [];
    // All used child names. Used to detect name collisions.
    #names = new Map();
    constructor(name = "") {
        super(name);
    }
    /**
     * @returns A promise resolving to all direct child symbols with a scope (e.g. classes in a module).
     */
    get directScopes() {
        return this.getSymbolsOfType(ScopedSymbol);
    }
    get children() {
        return this.#children;
    }
    get firstChild() {
        if (this.#children.length > 0) {
            return this.#children[0];
        }
        return undefined;
    }
    get lastChild() {
        if (this.#children.length > 0) {
            return this.#children[this.#children.length - 1];
        }
        return undefined;
    }
    clear() {
        this.#children = [];
        this.#names.clear();
    }
    /**
     * Adds the given symbol to this scope. If it belongs already to a different scope
     * it is removed from that before adding it here.
     *
     * @param symbol The symbol to add as a child.
     */
    addSymbol(symbol) {
        symbol.removeFromParent();
        // Check for duplicates first.
        const symbolTable = this.symbolTable;
        const count = this.#names.get(symbol.name);
        if (!symbolTable || !symbolTable.options.allowDuplicateSymbols) {
            if (count !== undefined) {
                throw new DuplicateSymbolError_1.DuplicateSymbolError("Attempt to add duplicate symbol '" + (symbol.name ?? "<anonymous>") +
                    "'");
            }
            else {
                this.#names.set(symbol.name, 1);
            }
            const index = this.#children.indexOf(symbol);
            if (index > -1) {
                throw new DuplicateSymbolError_1.DuplicateSymbolError("Attempt to add duplicate symbol '" + (symbol.name ?? "<anonymous>") +
                    "'");
            }
        }
        else {
            this.#names.set(symbol.name, count === undefined ? 1 : count + 1);
        }
        this.#children.push(symbol);
        symbol.setParent(this);
    }
    removeSymbol(symbol) {
        const index = this.#children.indexOf(symbol);
        if (index > -1) {
            this.#children.splice(index, 1);
            symbol.setParent(undefined);
            const count = this.#names.get(symbol.name);
            if (count !== undefined) {
                if (count === 1) {
                    this.#names.delete(symbol.name);
                }
                else {
                    this.#names.set(symbol.name, count - 1);
                }
            }
        }
    }
    /**
     * Asynchronously retrieves child symbols of a given type from this symbol.
     *
     * @param t The type of of the objects to return.
     *
     * @returns A promise resolving to all (nested) children of the given type.
     */
    async getNestedSymbolsOfType(t) {
        const result = [];
        const childPromises = [];
        this.#children.forEach((child) => {
            if (child instanceof t) {
                result.push(child);
            }
            if (child instanceof ScopedSymbol) {
                childPromises.push(child.getNestedSymbolsOfType(t));
            }
        });
        const childSymbols = await Promise.all(childPromises);
        childSymbols.forEach((entry) => {
            result.push(...entry);
        });
        return result;
    }
    /**
     * Synchronously retrieves child symbols of a given type from this symbol.
     *
     * @param t The type of of the objects to return.
     *
     * @returns A list of all (nested) children of the given type.
     */
    getNestedSymbolsOfTypeSync(t) {
        const result = [];
        this.#children.forEach((child) => {
            if (child instanceof t) {
                result.push(child);
            }
            if (child instanceof ScopedSymbol) {
                result.push(...child.getNestedSymbolsOfTypeSync(t));
            }
        });
        return result;
    }
    /**
     * @param name If given only returns symbols with that name.
     *
     * @returns A promise resolving to symbols from this and all nested scopes in the order they were defined.
     */
    async getAllNestedSymbols(name) {
        const result = [];
        const childPromises = [];
        this.#children.forEach((child) => {
            if (!name || child.name === name) {
                result.push(child);
            }
            if (child instanceof ScopedSymbol) {
                childPromises.push(child.getAllNestedSymbols(name));
            }
        });
        const childSymbols = await Promise.all(childPromises);
        childSymbols.forEach((entry) => {
            result.push(...entry);
        });
        return result;
    }
    /**
     * @param name If given only returns symbols with that name.
     *
     * @returns A list of all symbols from this and all nested scopes in the order they were defined.
     */
    getAllNestedSymbolsSync(name) {
        const result = [];
        this.#children.forEach((child) => {
            if (!name || child.name === name) {
                result.push(child);
            }
            if (child instanceof ScopedSymbol) {
                result.push(...child.getAllNestedSymbolsSync(name));
            }
        });
        return result;
    }
    /**
     * @param t The type of of the objects to return.
     *
     * @returns A promise resolving to direct children of a given type.
     */
    getSymbolsOfType(t) {
        return new Promise((resolve) => {
            const result = [];
            this.#children.forEach((child) => {
                if (child instanceof t) {
                    result.push(child);
                }
            });
            resolve(result);
        });
    }
    /**
     * TODO: add optional position dependency (only symbols defined before a given caret pos are viable).
     *
     * @param t The type of the objects to return.
     * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
     *                  (recursively).
     *
     * @returns A promise resolving to all symbols of the the given type, accessible from this scope (if localOnly is
     *          false), within the owning symbol table.
     */
    async getAllSymbols(t, localOnly = false) {
        const result = [];
        // Special handling for namespaces, which act like grouping symbols in this scope,
        // so we show them as available in this scope.
        for (const child of this.#children) {
            if (child instanceof t) {
                result.push(child);
            }
            if (this.isNamespace(child)) {
                const childSymbols = await child.getAllSymbols(t, true);
                result.push(...childSymbols);
            }
        }
        if (!localOnly) {
            if (this.parent) {
                const childSymbols = await this.getAllSymbols(t, true);
                result.push(...childSymbols);
            }
        }
        return result;
    }
    /**
     * TODO: add optional position dependency (only symbols defined before a given caret pos are viable).
     *
     * @param t The type of the objects to return.
     * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
     *                  (recursively).
     *
     * @returns A list with all symbols of the the given type, accessible from this scope (if localOnly is
     *          false), within the owning symbol table.
     */
    getAllSymbolsSync(t, localOnly = false) {
        const result = [];
        // Special handling for namespaces, which act like grouping symbols in this scope,
        // so we show them as available in this scope.
        for (const child of this.#children) {
            if (child instanceof t) {
                result.push(child);
            }
            if (this.isNamespace(child)) {
                const childSymbols = child.getAllSymbolsSync(t, true);
                result.push(...childSymbols);
            }
        }
        if (!localOnly) {
            if (this.parent) {
                const childSymbols = this.getAllSymbolsSync(t, true);
                result.push(...childSymbols);
            }
        }
        return result;
    }
    /**
     * @param name The name of the symbol to resolve.
     * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
     *                  (recursively).
     *
     * @returns A promise resolving to the first symbol with a given name, in the order of appearance in this scope
     *          or any of the parent scopes (conditionally).
     */
    async resolve(name, localOnly = false) {
        return new Promise((resolve) => {
            for (const child of this.#children) {
                if (child.name === name) {
                    resolve(child);
                    return;
                }
            }
            // Nothing found locally. Let the parent continue.
            if (!localOnly) {
                if (this.parent) {
                    resolve(this.parent.resolve(name, false));
                    return;
                }
            }
            resolve(undefined);
        });
    }
    /**
     * @param name The name of the symbol to resolve.
     * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
     *                  (recursively).
     *
     * @returns the first symbol with a given name, in the order of appearance in this scope
     *          or any of the parent scopes (conditionally).
     */
    resolveSync(name, localOnly = false) {
        for (const child of this.#children) {
            if (child.name === name) {
                return child;
            }
        }
        // Nothing found locally. Let the parent continue.
        if (!localOnly) {
            if (this.parent) {
                return this.parent.resolveSync(name, false);
            }
        }
        return undefined;
    }
    /**
     * @param path The path consisting of symbol names separator by `separator`.
     * @param separator The character to separate path segments.
     *
     * @returns the symbol located at the given path through the symbol hierarchy.
     */
    symbolFromPath(path, separator = ".") {
        const elements = path.split(separator);
        let index = 0;
        if (elements[0] === this.name || elements[0].length === 0) {
            ++index;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let result = this;
        while (index < elements.length) {
            if (!(result instanceof ScopedSymbol)) {
                return undefined;
            }
            // eslint-disable-next-line no-loop-func
            const child = result.children.find((candidate) => { return candidate.name === elements[index]; });
            if (!child) {
                return undefined;
            }
            result = child;
            ++index;
        }
        return result;
    }
    /**
     * @param child The child to search for.
     *
     * @returns the index of the given child symbol in the child list or -1 if it couldn't be found.
     */
    indexOfChild(child) {
        return this.#children.findIndex((value) => { return value === child; });
    }
    /**
     * @param child The reference node.
     *
     * @returns the sibling symbol after the given child symbol, if one exists.
     */
    nextSiblingOf(child) {
        const index = this.indexOfChild(child);
        if (index === -1 || index >= this.#children.length - 1) {
            return undefined;
        }
        return this.#children[index + 1];
    }
    /**
     * @param child The reference node.
     *
     * @returns the sibling symbol before the given child symbol, if one exists.
     */
    previousSiblingOf(child) {
        const index = this.indexOfChild(child);
        if (index < 1) {
            return undefined;
        }
        return this.#children[index - 1];
    }
    /**
     * @param child The reference node.
     *
     * @returns the next symbol in definition order, regardless of the scope.
     */
    nextOf(child) {
        if (!(child.parent)) {
            return undefined;
        }
        if (child.parent !== this) {
            return child.parent.nextOf(child);
        }
        if (child instanceof ScopedSymbol && child.children.length > 0) {
            return child.children[0];
        }
        const sibling = this.nextSiblingOf(child);
        if (sibling) {
            return sibling;
        }
        return this.parent.nextOf(this);
    }
    isNamespace(candidate) {
        return candidate.inline !== undefined
            && candidate.attributes !== undefined;
    }
}
exports.ScopedSymbol = ScopedSymbol;
//# sourceMappingURL=ScopedSymbol.js.map