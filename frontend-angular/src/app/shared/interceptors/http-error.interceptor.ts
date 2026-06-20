import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { getApiErrorMessage } from '../utils/http-error.util';

export function httpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const message = inject(NzMessageService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const msg = getApiErrorMessage(err);
      message.error(msg);
      return throwError(() => err);
    })
  );
}
