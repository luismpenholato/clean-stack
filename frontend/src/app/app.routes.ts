import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'produtos' },
  {
    path: 'produtos',
    component: ProductsListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'produtos/novo',
    component: ProductFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'produtos/:id/editar',
    component: ProductFormComponent,
    canActivate: [authGuard]
  }
];
