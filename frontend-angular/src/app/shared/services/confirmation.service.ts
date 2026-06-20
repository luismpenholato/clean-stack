import { Injectable, inject } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

export interface ConfirmationOptions {
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  danger?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  private readonly modal = inject(NzModalService);

  confirm(options: ConfirmationOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.modal.confirm({
        nzTitle: options.title,
        nzContent: options.message,
        nzOkText: options.okText ?? 'Confirmar',
        nzCancelText: options.cancelText ?? 'Cancel',
        nzOkDanger: options.danger ?? false,
        nzOnOk: () => resolve(true),
        nzOnCancel: () => resolve(false)
      });
    });
  }
}
