import { Component, input, output, computed } from '@angular/core';
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
  product = input.required<Product>();

  addToCart = output<Product>();

  priceAfterDiscount = computed(() => {
    const p = this.product();
    const discount = p.discount || 0;
    return p.price - (p.price * (discount / 100));
  });

  onAdd() {
    this.addToCart.emit(this.product());
  }
}