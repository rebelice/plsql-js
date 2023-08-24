"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSymbol = void 0;
const types_1 = require("./types");
/**
 * The root of the symbol table class hierarchy: a symbol can be any manageable entity (like a block), not only
 * things like variables or classes.
 * We are using a class hierarchy here, instead of an enum or similar, to allow for easy extension and certain
 * symbols can so provide additional APIs for simpler access to their sub elements, if needed.
 */
class BaseSymbol {
    /** The name of the symbol or empty if anonymous. */
    name;
    /** Reference to the parse tree which contains this symbol. */
    context;
    modifiers = new Set();
    visibility = types_1.MemberVisibility.Unknown;
    #parent;
    constructor(name = "") {
        this.name = name;
    }
    get parent() {
        return this.#parent;
    }
    get firstSibling() {
        if (!this.#parent) {
            return undefined;
        }
        return this.#parent?.firstChild;
    }
    /**
     * @returns the symbol before this symbol in its scope.
     */
    get previousSibling() {
        if (!this.#parent) {
            return undefined;
        }
        if (!this.#parent) {
            return this;
        }
        return this.#parent.previousSiblingOf(this);
    }
    /**
     * @returns the symbol following this symbol in its scope.
     */
    get nextSibling() {
        return this.#parent?.nextSiblingOf(this);
    }
    get lastSibling() {
        return this.#parent?.lastChild;
    }
    /**
     * @returns the next symbol in definition order, regardless of the scope.
     */
    get next() {
        return this.#parent?.nextOf(this);
    }
    /**
     * @returns the outermost entity (below the symbol table) that holds us.
     */
    get root() {
        let run = this.#parent;
        while (run) {
            if (!run.parent || this.isSymbolTable(run.parent)) {
                return run;
            }
            run = run.parent;
        }
        return run;
    }
    /**
     * @returns the symbol table we belong too or undefined if we are not yet assigned.
     */
    get symbolTable() {
        if (this.isSymbolTable(this)) {
            return this;
        }
        let run = this.#parent;
        while (run) {
            if (this.isSymbolTable(run)) {
                return run;
            }
            run = run.parent;
        }
        return undefined;
    }
    /**
     * @returns the list of symbols from this one up to root.
     */
    get symbolPath() {
        const result = [];
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let run = this;
        while (run) {
            result.push(run);
            if (!run.parent) {
                break;
            }
            run = run.parent;
        }
        return result;
    }
    /**
     * This is rather an internal method and should rarely be used by external code.
     *
     * @param parent The new parent to use.
     */
    setParent(parent) {
        this.#parent = parent;
    }
    /**
     * Remove this symbol from its parent scope.
     */
    removeFromParent() {
        this.#parent?.removeSymbol(this);
        this.#parent = undefined;
    }
    /**
     * Asynchronously looks up a symbol with a given name, in a bottom-up manner.
     *
     * @param name The name of the symbol to find.
     * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
     *                  (recursively).
     *
     * @returns A promise resolving to the first symbol with a given name, in the order of appearance in this scope
     *          or any of the parent scopes (conditionally).
     */
    async resolve(name, localOnly = false) {
        return this.#parent?.resolve(name, localOnly);
    }
    /**
     * Synchronously looks up a symbol with a given name, in a bottom-up manner.
     *
     * @param name The name of the symbol to find.
     * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
     *                  (recursively).
     *
     * @returns the first symbol with a given name, in the order of appearance in this scope
     *          or any of the parent scopes (conditionally).
     */
    resolveSync(name, localOnly = false) {
        return this.#parent?.resolveSync(name, localOnly);
    }
    /**
     * @param t The type of objects to return.
     *
     * @returns the next enclosing parent of the given type.
     */
    getParentOfType(t) {
        let run = this.#parent;
        while (run) {
            if (run instanceof t) {
                return run;
            }
            run = run.parent;
        }
        return undefined;
    }
    /**
     * Creates a qualified identifier from this symbol and its parent.
     * If `full` is true then all parents are traversed in addition to this instance.
     *
     * @param separator The string to be used between the parts.
     * @param full A flag indicating if the full path is to be returned.
     * @param includeAnonymous Use a special string for empty scope names.
     *
     * @returns the constructed qualified identifier.
     */
    qualifiedName(separator = ".", full = false, includeAnonymous = false) {
        if (!includeAnonymous && this.name.length === 0) {
            return "";
        }
        let result = this.name.length === 0 ? "<anonymous>" : this.name;
        let run = this.#parent;
        while (run) {
            if (includeAnonymous || run.name.length > 0) {
                result = (run.name.length === 0 ? "<anonymous>" : run.name) + separator + result;
            }
            if (!full || !run.parent) {
                break;
            }
            run = run.parent;
        }
        return result;
    }
    /**
     * Type guard to check for ISymbolTable.
     *
     * @param candidate The object to check.
     *
     * @returns true if the object is a symbol table.
     */
    isSymbolTable(candidate) {
        return candidate.info !== undefined;
    }
}
exports.BaseSymbol = BaseSymbol;
//# sourceMappingURL=BaseSymbol.js.map