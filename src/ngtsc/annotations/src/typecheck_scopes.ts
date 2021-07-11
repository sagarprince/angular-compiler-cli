/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CssSelector, SchemaMetadata, SelectorMatcher} from '@angular/compiler';
import * as ts from 'typescript';

import {Reference} from '../../imports';
import {DirectiveMeta, flattenInheritedDirectiveMetadata, MetadataReader} from '../../metadata';
import {ClassDeclaration} from '../../reflection';
import {ComponentScopeReader} from '../../scope';

/**
 * The scope that is used for type-check code generation of a component template.
 */
export interface TypeCheckScope {
  /**
   * A `SelectorMatcher` instance that contains the flattened directive metadata of all directives
   * that are in the compilation scope of the declaring NgModule.
   */
  matcher: SelectorMatcher<DirectiveMeta>;

  /**
   * The pipes that are available in the compilation scope.
   */
  pipes: Map<string, Reference<ClassDeclaration<ts.ClassDeclaration>>>;

  /**
   * The schemas that are used in this scope.
   */
  schemas: SchemaMetadata[];
}

/**
 * Computes scope information to be used in template type checking.
 */
export class TypeCheckScopes {
  /**
   * Cache of flattened directive metadata. Because flattened metadata is scope-invariant it's
   * cached individually, such that all scopes refer to the same flattened metadata.
   */
  private flattenedDirectiveMetaCache = new Map<ClassDeclaration, DirectiveMeta>();

  /**
   * Cache of the computed type check scope per NgModule declaration.
   */
  private scopeCache = new Map<ClassDeclaration, TypeCheckScope>();

  constructor(private scopeReader: ComponentScopeReader, private metaReader: MetadataReader) {}

  /**
   * Computes the type-check scope information for the component declaration. If the NgModule
   * contains an error, then 'error' is returned. If the component is not declared in any NgModule,
   * an empty type-check scope is returned.
   */
  getTypeCheckScope(node: ClassDeclaration): TypeCheckScope|'error' {
    const matcher = new SelectorMatcher<DirectiveMeta>();
    const pipes = new Map<string, Reference<ClassDeclaration<ts.ClassDeclaration>>>();

    const scope = this.scopeReader.getScopeForComponent(node);
    if (scope === null) {
      return {matcher, pipes, schemas: []};
    } else if (scope === 'error') {
      return scope;
    }

    if (this.scopeCache.has(scope.ngModule)) {
      return this.scopeCache.get(scope.ngModule)!;
    }

    for (const meta of scope.compilation.directives) {
      if (meta.selector !== null) {
        const extMeta = this.getInheritedDirectiveMetadata(meta.ref);
        matcher.addSelectables(CssSelector.parse(meta.selector), extMeta);
      }
    }

    for (const {name, ref} of scope.compilation.pipes) {
      if (!ts.isClassDeclaration(ref.node)) {
        throw new Error(`Unexpected non-class declaration ${
            ts.SyntaxKind[ref.node.kind]} for pipe ${ref.debugName}`);
      }
      pipes.set(name, ref as Reference<ClassDeclaration<ts.ClassDeclaration>>);
    }

    const typeCheckScope: TypeCheckScope = {matcher, pipes, schemas: scope.schemas};
    this.scopeCache.set(scope.ngModule, typeCheckScope);
    return typeCheckScope;
  }

  private getInheritedDirectiveMetadata(ref: Reference<ClassDeclaration>): DirectiveMeta {
    const clazz = ref.node;
    if (this.flattenedDirectiveMetaCache.has(clazz)) {
      return this.flattenedDirectiveMetaCache.get(clazz)!;
    }

    const meta = flattenInheritedDirectiveMetadata(this.metaReader, ref);
    this.flattenedDirectiveMetaCache.set(clazz, meta);
    return meta;
  }
}
