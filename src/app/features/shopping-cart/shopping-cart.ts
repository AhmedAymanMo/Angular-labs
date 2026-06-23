import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart {
  @Input() cartItems: CartItem[] = [];

  @Output() updateQuantity = new EventEmitter<{ productId: number, quantity: number }>();
  @Output() removeItem = new EventEmitter<number>();

  getPriceAfterDiscount(product: Product): number {
    return product.price - (product.price * (product.discount / 100));
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.updateQuantity.emit({ productId: item.product.id, quantity: item.quantity - 1 });
    }
  }

  increaseQuantity(item: CartItem) {
    this.updateQuantity.emit({ productId: item.product.id, quantity: item.quantity + 1 });
  }

  onRemove(productId: number) {
    this.removeItem.emit(productId);
  }

  getTotalPriceBeforeDiscount(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  getTotalPriceAfterDiscount(): number {
    return this.cartItems.reduce((sum, item) => {
      const discounted = this.getPriceAfterDiscount(item.product);
      return sum + (discounted * item.quantity);
    }, 0);
  }

  getTotalDiscount(): number {
    return this.getTotalPriceBeforeDiscount() - this.getTotalPriceAfterDiscount();
  }
}