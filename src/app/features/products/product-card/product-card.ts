import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;

  @Output() addToCart = new EventEmitter<Product>();

  getPriceAfterDiscount(product: Product): number {
    return product.price - (product.price * (product.discount / 100));
  }

  onAdd() {
    this.addToCart.emit(this.product);
  }
}