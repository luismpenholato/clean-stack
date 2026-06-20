import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { routes } from './app.routes';
import { AppTitleStrategy } from './shared/services/app-title.strategy';
import { httpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

registerLocaleData(en, 'en-US');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideAnimations(),
    provideNzI18n(en_US),
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
