import { Component, input, output, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();

  addToCart = output<Product>();
  deleteProduct = output<number>();

  priceAfterDiscount = computed(() => {
    const p = this.product();
    const discount = p.discount || 0;
    return p.price - (p.price * (discount / 100));
  });

  onAdd() {
    this.addToCart.emit(this.product());
  }

  onDelete() {
    this.deleteProduct.emit(this.product().id);
  }
}