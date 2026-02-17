import { Component, inject } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [NzSpinModule],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss'
})
export class LoadingOverlayComponent {
  protected readonly loadingService = inject(LoadingService);
}
