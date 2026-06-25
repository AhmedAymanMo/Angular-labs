import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly API_URL = 'http://localhost:8080/api/cart';
  private http = inject(HttpClient);

  cartItems = signal<CartItem[]>([]);

  totalPriceBeforeDiscount = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  });

  totalPriceAfterDiscount = computed(() => {
    return this.cartItems().reduce((sum, item) => {
      const discount = item.product.discount || 0;
      const discountedPrice = item.product.price * (1 - discount / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);
  });

  totalDiscount = computed(() => {
    return this.totalPriceBeforeDiscount() - this.totalPriceAfterDiscount();
  });

  loadCart() {
    this.http.get<CartItem[]>(this.API_URL).subscribe({
      next: (items) => this.cartItems.set(items || []),
      error: (err) => {
        console.warn('Failed to load cart from API, using current local cart:', err);
      }
    });
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product.id === product.id);
    let updatedItems: CartItem[];

    if (existingItem) {
      updatedItems = currentItems.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...currentItems, { product, quantity: 1 }];
    }
    this.cartItems.set(updatedItems);

    const targetQuantity = existingItem ? existingItem.quantity + 1 : 1;
    this.http.post<CartItem>(this.API_URL, { product, quantity: targetQuantity }).subscribe({
      error: (err) => console.error('Failed to sync added item with API:', err)
    });
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) return;

    const currentItems = this.cartItems();
    const updatedItems = currentItems.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartItems.set(updatedItems);

    this.http.put<CartItem>(`${this.API_URL}/${productId}`, { quantity }).subscribe({
      error: (err) => console.error('Failed to sync updated quantity with API:', err)
    });
  }

  removeItem(productId: number) {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.set(updatedItems);

    this.http.delete<void>(`${this.API_URL}/${productId}`).subscribe({
      error: (err) => console.error('Failed to sync deleted item with API:', err)
    });
  }
}
