import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../../features/services/product.service';
import { Product } from '../../models/product';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const productResolver: ResolveFn<Product | null> = (route, state) => {
  const id = Number(route.paramMap.get('id'));
  const productService = inject(ProductService);
  if (isNaN(id)) return of(null);
  
  return productService.getProductById(id).pipe(
    catchError(err => {
      console.error(`Resolver failed for product id ${id}:`, err);
      return of(null);
    })
  );
};
