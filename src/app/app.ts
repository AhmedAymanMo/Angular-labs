import { Component } from '@angular/core';
import { UpperHeader } from './core/upper-header/upper-header';
import { LowerHeader } from "./core/lower-header/lower-header";
import { MyFooter } from "./core/my-footer/my-footer";
import { ProductList } from "./features/products/product-list/product-list";
import { ShoppingCart } from "./features/shopping-cart/shopping-cart";
import { Product } from './models/product';
import { CartItem } from './models/cart-item';

@Component({
  selector: 'app-root',
  imports: [UpperHeader, LowerHeader, MyFooter, ProductList, ShoppingCart],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  cartItems: CartItem[] = [];

  onAddToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.cartItems = [...this.cartItems];
  }

  onUpdateQuantity(event: { productId: number, quantity: number }) {
    const item = this.cartItems.find(item => item.product.id === event.productId);
    if (item) {
      item.quantity = Math.max(1, event.quantity);
      this.cartItems = [...this.cartItems];
    }
  }

  onRemoveItem(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
  }
}
