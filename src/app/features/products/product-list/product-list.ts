import { Component, EventEmitter, Output } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  @Output() addToCart = new EventEmitter<Product>();

  products: Product[] = [
    { id: 1, name: 'mobile', price: 100, discount: 10, description: 'Premium smartphone with AMOLED display.', imageUrl: '' },
    { id: 2, name: 'Watch', price: 200, discount: 15, description: 'Elegant water-resistant smartwatch.', imageUrl: '' },
    { id: 3, name: 'Keyboard', price: 80, discount: 0, description: 'Tactile mechanical typing keyboard.', imageUrl: '' }
  ];
}
