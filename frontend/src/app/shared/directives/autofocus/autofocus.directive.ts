import {
  Directive,
  ElementRef,
  OnDestroy,
  booleanAttribute,
  effect,
  inject,
  input
} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnDestroy {
  readonly appAutofocus = input(true, { transform: booleanAttribute });

  private readonly el = inject(ElementRef<HTMLElement>);
  private focusTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      if (this.appAutofocus()) {
        this.scheduleFocus();
      } else {
        this.clearFocus();
      }
    });
  }

  ngOnDestroy(): void {
    this.clearFocus();
  }

  private scheduleFocus(): void {
    if (this.focusTimer != null) return;
    this.focusTimer = setTimeout(() => {
      this.focusTimer = null;
      this.el.nativeElement.focus();
    }, 100);
  }

  private clearFocus(): void {
    if (this.focusTimer != null) {
      clearTimeout(this.focusTimer);
      this.focusTimer = null;
    }
  }
}
