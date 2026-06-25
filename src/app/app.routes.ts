import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ProductDetailsPage } from './pages/product-details-page/product-details-page';
import { productResolver } from './core/resolvers/product.resolver';
import { AddEditPage } from './pages/addedit/addedit';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'product/:id/details',
    component: ProductDetailsPage,
    resolve: {
      product: productResolver,
    },
  },
  {
    path: 'product/add',
    component: AddEditPage,
  },
  {
    path: 'product/:id/edit',
    component: AddEditPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
