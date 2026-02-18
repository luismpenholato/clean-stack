import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-splash-screen' },
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  protected readonly visible = signal(true);
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.timer = setTimeout(() => this.visible.set(false), 400);
  }

  ngOnDestroy(): void {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
  }
}
