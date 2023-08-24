"use strict";
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceKind = exports.TypeKind = exports.Modifier = exports.MemberVisibility = void 0;
/** Visibility (aka. accessibility) of a symbol member. */
var MemberVisibility;
(function (MemberVisibility) {
    /** Not specified, default depends on the language and type. */
    MemberVisibility[MemberVisibility["Unknown"] = 0] = "Unknown";
    /** Used in Swift, member can be accessed outside of the defining module and extended. */
    MemberVisibility[MemberVisibility["Open"] = 1] = "Open";
    /** Like Open, but in Swift such a type cannot be extended. */
    MemberVisibility[MemberVisibility["Public"] = 2] = "Public";
    /** Member is only accessible in the defining class and any derived class. */
    MemberVisibility[MemberVisibility["Protected"] = 3] = "Protected";
    /** Member can only be accessed from the defining class. */
    MemberVisibility[MemberVisibility["Private"] = 4] = "Private";
    /**
     * Used in Swift and Java, member can be accessed from everywhere in a defining module, not outside however.
     * Also known as package private.
     */
    MemberVisibility[MemberVisibility["FilePrivate"] = 5] = "FilePrivate";
    /** Custom enum for special usage. */
    MemberVisibility[MemberVisibility["Library"] = 6] = "Library";
})(MemberVisibility || (exports.MemberVisibility = MemberVisibility = {}));
/** The modifier of a symbol member. */
var Modifier;
(function (Modifier) {
    Modifier[Modifier["Static"] = 0] = "Static";
    Modifier[Modifier["Final"] = 1] = "Final";
    Modifier[Modifier["Sealed"] = 2] = "Sealed";
    Modifier[Modifier["Abstract"] = 3] = "Abstract";
    Modifier[Modifier["Deprecated"] = 4] = "Deprecated";
    Modifier[Modifier["Virtual"] = 5] = "Virtual";
    Modifier[Modifier["Const"] = 6] = "Const";
    Modifier[Modifier["Overwritten"] = 7] = "Overwritten";
})(Modifier || (exports.Modifier = Modifier = {}));
/** Rough categorization of a type. */
var TypeKind;
(function (TypeKind) {
    TypeKind[TypeKind["Unknown"] = 0] = "Unknown";
    TypeKind[TypeKind["Integer"] = 1] = "Integer";
    TypeKind[TypeKind["Float"] = 2] = "Float";
    TypeKind[TypeKind["Number"] = 3] = "Number";
    TypeKind[TypeKind["String"] = 4] = "String";
    TypeKind[TypeKind["Char"] = 5] = "Char";
    TypeKind[TypeKind["Boolean"] = 6] = "Boolean";
    TypeKind[TypeKind["Class"] = 7] = "Class";
    TypeKind[TypeKind["Interface"] = 8] = "Interface";
    TypeKind[TypeKind["Array"] = 9] = "Array";
    TypeKind[TypeKind["Map"] = 10] = "Map";
    TypeKind[TypeKind["Enum"] = 11] = "Enum";
    TypeKind[TypeKind["Alias"] = 12] = "Alias";
})(TypeKind || (exports.TypeKind = TypeKind = {}));
/** Describes a reference to a type. */
var ReferenceKind;
(function (ReferenceKind) {
    ReferenceKind[ReferenceKind["Irrelevant"] = 0] = "Irrelevant";
    /** Default for most languages for dynamically allocated memory ("Type*" in C++). */
    ReferenceKind[ReferenceKind["Pointer"] = 1] = "Pointer";
    /** "Type&" in C++, all non-primitive types in Java/Javascript/Typescript etc. */
    ReferenceKind[ReferenceKind["Reference"] = 2] = "Reference";
    /** "Type" as such and default for all value types. */
    ReferenceKind[ReferenceKind["Instance"] = 3] = "Instance";
})(ReferenceKind || (exports.ReferenceKind = ReferenceKind = {}));
//# sourceMappingURL=types.js.map