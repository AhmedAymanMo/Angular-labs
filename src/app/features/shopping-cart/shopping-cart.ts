import { Component, input, output, computed } from '@angular/core';
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
  cartItems = input<CartItem[]>([]);

  updateQuantity = output<{ productId: number, quantity: number }>();
  removeItem = output<number>();

  getPriceAfterDiscount(product: Product): number {
    const discount = product.discount || 0;
    return product.price - (product.price * (discount / 100));
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

  totalPriceBeforeDiscount = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });

  totalPriceAfterDiscount = computed(() => {
    return this.cartItems().reduce((sum, item) => {
      const discounted = this.getPriceAfterDiscount(item.product);
      return sum + (discounted * item.quantity);
    }, 0);
  });

  totalDiscount = computed(() => {
    return this.totalPriceBeforeDiscount() - this.totalPriceAfterDiscount();
  });
}