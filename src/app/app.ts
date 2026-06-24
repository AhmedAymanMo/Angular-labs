import { Component, inject, OnInit } from '@angular/core';
import { UpperHeader } from './core/upper-header/upper-header';
import { LowerHeader } from "./core/lower-header/lower-header";
import { MyFooter } from "./core/my-footer/my-footer";
import { ProductList } from "./features/products/product-list/product-list";
import { ShoppingCart } from "./features/shopping-cart/shopping-cart";
import { Product } from './models/product';
import { CartService } from './features/services/shopping-cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UpperHeader, LowerHeader, MyFooter, ProductList, ShoppingCart],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

  ngOnInit() {
    this.cartService.loadCart();
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  onUpdateQuantity(event: { productId: number, quantity: number }) {
    this.cartService.updateQuantity(event.productId, event.quantity);
  }

  onRemoveItem(productId: number) {
    this.cartService.removeItem(productId);
  }
}
