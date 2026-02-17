import { Injectable, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const THEME_STORAGE_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly document = inject(DOCUMENT);

  private readonly _isDark = signal(false);
  private readonly _drawerVisible = signal(false);

  readonly isDark = this._isDark.asReadonly();
  readonly drawerVisible = this._drawerVisible.asReadonly();

  constructor() {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_STORAGE_KEY) : null;
    this._isDark.set(saved === 'dark');
    this.applyTheme();
  }

  toggleTheme(): void {
    this._isDark.update((v) => !v);
    this.applyTheme();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, this._isDark() ? 'dark' : 'light');
    }
  }

  setDrawerVisible(visible: boolean): void {
    this._drawerVisible.set(visible);
  }

  toggleDrawer(): void {
    this._drawerVisible.update((v) => !v);
  }

  private applyTheme(): void {
    this.document.body.classList.toggle('theme-dark', this._isDark());
  }
}
