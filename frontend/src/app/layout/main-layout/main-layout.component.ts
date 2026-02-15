import { Component, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzLayoutModule,
    NzMenuModule,
    NzDrawerModule,
    NzButtonModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  private readonly document = inject(DOCUMENT);

  drawerVisible = false;
  isDark = false;

  ngOnInit(): void {
    const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('app-theme') : null;
    this.isDark = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.applyTheme();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('app-theme', this.isDark ? 'dark' : 'light');
    }
  }

  private applyTheme(): void {
    this.document.body.classList.toggle('theme-dark', this.isDark);
  }
}
