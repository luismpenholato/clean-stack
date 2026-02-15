import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements OnChanges, OnDestroy {
  @Input() appAutofocus: boolean | unknown = true;

  private focusTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const value = changes['appAutofocus'];
    const shouldFocus = this.appAutofocus === true || this.appAutofocus === '';
    if (value && shouldFocus) {
      this.scheduleFocus();
    } else if (value && !shouldFocus && this.focusTimer != null) {
      clearTimeout(this.focusTimer);
      this.focusTimer = null;
    }
  }

  ngOnDestroy(): void {
    if (this.focusTimer != null) {
      clearTimeout(this.focusTimer);
    }
  }

  private scheduleFocus(): void {
    if (this.focusTimer != null) {
      clearTimeout(this.focusTimer);
    }
    this.focusTimer = setTimeout(() => {
      this.focusTimer = null;
      this.el.nativeElement.focus();
    }, 100);
  }
}
