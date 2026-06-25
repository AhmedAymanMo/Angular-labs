import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from '../../features/products/product-list/product-list';
import { ShoppingCart } from '../../features/shopping-cart/shopping-cart';
import { CartService } from '../../features/services/shopping-cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ProductList, ShoppingCart],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;

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
