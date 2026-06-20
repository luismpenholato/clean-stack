import { Routes } from '@angular/router';

import { authGuard } from './shared/guards/auth.guard';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate: [authGuard],
    title: 'Products',
    data: { description: 'Manage your product catalog.' },
  },
  {
    path: 'products/new',
    component: ProductFormComponent,
    canActivate: [authGuard],
    title: 'New product',
    data: { description: 'Create a new product in the catalog.' },
  },
  {
    path: 'products/:id/edit',
    component: ProductFormComponent,
    canActivate: [authGuard],
    title: 'Edit product',
    data: { description: 'Edit product information.' },
  },
];
