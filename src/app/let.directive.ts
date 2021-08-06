import { Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import {LetContext} from "./let-context";

/**
 * Template async variable definition - like ngIf but not with if statement.
 * @Example
 * ```html
 * <ng-container *ngIf="list$ | async as list">
 *   <ng-container *ngIf="loading$ | async as loading">
 *    {{list}}
 *    {{loading}}
 *   </ng-container>
 * </ng-container>
 * ```
 * Now is like:
 * ```html
 * <ng-container *libLet="
 *    let list = list;
 *    let loading = loading;
 *    of: {
 *      list: list$ | async,
 *      loading: loading$ | async
 *    }">
 *    {{list}}
 *    {{loading}}
 * </ng-container>
 * ```
 */
@Directive({
  selector: '[let]',
})
export class LetDirective<T = unknown> implements OnChanges, OnInit {
  @Input() public letOf: T | undefined;

  private context: LetContext = new LetContext();

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  public ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.letOf) {
      Object.assign(this.context, this.letOf);
    }
  }
}
