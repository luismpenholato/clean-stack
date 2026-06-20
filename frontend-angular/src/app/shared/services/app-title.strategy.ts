import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

const APP_NAME = 'Boilerplate';
const DEFAULT_DESCRIPTION =
  'Fullstack boilerplate for admin panels and SaaS applications.';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    this.title.setTitle(pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME);

    const description = this.getRouteDescription(snapshot) ?? DEFAULT_DESCRIPTION;
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  private getRouteDescription(snapshot: RouterStateSnapshot): string | undefined {
    let route = snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.data['description'] as string | undefined;
  }
}
