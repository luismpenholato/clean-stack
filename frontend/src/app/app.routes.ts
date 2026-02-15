import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'produtos' },
  { path: 'produtos', component: ProductsListComponent },
  { path: 'produtos/novo', component: ProductFormComponent },
  { path: 'produtos/:id/editar', component: ProductFormComponent }
];
