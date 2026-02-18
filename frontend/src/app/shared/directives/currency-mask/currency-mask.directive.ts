import { Directive, ElementRef, forwardRef, OnDestroy, inject, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface CurrencyMaskOptions {
  prefix?: string;
  decimal?: string;
  thousands?: string;
  precision?: number;
  allowNegative?: boolean;
}

const DEFAULT_OPTIONS: Required<CurrencyMaskOptions> = {
  prefix: 'R$ ',
  decimal: ',',
  thousands: '.',
  precision: 2,
  allowNegative: false
};

export const CURRENCY_MASK_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyMaskDirective),
  multi: true
};

@Directive({
  selector: 'input[appCurrencyMask]',
  host: {
    '[attr.inputmode]': '"decimal"',
    '[attr.autocomplete]': '"off"',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(focus)': 'onFocus($event)'
  },
  providers: [CURRENCY_MASK_VALUE_ACCESSOR]
})
export class CurrencyMaskDirective implements ControlValueAccessor, OnDestroy {
  readonly appCurrencyMask = input<CurrencyMaskOptions | string>({});

  private readonly el = inject(ElementRef<HTMLInputElement>);
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};
  private lastDisplay = '';
  private lastCursor = 0;

  private get options(): Required<CurrencyMaskOptions> {
    const raw = this.appCurrencyMask();
    const opts = typeof raw === 'object' && raw != null ? raw : {};
    return { ...DEFAULT_OPTIONS, ...opts };
  }

  ngOnDestroy(): void {
    this.lastDisplay = '';
  }

  writeValue(value: number | null): void {
    const num = value != null ? Number(value) : 0;
    const display = this.formatDisplay(num);
    // Não sobrescrever lastCursor se o valor é o mesmo (ex.: Angular chamando após nosso onChange)
    if (display !== this.lastDisplay) {
      this.lastDisplay = display;
      this.lastCursor = display.length;
    }
    this.el.nativeElement.value = display;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const opts = this.options;
    const newValue = input.value;
    const lenDiff = newValue.length - this.lastDisplay.length;

    let display: string;
    let cursorPos: number;

    if (lenDiff === 1) {
      const insertedChar = newValue[this.lastCursor];
      const isDigit = insertedChar !== undefined && /\d/.test(insertedChar);
      const isDecimal = insertedChar === opts.decimal;
      if (isDigit || isDecimal) {
        const rawChar = isDecimal ? '.' : insertedChar;
        const rawIndex = this.countRelevantBefore(this.lastDisplay, this.lastCursor, opts);
        const lastRaw = this.displayToRaw(this.lastDisplay, opts);
        // Se o valor atual é 0 e o usuário digita no "fim" do raw, tratar como substituição (ex.: 0,00 + "2" → 2,00)
        const currentNum = this.rawToNum(lastRaw);
        const atEndOfRaw = rawIndex >= lastRaw.length;
        if (isDigit && currentNum === 0 && atEndOfRaw) {
          const num = parseFloat(insertedChar);
          display = this.formatDisplay(num);
          cursorPos = this.rawIndexToDisplayPos(display, 1, opts);
        } else {
          const newRaw = this.insertAtRaw(lastRaw, rawIndex, rawChar, opts);
          const num = this.rawToNum(newRaw);
          display = this.formatDisplay(num);
          cursorPos = this.rawIndexToDisplayPos(display, rawIndex + 1, opts);
        }
      } else {
        ({ display, cursorPos } = this.parseFull(newValue, opts, input.selectionStart ?? input.value.length));
      }
    } else if (lenDiff === -1) {
      const rawIndex = this.countRelevantBefore(this.lastDisplay, this.lastCursor - 1, opts);
      const lastRaw = this.displayToRaw(this.lastDisplay, opts);
      const newRawFromDelete = this.deleteAtRaw(lastRaw, rawIndex, opts);
      const numFromDelete = this.rawToNum(newRawFromDelete);
      const numFromInput = this.rawValueFromDisplay(newValue);
      // Só usar delete se o valor bate (backspace real); senão foi substituição de seleção (ex.: ",02" → ",5")
      if (Math.abs(numFromDelete - numFromInput) < 1e-10) {
        const num = numFromDelete;
        display = this.formatDisplay(num);
        const newRawStr = this.displayToRaw(display, opts);
        cursorPos = this.rawIndexToDisplayPos(display, Math.min(rawIndex, newRawStr.length), opts);
      } else {
        ({ display, cursorPos } = this.parseFull(newValue, opts, input.selectionStart ?? input.value.length));
      }
    } else {
      // Paste, substituição de seleção (ex.: alterar ",02" para ",50") ou múltiplas teclas
      ({ display, cursorPos } = this.parseFull(newValue, opts, input.selectionStart ?? input.value.length));
    }

    this.lastDisplay = display;
    this.lastCursor = cursorPos;
    input.value = display;
    input.setSelectionRange(cursorPos, cursorPos);
    this.onChange(this.rawValueFromDisplay(display));
  }

  onBlur(): void {
    this.onTouched();
    const input = this.el.nativeElement;
    const num = this.rawValueFromDisplay(input.value);
    const display = this.formatDisplay(num);
    this.lastDisplay = display;
    this.lastCursor = display.length;
    input.value = display;
  }

  onFocus(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    this.lastDisplay = input.value;
    this.lastCursor = input.selectionStart ?? input.value.length;
  }

  private parseFull(
    value: string,
    opts: Required<CurrencyMaskOptions>,
    selectionStart?: number
  ): { display: string; cursorPos: number } {
    const raw = this.clearMask(value);
    const negative = opts.allowNegative && raw.startsWith('-');
    const digitsOnly = raw.replace(/^-/, '').replace(/[^\d.]/g, '');
    const parts = digitsOnly.split('.');
    let intPart = parts[0] ?? '';
    let decPart = parts.length > 1 ? parts.slice(1).join('').slice(0, opts.precision) : '';
    if (decPart.length > 0 && intPart === '') intPart = '0';
    const rawNumeric = decPart.length > 0 ? `${intPart}.${decPart}` : intPart;
    const num = rawNumeric === '' || rawNumeric === '.' ? 0 : parseFloat(rawNumeric);
    const finalNum = negative ? -Math.abs(num) : num;
    const display = this.formatDisplay(finalNum);
    const cursorPos =
      selectionStart != null ? Math.min(Math.max(selectionStart, opts.prefix.length), display.length) : display.length;
    return { display, cursorPos };
  }

  private displayToRaw(display: string, opts: Required<CurrencyMaskOptions>): string {
    const v = this.clearMask(display);
    const digitsOnly = v.replace(/^-/, '').replace(/[^\d.]/g, '');
    const parts = digitsOnly.split('.');
    let intPart = parts[0] ?? '';
    let decPart = parts.length > 1 ? parts.slice(1).join('').slice(0, opts.precision) : '';
    if (decPart.length > 0 && intPart === '') intPart = '0';
    if (decPart.length === 0) return intPart;
    return `${intPart}.${decPart}`;
  }

  private rawToNum(raw: string): number {
    if (raw === '' || raw === '.') return 0;
    const n = parseFloat(raw);
    return isNaN(n) ? 0 : n;
  }

  private countRelevantBefore(value: string, position: number, opts: Required<CurrencyMaskOptions>): number {
    const prefixLen = opts.prefix.length;
    let i = value.startsWith(opts.prefix) ? prefixLen : 0;
    let count = 0;
    for (; i < position && i < value.length; i++) {
      if (/\d/.test(value[i]) || value[i] === opts.decimal) count++;
    }
    return count;
  }

  private rawIndexToDisplayPos(display: string, rawIndex: number, opts: Required<CurrencyMaskOptions>): number {
    const prefixLen = opts.prefix.length;
    if (rawIndex <= 0) return prefixLen;
    let count = 0;
    for (let i = prefixLen; i < display.length; i++) {
      if (/\d/.test(display[i]) || display[i] === opts.decimal) {
        count++;
        if (count >= rawIndex) return i + 1;
      }
    }
    return display.length;
  }

  private insertAtRaw(raw: string, index: number, char: string, opts: Required<CurrencyMaskOptions>): string {
    if (char === '.') {
      if (raw.includes('.')) return raw;
      return raw.slice(0, index) + '.' + raw.slice(index);
    }
    const next = raw.slice(0, index) + char + raw.slice(index);
    const dot = next.indexOf('.');
    if (dot === -1) return next.replace(/\D/g, '');
    const intPart = next.slice(0, dot).replace(/\D/g, '') || '0';
    const decPart = next.slice(dot + 1).replace(/\D/g, '').slice(0, opts.precision);
    return decPart.length > 0 ? `${intPart}.${decPart}` : intPart;
  }

  private deleteAtRaw(raw: string, index: number, opts: Required<CurrencyMaskOptions>): string {
    if (index < 0 || index >= raw.length) return raw;
    const next = raw.slice(0, index) + raw.slice(index + 1);
    const dot = next.indexOf('.');
    if (dot === -1) return next.replace(/\D/g, '') || '0';
    const intPart = next.slice(0, dot).replace(/\D/g, '') || '0';
    const decPart = next.slice(dot + 1).replace(/\D/g, '').slice(0, opts.precision);
    return decPart.length > 0 ? `${intPart}.${decPart}` : intPart;
  }

  private clearMask(value: string): string {
    const opts = this.options;
    let v = value.replace(/\s/g, '');
    if (v.startsWith(opts.prefix)) v = v.slice(opts.prefix.length);
    if (v.startsWith('-')) {
      v = '-' + v.slice(1).replace(new RegExp(`\\${opts.thousands}`, 'g'), '').replace(opts.decimal, '.');
    } else {
      v = v.replace(new RegExp(`\\${opts.thousands}`, 'g'), '').replace(opts.decimal, '.');
    }
    return v;
  }

  private rawValueFromDisplay(display: string): number {
    const opts = this.options;
    let v = this.clearMask(display);
    v = v.replace(/[^\d.-]/g, '');
    const num = parseFloat(v);
    return isNaN(num) ? 0 : num;
  }

  private formatDisplay(num: number): string {
    const opts = this.options;
    const fixed = Math.abs(num).toFixed(opts.precision);
    const [intPart, decPart] = fixed.split('.');
    const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, opts.thousands);
    const combined = decPart ? `${withThousands}${opts.decimal}${decPart}` : withThousands;
    const withPrefix = opts.prefix + combined;
    return num < 0 && opts.allowNegative ? `-${withPrefix}` : withPrefix;
  }
}
