import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-loading' },
  imports: [NzSpinModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  loading = input(true, { transform: booleanAttribute });
}
