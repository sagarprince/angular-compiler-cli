(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/utils", ["require", "exports", "tslib", "typescript", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/compiler-cli/src/ngtsc/reflection"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stripExtension = exports.stripDollarSuffix = exports.getTsHelperFnFromIdentifier = exports.getTsHelperFnFromDeclaration = exports.resolveFileWithPostfixes = exports.FactoryMap = exports.isRelativePath = exports.hasNameIdentifier = exports.findAll = exports.getNameText = exports.isDefined = exports.getOriginalSymbol = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ts = require("typescript");
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
    function getOriginalSymbol(checker) {
        return function (symbol) {
            return ts.SymbolFlags.Alias & symbol.flags ? checker.getAliasedSymbol(symbol) : symbol;
        };
    }
    exports.getOriginalSymbol = getOriginalSymbol;
    function isDefined(value) {
        return (value !== undefined) && (value !== null);
    }
    exports.isDefined = isDefined;
    function getNameText(name) {
        return ts.isIdentifier(name) || ts.isLiteralExpression(name) ? name.text : name.getText();
    }
    exports.getNameText = getNameText;
    /**
     * Parse down the AST and capture all the nodes that satisfy the test.
     * @param node The start node.
     * @param test The function that tests whether a node should be included.
     * @returns a collection of nodes that satisfy the test.
     */
    function findAll(node, test) {
        var nodes = [];
        findAllVisitor(node);
        return nodes;
        function findAllVisitor(n) {
            if (test(n)) {
                nodes.push(n);
            }
            else {
                n.forEachChild(function (child) { return findAllVisitor(child); });
            }
        }
    }
    exports.findAll = findAll;
    /**
     * Does the given declaration have a name which is an identifier?
     * @param declaration The declaration to test.
     * @returns true if the declaration has an identifier for a name.
     */
    function hasNameIdentifier(declaration) {
        var namedDeclaration = declaration;
        return namedDeclaration.name !== undefined && ts.isIdentifier(namedDeclaration.name);
    }
    exports.hasNameIdentifier = hasNameIdentifier;
    /**
     * Test whether a path is "relative".
     *
     * Relative paths start with `/`, `./` or `../` (or the Windows equivalents); or are simply `.` or
     * `..`.
     */
    function isRelativePath(path) {
        return file_system_1.isRooted(path) || /^\.\.?(\/|\\|$)/.test(path);
    }
    exports.isRelativePath = isRelativePath;
    /**
     * A `Map`-like object that can compute and memoize a missing value for any key.
     *
     * The computed values are memoized, so the factory function is not called more than once per key.
     * This is useful for storing values that are expensive to compute and may be used multiple times.
     */
    // NOTE:
    // Ideally, this class should extend `Map`, but that causes errors in ES5 transpiled code:
    // `TypeError: Constructor Map requires 'new'`
    var FactoryMap = /** @class */ (function () {
        function FactoryMap(factory, entries) {
            this.factory = factory;
            this.internalMap = new Map(entries);
        }
        FactoryMap.prototype.get = function (key) {
            if (!this.internalMap.has(key)) {
                this.internalMap.set(key, this.factory(key));
            }
            return this.internalMap.get(key);
        };
        FactoryMap.prototype.set = function (key, value) {
            this.internalMap.set(key, value);
        };
        return FactoryMap;
    }());
    exports.FactoryMap = FactoryMap;
    /**
     * Attempt to resolve a `path` to a file by appending the provided `postFixes`
     * to the `path` and checking if the file exists on disk.
     * @returns An absolute path to the first matching existing file, or `null` if none exist.
     */
    function resolveFileWithPostfixes(fs, path, postFixes) {
        var e_1, _a;
        try {
            for (var postFixes_1 = tslib_1.__values(postFixes), postFixes_1_1 = postFixes_1.next(); !postFixes_1_1.done; postFixes_1_1 = postFixes_1.next()) {
                var postFix = postFixes_1_1.value;
                var testPath = file_system_1.absoluteFrom(path + postFix);
                if (fs.exists(testPath) && fs.stat(testPath).isFile()) {
                    return testPath;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (postFixes_1_1 && !postFixes_1_1.done && (_a = postFixes_1.return)) _a.call(postFixes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    }
    exports.resolveFileWithPostfixes = resolveFileWithPostfixes;
    /**
     * Determine whether a function declaration corresponds with a TypeScript helper function, returning
     * its kind if so or null if the declaration does not seem to correspond with such a helper.
     */
    function getTsHelperFnFromDeclaration(decl) {
        if (!ts.isFunctionDeclaration(decl) && !ts.isVariableDeclaration(decl)) {
            return null;
        }
        if (decl.name === undefined || !ts.isIdentifier(decl.name)) {
            return null;
        }
        return getTsHelperFnFromIdentifier(decl.name);
    }
    exports.getTsHelperFnFromDeclaration = getTsHelperFnFromDeclaration;
    /**
     * Determine whether an identifier corresponds with a TypeScript helper function (based on its
     * name), returning its kind if so or null if the identifier does not seem to correspond with such a
     * helper.
     */
    function getTsHelperFnFromIdentifier(id) {
        switch (stripDollarSuffix(id.text)) {
            case '__assign':
                return reflection_1.KnownDeclaration.TsHelperAssign;
            case '__spread':
                return reflection_1.KnownDeclaration.TsHelperSpread;
            case '__spreadArrays':
                return reflection_1.KnownDeclaration.TsHelperSpreadArrays;
            default:
                return null;
        }
    }
    exports.getTsHelperFnFromIdentifier = getTsHelperFnFromIdentifier;
    /**
     * An identifier may become repeated when bundling multiple source files into a single bundle, so
     * bundlers have a strategy of suffixing non-unique identifiers with a suffix like $2. This function
     * strips off such suffixes, so that ngcc deals with the canonical name of an identifier.
     * @param value The value to strip any suffix of, if applicable.
     * @returns The canonical representation of the value, without any suffix.
     */
    function stripDollarSuffix(value) {
        return value.replace(/\$\d+$/, '');
    }
    exports.stripDollarSuffix = stripDollarSuffix;
    function stripExtension(fileName) {
        return fileName.replace(/\..+$/, '');
    }
    exports.stripExtension = stripExtension;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvbmdjYy9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILCtCQUFpQztJQUVqQywyRUFBK0Y7SUFDL0YseUVBQTZFO0lBd0I3RSxTQUFnQixpQkFBaUIsQ0FBQyxPQUF1QjtRQUN2RCxPQUFPLFVBQVMsTUFBaUI7WUFDL0IsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN6RixDQUFDLENBQUM7SUFDSixDQUFDO0lBSkQsOENBSUM7SUFFRCxTQUFnQixTQUFTLENBQUksS0FBdUI7UUFDbEQsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRkQsOEJBRUM7SUFFRCxTQUFnQixXQUFXLENBQUMsSUFBb0M7UUFDOUQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVGLENBQUM7SUFGRCxrQ0FFQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBZ0IsT0FBTyxDQUFJLElBQWEsRUFBRSxJQUE0QztRQUNwRixJQUFNLEtBQUssR0FBUSxFQUFFLENBQUM7UUFDdEIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sS0FBSyxDQUFDO1FBRWIsU0FBUyxjQUFjLENBQUMs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LENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQVZELG9FQVVDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQWdCLDJCQUEyQixDQUFDLEVBQWlCO1FBQzNELFFBQVEsaUJBQWlCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLEtBQUssVUFBVTtnQkFDYixPQUFPLDZCQUFnQixDQUFDLGNBQWMsQ0FBQztZQUN6QyxLQUFLLFVBQVU7Z0JBQ2IsT0FBTyw2QkFBZ0IsQ0FBQyxjQUFjLENBQUM7WUFDekMsS0FBSyxnQkFBZ0I7Z0JBQ25CLE9BQU8sNkJBQWdCLENBQUMsb0JBQW9CLENBQUM7WUFDL0M7Z0JBQ0UsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNILENBQUM7SUFYRCxrRUFXQztJQUVEOzs7Ozs7T0FNRztJQUNILFNBQWdCLGlCQUFpQixDQUFDLEtBQWE7UUFDN0MsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRkQsOENBRUM7SUFFRCxTQUFnQixjQUFjLENBQUMsUUFBZ0I7UUFDN0MsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRkQsd0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge2Fic29sdXRlRnJvbSwgQWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW0sIGlzUm9vdGVkfSBmcm9tICcuLi8uLi9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHtEZWNsYXJhdGlvbk5vZGUsIEtub3duRGVjbGFyYXRpb259IGZyb20gJy4uLy4uL3NyYy9uZ3RzYy9yZWZsZWN0aW9uJztcblxuLyoqXG4gKiBBIGxpc3QgKGBBcnJheWApIG9mIHBhcnRpYWxseSBvcmRlcmVkIGBUYCBpdGVtcy5cbiAqXG4gKiBUaGUgaXRlbXMgaW4gdGhlIGxpc3QgYXJlIHBhcnRpYWxseSBvcmRlcmVkIGluIHRoZSBzZW5zZSB0aGF0IGFueSBlbGVtZW50IGhhcyBlaXRoZXIgdGhlIHNhbWUgb3JcbiAqIGhpZ2hlciBwcmVjZWRlbmNlIHRoYW4gYW55IGVsZW1lbnQgd2hpY2ggYXBwZWFycyBsYXRlciBpbiB0aGUgbGlzdC4gV2hhdCBcImhpZ2hlciBwcmVjZWRlbmNlXCJcbiAqIG1lYW5zIGFuZCBob3cgaXQgaXMgZGV0ZXJtaW5lZCBpcyBpbXBsZW1lbnRhdGlvbi1kZXBlbmRlbnQuXG4gKlxuICogU2VlIFtQYXJ0aWFsbHlPcmRlcmVkU2V0XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QYXJ0aWFsbHlfb3JkZXJlZF9zZXQpIGZvciBtb3JlIGRldGFpbHMuXG4gKiAoUmVmcmFpbmluZyBmcm9tIHVzaW5nIHRoZSB0ZXJtIFwic2V0XCIgaGVyZSwgdG8gYXZvaWQgY29uZnVzaW9uIHdpdGggSmF2YVNjcmlwdCdzXG4gKiBbU2V0XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TZXQpLilcbiAqXG4gKiBOT1RFOiBBIHBsYWluIGBBcnJheTxUPmAgaXMgbm90IGFzc2lnbmFibGUgdG8gYSBgUGFydGlhbGx5T3JkZXJlZExpc3Q8VD5gLCBidXQgYVxuICogICAgICAgYFBhcnRpYWxseU9yZGVyZWRMaXN0PFQ+YCBpcyBhc3NpZ25hYmxlIHRvIGFuIGBBcnJheTxUPmAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFydGlhbGx5T3JkZXJlZExpc3Q8VD4gZXh0ZW5kcyBBcnJheTxUPiB7XG4gIF9wYXJ0aWFsbHlPcmRlcmVkOiB0cnVlO1xuXG4gIG1hcDxVPihjYWxsYmFja2ZuOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIGFycmF5OiBQYXJ0aWFsbHlPcmRlcmVkTGlzdDxUPikgPT4gVSwgdGhpc0FyZz86IGFueSk6XG4gICAgICBQYXJ0aWFsbHlPcmRlcmVkTGlzdDxVPjtcbiAgc2xpY2UoLi4uYXJnczogUGFyYW1ldGVyczxBcnJheTxUPlsnc2xpY2UnXT4pOiBQYXJ0aWFsbHlPcmRlcmVkTGlzdDxUPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yaWdpbmFsU3ltYm9sKGNoZWNrZXI6IHRzLlR5cGVDaGVja2VyKTogKHN5bWJvbDogdHMuU3ltYm9sKSA9PiB0cy5TeW1ib2wge1xuICByZXR1cm4gZnVuY3Rpb24oc3ltYm9sOiB0cy5TeW1ib2wpIHtcbiAgICByZXR1cm4gdHMuU3ltYm9sRmxhZ3MuQWxpYXMgJiBzeW1ib2wuZmxhZ3MgPyBjaGVja2VyLmdldEFsaWFzZWRTeW1ib2woc3ltYm9sKSA6IHN5bWJvbDtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGVmaW5lZDxUPih2YWx1ZTogVHx1bmRlZmluZWR8bnVsbCk6IHZhbHVlIGlzIFQge1xuICByZXR1cm4gKHZhbHVlICE9PSB1bmRlZmluZWQpICYmICh2YWx1ZSAhPT0gbnVsbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROYW1lVGV4dChuYW1lOiB0cy5Qcm9wZXJ0eU5hbWV8dHMuQmluZGluZ05hbWUpOiBzdHJpbmcge1xuICByZXR1cm4gdHMuaXNJZGVudGlmaWVyKG5hbWUpIHx8IHRzLmlzTGl0ZXJhbEV4cHJlc3Npb24obmFtZSkgPyBuYW1lLnRleHQgOiBuYW1lLmdldFRleHQoKTtcbn1cblxuLyoqXG4gKiBQYXJzZSBkb3duIHRoZSBBU1QgYW5kIGNhcHR1cmUgYWxsIHRoZSBub2RlcyB0aGF0IHNhdGlzZnkgdGhlIHRlc3QuXG4gKiBAcGFyYW0gbm9kZSBUaGUgc3RhcnQgbm9kZS5cbiAqIEBwYXJhbSB0ZXN0IFRoZSBmdW5jdGlvbiB0aGF0IHRlc3RzIHdoZXRoZXIgYSBub2RlIHNob3VsZCBiZSBpbmNsdWRlZC5cbiAqIEByZXR1cm5zIGEgY29sbGVjdGlvbiBvZiBub2RlcyB0aGF0IHNhdGlzZnkgdGhlIHRlc3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQWxsPFQ+KG5vZGU6IHRzLk5vZGUsIHRlc3Q6IChub2RlOiB0cy5Ob2RlKSA9PiBub2RlIGlzIHRzLk5vZGUgJiBUKTogVFtdIHtcbiAgY29uc3Qgbm9kZXM6IFRbXSA9IFtdO1xuICBmaW5kQWxsVmlzaXRvcihub2RlKTtcbiAgcmV0dXJuIG5vZGVzO1xuXG4gIGZ1bmN0aW9uIGZpbmRBbGxWaXNpdG9yKG46IHRzLk5vZGUpIHtcbiAgICBpZiAodGVzdChuKSkge1xuICAgICAgbm9kZXMucHVzaChuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbi5mb3JFYWNoQ2hpbGQoY2hpbGQgPT4gZmluZEFsbFZpc2l0b3IoY2hpbGQpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEb2VzIHRoZSBnaXZlbiBkZWNsYXJhdGlvbiBoYXZlIGEgbmFtZSB3aGljaCBpcyBhbiBpZGVudGlmaWVyP1xuICogQHBhcmFtIGRlY2xhcmF0aW9uIFRoZSBkZWNsYXJhdGlvbiB0byB0ZXN0LlxuICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgZGVjbGFyYXRpb24gaGFzIGFuIGlkZW50aWZpZXIgZm9yIGEgbmFtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc05hbWVJZGVudGlmaWVyKGRlY2xhcmF0aW9uOiB0cy5Ob2RlKTogZGVjbGFyYXRpb24gaXMgRGVjbGFyYXRpb25Ob2RlJlxuICAgIHtuYW1lOiB0cy5JZGVudGlmaWVyfSB7XG4gIGNvbnN0IG5hbWVkRGVjbGFyYXRpb246IHRzLk5vZGUme25hbWU/OiB0cy5Ob2RlfSA9IGRlY2xhcmF0aW9uO1xuICByZXR1cm4gbmFtZWREZWNsYXJhdGlvbi5uYW1lICE9PSB1bmRlZmluZWQgJiYgdHMuaXNJZGVudGlmaWVyKG5hbWVkRGVjbGFyYXRpb24ubmFtZSk7XG59XG5cbi8qKlxuICogVGVzdCB3aGV0aGVyIGEgcGF0aCBpcyBcInJlbGF0aXZlXCIuXG4gKlxuICogUmVsYXRpdmUgcGF0aHMgc3RhcnQgd2l0aCBgL2AsIGAuL2Agb3IgYC4uL2AgKG9yIHRoZSBXaW5kb3dzIGVxdWl2YWxlbnRzKTsgb3IgYXJlIHNpbXBseSBgLmAgb3JcbiAqIGAuLmAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlbGF0aXZlUGF0aChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzUm9vdGVkKHBhdGgpIHx8IC9eXFwuXFwuPyhcXC98XFxcXHwkKS8udGVzdChwYXRoKTtcbn1cblxuLyoqXG4gKiBBIGBNYXBgLWxpa2Ugb2JqZWN0IHRoYXQgY2FuIGNvbXB1dGUgYW5kIG1lbW9pemUgYSBtaXNzaW5nIHZhbHVlIGZvciBhbnkga2V5LlxuICpcbiAqIFRoZSBjb21wdXRlZCB2YWx1ZXMgYXJlIG1lbW9pemVkLCBzbyB0aGUgZmFjdG9yeSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG1vcmUgdGhhbiBvbmNlIHBlciBrZXkuXG4gKiBUaGlzIGlzIHVzZWZ1bCBmb3Igc3RvcmluZyB2YWx1ZXMgdGhhdCBhcmUgZXhwZW5zaXZlIHRvIGNvbXB1dGUgYW5kIG1heSBiZSB1c2VkIG11bHRpcGxlIHRpbWVzLlxuICovXG4vLyBOT1RFOlxuLy8gSWRlYWxseSwgdGhpcyBjbGFzcyBzaG91bGQgZXh0ZW5kIGBNYXBgLCBidXQgdGhhdCBjYXVzZXMgZXJyb3JzIGluIEVTNSB0cmFuc3BpbGVkIGNvZGU6XG4vLyBgVHlwZUVycm9yOiBDb25zdHJ1Y3RvciBNYXAgcmVxdWlyZXMgJ25ldydgXG5leHBvcnQgY2xhc3MgRmFjdG9yeU1hcDxLLCBWPiB7XG4gIHByaXZhdGUgaW50ZXJuYWxNYXA6IE1hcDxLLCBWPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZhY3Rvcnk6IChrZXk6IEspID0+IFYsIGVudHJpZXM/OiByZWFkb25seShyZWFkb25seVtLLCBWXSlbXXxudWxsKSB7XG4gICAgdGhpcy5pbnRlcm5hbE1hcCA9IG5ldyBNYXAoZW50cmllcyk7XG4gIH1cblxuICBnZXQoa2V5OiBLKTogViB7XG4gICAgaWYgKCF0aGlzLmludGVybmFsTWFwLmhhcyhrZXkpKSB7XG4gICAgICB0aGlzLmludGVybmFsTWFwLnNldChrZXksIHRoaXMuZmFjdG9yeShrZXkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbE1hcC5nZXQoa2V5KSE7XG4gIH1cblxuICBzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHZvaWQge1xuICAgIHRoaXMuaW50ZXJuYWxNYXAuc2V0KGtleSwgdmFsdWUpO1xuICB9XG59XG5cbi8qKlxuICogQXR0ZW1wdCB0byByZXNvbHZlIGEgYHBhdGhgIHRvIGEgZmlsZSBieSBhcHBlbmRpbmcgdGhlIHByb3ZpZGVkIGBwb3N0Rml4ZXNgXG4gKiB0byB0aGUgYHBhdGhgIGFuZCBjaGVja2luZyBpZiB0aGUgZmlsZSBleGlzdHMgb24gZGlzay5cbiAqIEByZXR1cm5zIEFuIGFic29sdXRlIHBhdGggdG8gdGhlIGZpcnN0IG1hdGNoaW5nIGV4aXN0aW5nIGZpbGUsIG9yIGBudWxsYCBpZiBub25lIGV4aXN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUZpbGVXaXRoUG9zdGZpeGVzKFxuICAgIGZzOiBGaWxlU3lzdGVtLCBwYXRoOiBBYnNvbHV0ZUZzUGF0aCwgcG9zdEZpeGVzOiBzdHJpbmdbXSk6IEFic29sdXRlRnNQYXRofG51bGwge1xuICBmb3IgKGNvbnN0IHBvc3RGaXggb2YgcG9zdEZpeGVzKSB7XG4gICAgY29uc3QgdGVzdFBhdGggPSBhYnNvbHV0ZUZyb20ocGF0aCArIHBvc3RGaXgpO1xuICAgIGlmIChmcy5leGlzdHModGVzdFBhdGgpICYmIGZzLnN0YXQodGVzdFBhdGgpLmlzRmlsZSgpKSB7XG4gICAgICByZXR1cm4gdGVzdFBhdGg7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIGEgZnVuY3Rpb24gZGVjbGFyYXRpb24gY29ycmVzcG9uZHMgd2l0aCBhIFR5cGVTY3JpcHQgaGVscGVyIGZ1bmN0aW9uLCByZXR1cm5pbmdcbiAqIGl0cyBraW5kIGlmIHNvIG9yIG51bGwgaWYgdGhlIGRlY2xhcmF0aW9uIGRvZXMgbm90IHNlZW0gdG8gY29ycmVzcG9uZCB3aXRoIHN1Y2ggYSBoZWxwZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUc0hlbHBlckZuRnJvbURlY2xhcmF0aW9uKGRlY2w6IERlY2xhcmF0aW9uTm9kZSk6IEtub3duRGVjbGFyYXRpb258bnVsbCB7XG4gIGlmICghdHMuaXNGdW5jdGlvbkRlY2xhcmF0aW9uKGRlY2wpICYmICF0cy5pc1ZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChkZWNsLm5hbWUgPT09IHVuZGVmaW5lZCB8fCAhdHMuaXNJZGVudGlmaWVyKGRlY2wubmFtZSkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBnZXRUc0hlbHBlckZuRnJvbUlkZW50aWZpZXIoZGVjbC5uYW1lKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciBhbiBpZGVudGlmaWVyIGNvcnJlc3BvbmRzIHdpdGggYSBUeXBlU2NyaXB0IGhlbHBlciBmdW5jdGlvbiAoYmFzZWQgb24gaXRzXG4gKiBuYW1lKSwgcmV0dXJuaW5nIGl0cyBraW5kIGlmIHNvIG9yIG51bGwgaWYgdGhlIGlkZW50aWZpZXIgZG9lcyBub3Qgc2VlbSB0byBjb3JyZXNwb25kIHdpdGggc3VjaCBhXG4gKiBoZWxwZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUc0hlbHBlckZuRnJvbUlkZW50aWZpZXIoaWQ6IHRzLklkZW50aWZpZXIpOiBLbm93bkRlY2xhcmF0aW9ufG51bGwge1xuICBzd2l0Y2ggKHN0cmlwRG9sbGFyU3VmZml4KGlkLnRleHQpKSB7XG4gICAgY2FzZSAnX19hc3NpZ24nOlxuICAgICAgcmV0dXJuIEtub3duRGVjbGFyYXRpb24uVHNIZWxwZXJBc3NpZ247XG4gICAgY2FzZSAnX19zcHJlYWQnOlxuICAgICAgcmV0dXJuIEtub3duRGVjbGFyYXRpb24uVHNIZWxwZXJTcHJlYWQ7XG4gICAgY2FzZSAnX19zcHJlYWRBcnJheXMnOlxuICAgICAgcmV0dXJuIEtub3duRGVjbGFyYXRpb24uVHNIZWxwZXJTcHJlYWRBcnJheXM7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogQW4gaWRlbnRpZmllciBtYXkgYmVjb21lIHJlcGVhdGVkIHdoZW4gYnVuZGxpbmcgbXVsdGlwbGUgc291cmNlIGZpbGVzIGludG8gYSBzaW5nbGUgYnVuZGxlLCBzb1xuICogYnVuZGxlcnMgaGF2ZSBhIHN0cmF0ZWd5IG9mIHN1ZmZpeGluZyBub24tdW5pcXVlIGlkZW50aWZpZXJzIHdpdGggYSBzdWZmaXggbGlrZSAkMi4gVGhpcyBmdW5jdGlvblxuICogc3RyaXBzIG9mZiBzdWNoIHN1ZmZpeGVzLCBzbyB0aGF0IG5nY2MgZGVhbHMgd2l0aCB0aGUgY2Fub25pY2FsIG5hbWUgb2YgYW4gaWRlbnRpZmllci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gc3RyaXAgYW55IHN1ZmZpeCBvZiwgaWYgYXBwbGljYWJsZS5cbiAqIEByZXR1cm5zIFRoZSBjYW5vbmljYWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLCB3aXRob3V0IGFueSBzdWZmaXguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcERvbGxhclN1ZmZpeCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcJFxcZCskLywgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaXBFeHRlbnNpb24oZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBmaWxlTmFtZS5yZXBsYWNlKC9cXC4uKyQvLCAnJyk7XG59XG4iXX0=