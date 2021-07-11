/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/transform/src/api", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerFlags = exports.HandlerPrecedence = void 0;
    var HandlerPrecedence;
    (function (HandlerPrecedence) {
        /**
         * Handler with PRIMARY precedence cannot overlap - there can only be one on a given class.
         *
         * If more than one PRIMARY handler matches a class, an error is produced.
         */
        HandlerPrecedence[HandlerPrecedence["PRIMARY"] = 0] = "PRIMARY";
        /**
         * Handlers with SHARED precedence can match any class, possibly in addition to a single PRIMARY
         * handler.
         *
         * It is not an error for a class to have any number of SHARED handlers.
         */
        HandlerPrecedence[HandlerPrecedence["SHARED"] = 1] = "SHARED";
        /**
         * Handlers with WEAK precedence that match a class are ignored if any handlers with stronger
         * precedence match a class.
         */
        HandlerPrecedence[HandlerPrecedence["WEAK"] = 2] = "WEAK";
    })(HandlerPrecedence = exports.HandlerPrecedence || (exports.HandlerPrecedence = {}));
    /**
     * A set of options which can be passed to a `DecoratorHandler` by a consumer, to tailor the output
     * of compilation beyond the decorators themselves.
     */
    var HandlerFlags;
    (function (HandlerFlags) {
        /**
         * No flags set.
         */
        HandlerFlags[HandlerFlags["NONE"] = 0] = "NONE";
        /**
         * Indicates that this decorator is fully inherited from its parent at runtime. In addition to
         * normally inherited aspects such as inputs and queries, full inheritance applies to every aspect
         * of the component or directive, such as the template function itself.
         *
         * Its primary effect is to cause the `CopyDefinitionFeature` to be applied to the definition
         * being compiled. See that class for more information.
         */
        HandlerFlags[HandlerFlags["FULL_INHERITANCE"] = 1] = "FULL_INHERITANCE";
    })(HandlerFlags = exports.HandlerFlags || (exports.HandlerFlags = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy90cmFuc2Zvcm0vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFXSCxJQUFZLGlCQXFCWDtJQXJCRCxXQUFZLGlCQUFpQjtRQUMzQjs7OztXQUlHO1FBQ0gsK0RBQU8sQ0FBQTtRQUVQOzs7OztXQUtHO1FBQ0gsNkRBQU0sQ0FBQTtRQUVOOzs7V0FHRztRQUNILHlEQUFJLENBQUE7SUFDTixDQUFDLEVBckJXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBcUI1QjtJQUVEOzs7T0FHRztJQUNILElBQVksWUFlWDtJQWZELFdBQVksWUFBWTtRQUN0Qjs7V0FFRztRQUNILCtDQUFVLENBQUE7UUFFVjs7Ozs7OztXQU9HO1FBQ0gsdUVBQTZCLENBQUE7SUFDL0IsQ0FBQyxFQWZXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBZXZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29uc3RhbnRQb29sLCBFeHByZXNzaW9uLCBTdGF0ZW1lbnQsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge1JlZXhwb3J0fSBmcm9tICcuLi8uLi9pbXBvcnRzJztcbmltcG9ydCB7SW5kZXhpbmdDb250ZXh0fSBmcm9tICcuLi8uLi9pbmRleGVyJztcbmltcG9ydCB7Q2xhc3NEZWNsYXJhdGlvbiwgRGVjb3JhdG9yfSBmcm9tICcuLi8uLi9yZWZsZWN0aW9uJztcbmltcG9ydCB7SW1wb3J0TWFuYWdlcn0gZnJvbSAnLi4vLi4vdHJhbnNsYXRvcic7XG5pbXBvcnQge1R5cGVDaGVja0NvbnRleHR9IGZyb20gJy4uLy4uL3R5cGVjaGVjay9hcGknO1xuXG5leHBvcnQgZW51bSBIYW5kbGVyUHJlY2VkZW5jZSB7XG4gIC8qKlxuICAgKiBIYW5kbGVyIHdpdGggUFJJTUFSWSBwcmVjZWRlbmNlIGNhbm5vdCBvdmVybGFwIC0gdGhlcmUgY2FuIG9ubHkgYmUgb25lIG9uIGEgZ2l2ZW4gY2xhc3MuXG4gICAqXG4gICAqIElmIG1vcmUgdGhhbiBvbmUgUFJJTUFSWSBoYW5kbGVyIG1hdGNoZXMgYSBjbGFzcywgYW4gZXJyb3IgaXMgcHJvZHVjZWQuXG4gICAqL1xuICBQUklNQVJZLFxuXG4gIC8qKlxuICAgKiBIYW5kbGVycyB3aXRoIFNIQVJFRCBwcmVjZWRlbmNlIGNhbiBtYXRjaCBhbnkgY2xhc3MsIHBvc3NpYmx5IGluIGFkZGl0aW9uIHRvIGEgc2luZ2xlIFBSSU1BUllcbiAgICogaGFuZGxlci5cbiAgICpcbiAgICogSXQgaXMgbm90IGFuIGVycm9yIGZvciBhIGNsYXNzIHRvIGhhdmUgYW55IG51bWJlciBvZiBTSEFSRUQgaGFuZGxlcnMuXG4gICAqL1xuICBTSEFSRUQsXG5cbiAgLyoqXG4gICAqIEhhbmRsZXJzIHdpdGggV0VBSyBwcmVjZWRlbmNlIHRoYXQgbWF0Y2ggYSBjbGFzcyBhcmUgaWdub3JlZCBpZiBhbnkgaGFuZGxlcnMgd2l0aCBzdHJvbmdlclxuICAgKiBwcmVjZWRlbmNlIG1hdGNoIGEgY2xhc3MuXG4gICAqL1xuICBXRUFLLFxufVxuXG4vKipcbiAqIEEgc2V0IG9mIG9wdGlvbnMgd2hpY2ggY2FuIGJlIHBhc3NlZCB0byBhIGBEZWNvcmF0b3JIYW5kbGVyYCBieSBhIGNvbnN1bWVyLCB0byB0YWlsb3IgdGhlIG91dHB1dFxuICogb2YgY29tcGlsYXRpb24gYmV5b25kIHRoZSBkZWNvcmF0b3JzIHRoZW1zZWx2ZXMuXG4gKi9cbmV4cG9ydCBlbnVtIEhhbmRsZXJGbGFncyB7XG4gIC8qKlxuICAgKiBObyBmbGFncyBzZXQuXG4gICAqL1xuICBOT05FID0gMHgwLFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGlzIGRlY29yYXRvciBpcyBmdWxseSBpbmhlcml0ZWQgZnJvbSBpdHMgcGFyZW50IGF0IHJ1bnRpbWUuIEluIGFkZGl0aW9uIHRvXG4gICAqIG5vcm1hbGx5IGluaGVyaXRlZCBhc3BlY3RzIHN1Y2ggYXMgaW5wdXRzIGFuZCBxdWVyaWVzLCBmdWxsIGluaGVyaXRhbmNlIGFwcGxpZXMgdG8gZXZlcnkgYXNwZWN0XG4gICAqIG9mIHRoZSBjb21wb25lbnQgb3IgZGlyZWN0aXZlLCBzdWNoIGFzIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbiBpdHNlbGYuXG4gICAqXG4gICAqIEl0cyBwcmltYXJ5IGVmZmVjdCBpcyB0byBjYXVzZSB0aGUgYENvcHlEZWZpbml0aW9uRmVhdHVyZWAgdG8gYmUgYXBwbGllZCB0byB0aGUgZGVmaW5pdGlvblxuICAgKiBiZWluZyBjb21waWxlZC4gU2VlIHRoYXQgY2xhc3MgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqL1xuICBGVUxMX0lOSEVSSVRBTkNFID0gMHgwMDAwMDAwMSxcbn1cblxuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBpbnRlcmZhY2UgYmV0d2VlbiBhIGRlY29yYXRvciBjb21waWxlciBmcm9tIEBhbmd1bGFyL2NvbXBpbGVyIGFuZCB0aGUgVHlwZXNjcmlwdFxuICogY29tcGlsZXIvdHJhbnNmb3JtLlxuICpcbiAqIFRoZSBkZWNvcmF0b3IgY29tcGlsZXJzIGluIEBhbmd1bGFyL2NvbXBpbGVyIGRvIG5vdCBkZXBlbmQgb24gVHlwZXNjcmlwdC4gVGhlIGhhbmRsZXIgaXNcbiAqIHJlc3BvbnNpYmxlIGZvciBleHRyYWN0aW5nIHRoZSBpbmZvcm1hdGlvbiByZXF1aXJlZCB0byBwZXJmb3JtIGNvbXBpbGF0aW9uIGZyb20gdGhlIGRlY29yYXRvcnNcbiAqIGFuZCBUeXBlc2NyaXB0IHNvdXJjZSwgaW52b2tpbmcgdGhlIGRlY29yYXRvciBjb21waWxlciwgYW5kIHJldHVybmluZyB0aGUgcmVzdWx0LlxuICpcbiAqIEBwYXJhbSBgRGAgVGhlIHR5cGUgb2YgZGVjb3JhdG9yIG1ldGFkYXRhIHByb2R1Y2VkIGJ5IGBkZXRlY3RgLlxuICogQHBhcmFtIGBBYCBUaGUgdHlwZSBvZiBhbmFseXNpcyBtZXRhZGF0YSBwcm9kdWNlZCBieSBgYW5hbHl6ZWAuXG4gKiBAcGFyYW0gYFJgIFRoZSB0eXBlIG9mIHJlc29sdXRpb24gbWV0YWRhdGEgcHJvZHVjZWQgYnkgYHJlc29sdmVgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERlY29yYXRvckhhbmRsZXI8RCwgQSwgUj4ge1xuICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBwcmVjZWRlbmNlIG9mIGEgaGFuZGxlciBjb250cm9scyBob3cgaXQgaW50ZXJhY3RzIHdpdGggb3RoZXIgaGFuZGxlcnMgdGhhdCBtYXRjaCB0aGUgc2FtZVxuICAgKiBjbGFzcy5cbiAgICpcbiAgICogU2VlIHRoZSBkZXNjcmlwdGlvbnMgb24gYEhhbmRsZXJQcmVjZWRlbmNlYCBmb3IgYW4gZXhwbGFuYXRpb24gb2YgdGhlIGJlaGF2aW9ycyBpbnZvbHZlZC5cbiAgICovXG4gIHJlYWRvbmx5IHByZWNlZGVuY2U6IEhhbmRsZXJQcmVjZWRlbmNlO1xuXG4gIC8qKlxuICAgKiBTY2FuIGEgc2V0IG9mIHJlZmxlY3RlZCBkZWNvcmF0b3JzIGFuZCBkZXRlcm1pbmUgaWYgdGhpcyBoYW5kbGVyIGlzIHJlc3BvbnNpYmxlIGZvciBjb21waWxhdGlvblxuICAgKiBvZiBvbmUgb2YgdGhlbS5cbiAgICovXG4gIGRldGVjdChub2RlOiBDbGFzc0RlY2xhcmF0aW9uLCBkZWNvcmF0b3JzOiBEZWNvcmF0b3JbXXxudWxsKTogRGV0ZWN0UmVzdWx0PEQ+fHVuZGVmaW5lZDtcblxuXG4gIC8qKlxuICAgKiBBc3luY2hyb25vdXNseSBwZXJmb3JtIHByZS1hbmFseXNpcyBvbiB0aGUgZGVjb3JhdG9yL2NsYXNzIGNvbWJpbmF0aW9uLlxuICAgKlxuICAgKiBgcHJlYW5hbHl6ZWAgaXMgb3B0aW9uYWwgYW5kIGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNhbGxlZCB0aHJvdWdoIGFsbCBjb21waWxhdGlvbiBmbG93cy4gSXRcbiAgICogd2lsbCBvbmx5IGJlIGNhbGxlZCBpZiBhc3luY2hyb25pY2l0eSBpcyBzdXBwb3J0ZWQgaW4gdGhlIENvbXBpbGVySG9zdC5cbiAgICovXG4gIHByZWFuYWx5emU/KG5vZGU6IENsYXNzRGVjbGFyYXRpb24sIG1ldGFkYXRhOiBSZWFkb25seTxEPik6IFByb21pc2U8dm9pZD58dW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGFuYWx5c2lzIG9uIHRoZSBkZWNvcmF0b3IvY2xhc3MgY29tYmluYXRpb24sIGV4dHJhY3RpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgY2xhc3NcbiAgICogcmVxdWlyZWQgZm9yIGNvbXBpbGF0aW9uLlxuICAgKlxuICAgKiBSZXR1cm5zIGFuYWx5emVkIG1ldGFkYXRhIGlmIHN1Y2Nlc3NmdWwsIG9yIGFuIGFycmF5IG9mIGRpYWdub3N0aWMgbWVzc2FnZXMgaWYgdGhlIGFuYWx5c2lzXG4gICAqIGZhaWxzIG9yIHRoZSBkZWNvcmF0b3IgaXNuJ3QgdmFsaWQuXG4gICAqXG4gICAqIEFuYWx5c2lzIHNob3VsZCBhbHdheXMgYmUgYSBcInB1cmVcIiBvcGVyYXRpb24sIHdpdGggbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzIGJlY2F1c2UgdGhlXG4gICAqIGRldGVjdC9hbmFseXNpcyBzdGVwcyBtaWdodCBiZSBza2lwcGVkIGZvciBmaWxlcyB3aGljaCBoYXZlIG5vdCBjaGFuZ2VkIGR1cmluZyBpbmNyZW1lbnRhbFxuICAgKiBidWlsZHMuIEFueSBzaWRlIGVmZmVjdHMgcmVxdWlyZWQgZm9yIGNvbXBpbGF0aW9uIChlLmcuIHJlZ2lzdHJhdGlvbiBvZiBtZXRhZGF0YSkgc2hvdWxkIGhhcHBlblxuICAgKiBpbiB0aGUgYHJlZ2lzdGVyYCBwaGFzZSwgd2hpY2ggaXMgZ3VhcmFudGVlZCB0byBydW4gZXZlbiBmb3IgaW5jcmVtZW50YWwgYnVpbGRzLlxuICAgKi9cbiAgYW5hbHl6ZShub2RlOiBDbGFzc0RlY2xhcmF0aW9uLCBtZXRhZGF0YTogUmVhZG9ubHk8RD4sIGhhbmRsZXJGbGFncz86IEhhbmRsZXJGbGFncyk6XG4gICAgICBBbmFseXNpc091dHB1dDxBPjtcblxuICAvKipcbiAgICogUG9zdC1wcm9jZXNzIHRoZSBhbmFseXNpcyBvZiBhIGRlY29yYXRvci9jbGFzcyBjb21iaW5hdGlvbiBhbmQgcmVjb3JkIGFueSBuZWNlc3NhcnkgaW5mb3JtYXRpb25cbiAgICogaW4gdGhlIGxhcmdlciBjb21waWxhdGlvbi5cbiAgICpcbiAgICogUmVnaXN0cmF0aW9uIGFsd2F5cyBvY2N1cnMgZm9yIGEgZ2l2ZW4gZGVjb3JhdG9yL2NsYXNzLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgYW5hbHlzaXMgd2FzXG4gICAqIHBlcmZvcm1lZCBkaXJlY3RseSBvciB3aGV0aGVyIHRoZSBhbmFseXNpcyByZXN1bHRzIHdlcmUgcmV1c2VkIGZyb20gdGhlIHByZXZpb3VzIHByb2dyYW0uXG4gICAqL1xuICByZWdpc3Rlcj8obm9kZTogQ2xhc3NEZWNsYXJhdGlvbiwgYW5hbHlzaXM6IEEpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGRlY29yYXRvciBmb3IgdGhlIGluZGV4aW5nIHBoYXNlIGluIGFcbiAgICogYEluZGV4aW5nQ29udGV4dGAsIHdoaWNoIHN0b3JlcyBpbmZvcm1hdGlvbiBhYm91dCBjb21wb25lbnRzIGRpc2NvdmVyZWQgaW4gdGhlXG4gICAqIHByb2dyYW0uXG4gICAqL1xuICBpbmRleD9cbiAgICAgIChjb250ZXh0OiBJbmRleGluZ0NvbnRleHQsIG5vZGU6IENsYXNzRGVjbGFyYXRpb24sIGFuYWx5c2lzOiBSZWFkb25seTxBPixcbiAgICAgICByZXNvbHV0aW9uOiBSZWFkb25seTxSPik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gcmVzb2x1dGlvbiBvbiB0aGUgZ2l2ZW4gZGVjb3JhdG9yIGFsb25nIHdpdGggdGhlIHJlc3VsdCBvZiBhbmFseXNpcy5cbiAgICpcbiAgICogVGhlIHJlc29sdXRpb24gcGhhc2UgaGFwcGVucyBhZnRlciB0aGUgZW50aXJlIGB0cy5Qcm9ncmFtYCBoYXMgYmVlbiBhbmFseXplZCwgYW5kIGdpdmVzIHRoZVxuICAgKiBgRGVjb3JhdG9ySGFuZGxlcmAgYSBjaGFuY2UgdG8gbGV2ZXJhZ2UgaW5mb3JtYXRpb24gZnJvbSB0aGUgd2hvbGUgY29tcGlsYXRpb24gdW5pdCB0byBlbmhhbmNlXG4gICAqIHRoZSBgYW5hbHlzaXNgIGJlZm9yZSB0aGUgZW1pdCBwaGFzZS5cbiAgICovXG4gIHJlc29sdmU/KG5vZGU6IENsYXNzRGVjbGFyYXRpb24sIGFuYWx5c2lzOiBSZWFkb25seTxBPik6IFJlc29sdmVSZXN1bHQ8Uj47XG5cbiAgdHlwZUNoZWNrP1xuICAgICAgKGN0eDogVHlwZUNoZWNrQ29udGV4dCwgbm9kZTogQ2xhc3NEZWNsYXJhdGlvbiwgYW5hbHlzaXM6IFJlYWRvbmx5PEE+LFxuICAgICAgIHJlc29sdXRpb246IFJlYWRvbmx5PFI+KTogdm9pZDtcblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBkZXNjcmlwdGlvbiBvZiB0aGUgZmllbGQgd2hpY2ggc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBjbGFzcywgaW5jbHVkaW5nIGFueVxuICAgKiBpbml0aWFsaXphdGlvbiBjb2RlIHRvIGJlIGdlbmVyYXRlZC5cbiAgICovXG4gIGNvbXBpbGUoXG4gICAgICBub2RlOiBDbGFzc0RlY2xhcmF0aW9uLCBhbmFseXNpczogUmVhZG9ubHk8QT4sIHJlc29sdXRpb246IFJlYWRvbmx5PFI+LFxuICAgICAgY29uc3RhbnRQb29sOiBDb25zdGFudFBvb2wpOiBDb21waWxlUmVzdWx0fENvbXBpbGVSZXN1bHRbXTtcbn1cblxuLyoqXG4gKiBUaGUgb3V0cHV0IG9mIGRldGVjdGluZyBhIHRyYWl0IGZvciBhIGRlY2xhcmF0aW9uIGFzIHRoZSByZXN1bHQgb2YgdGhlIGZpcnN0IHBoYXNlIG9mIHRoZVxuICogY29tcGlsYXRpb24gcGlwZWxpbmUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGV0ZWN0UmVzdWx0PE0+IHtcbiAgLyoqXG4gICAqIFRoZSBub2RlIHRoYXQgdHJpZ2dlcmVkIHRoZSBtYXRjaCwgd2hpY2ggaXMgdHlwaWNhbGx5IGEgZGVjb3JhdG9yLlxuICAgKi9cbiAgdHJpZ2dlcjogdHMuTm9kZXxudWxsO1xuXG4gIC8qKlxuICAgKiBSZWZlcnMgdG8gdGhlIGRlY29yYXRvciB0aGF0IHdhcyByZWNvZ25pemVkIGZvciB0aGlzIGRldGVjdGlvbiwgaWYgYW55LiBUaGlzIGNhbiBiZSBhIGNvbmNyZXRlXG4gICAqIGRlY29yYXRvciB0aGF0IGlzIGFjdHVhbGx5IHByZXNlbnQgaW4gYSBmaWxlLCBvciBhIHN5bnRoZXRpYyBkZWNvcmF0b3IgYXMgaW5zZXJ0ZWRcbiAgICogcHJvZ3JhbW1hdGljYWxseS5cbiAgICovXG4gIGRlY29yYXRvcjogRGVjb3JhdG9yfG51bGw7XG5cbiAgLyoqXG4gICAqIEFuIGFyYml0cmFyeSBvYmplY3QgdG8gY2Fycnkgb3ZlciBmcm9tIHRoZSBkZXRlY3Rpb24gcGhhc2UgaW50byB0aGUgYW5hbHlzaXMgcGhhc2UuXG4gICAqL1xuICBtZXRhZGF0YTogUmVhZG9ubHk8TT47XG59XG5cbi8qKlxuICogVGhlIG91dHB1dCBvZiBhbiBhbmFseXNpcyBvcGVyYXRpb24sIGNvbnNpc3Rpbmcgb2YgcG9zc2libHkgYW4gYXJiaXRyYXJ5IGFuYWx5c2lzIG9iamVjdCAodXNlZCBhc1xuICogdGhlIGlucHV0IHRvIGNvZGUgZ2VuZXJhdGlvbikgYW5kIHBvdGVudGlhbGx5IGRpYWdub3N0aWNzIGlmIHRoZXJlIHdlcmUgZXJyb3JzIHVuY292ZXJlZCBkdXJpbmdcbiAqIGFuYWx5c2lzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuYWx5c2lzT3V0cHV0PEE+IHtcbiAgYW5hbHlzaXM/OiBSZWFkb25seTxBPjtcbiAgZGlhZ25vc3RpY3M/OiB0cy5EaWFnbm9zdGljW107XG59XG5cbi8qKlxuICogQSBkZXNjcmlwdGlvbiBvZiB0aGUgc3RhdGljIGZpZWxkIHRvIGFkZCB0byBhIGNsYXNzLCBpbmNsdWRpbmcgYW4gaW5pdGlhbGl6YXRpb24gZXhwcmVzc2lvblxuICogYW5kIGEgdHlwZSBmb3IgdGhlIC5kLnRzIGZpbGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGlsZVJlc3VsdCB7XG4gIG5hbWU6IHN0cmluZztcbiAgaW5pdGlhbGl6ZXI6IEV4cHJlc3Npb247XG4gIHN0YXRlbWVudHM6IFN0YXRlbWVudFtdO1xuICB0eXBlOiBUeXBlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc29sdmVSZXN1bHQ8Uj4ge1xuICByZWV4cG9ydHM/OiBSZWV4cG9ydFtdO1xuICBkaWFnbm9zdGljcz86IHRzLkRpYWdub3N0aWNbXTtcbiAgZGF0YT86IFJlYWRvbmx5PFI+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIER0c1RyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybUNsYXNzRWxlbWVudD8oZWxlbWVudDogdHMuQ2xhc3NFbGVtZW50LCBpbXBvcnRzOiBJbXBvcnRNYW5hZ2VyKTogdHMuQ2xhc3NFbGVtZW50O1xuICB0cmFuc2Zvcm1GdW5jdGlvbkRlY2xhcmF0aW9uP1xuICAgICAgKGVsZW1lbnQ6IHRzLkZ1bmN0aW9uRGVjbGFyYXRpb24sIGltcG9ydHM6IEltcG9ydE1hbmFnZXIpOiB0cy5GdW5jdGlvbkRlY2xhcmF0aW9uO1xuICB0cmFuc2Zvcm1DbGFzcz9cbiAgICAgIChjbGF6ejogdHMuQ2xhc3NEZWNsYXJhdGlvbiwgZWxlbWVudHM6IFJlYWRvbmx5QXJyYXk8dHMuQ2xhc3NFbGVtZW50PixcbiAgICAgICBpbXBvcnRzOiBJbXBvcnRNYW5hZ2VyKTogdHMuQ2xhc3NEZWNsYXJhdGlvbjtcbn1cbiJdfQ==