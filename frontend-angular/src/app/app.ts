import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoadingOverlayComponent } from './shared/components/loading-overlay/loading-overlay.component';
import { SplashScreenComponent } from './shared/components/splash-screen/splash-screen.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-root' },
  imports: [
    MainLayoutComponent,
    LoadingOverlayComponent,
    SplashScreenComponent,
    NzModalModule
  ],
  templateUrl: './app.html',
  styles: [':host { display: block; }']
})
export class App {}
