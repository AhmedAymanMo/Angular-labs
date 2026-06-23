import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  public cartItems:CartItem[]=[];
  
  addToCart(product: Product) 
  {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({product,quantity: 1});
    }

  }
    
  updateQuantity(productId: number, quantity: number) {

    const item = this.cartItems.find(item => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
    }

  }

  getTotalPriceBeforeDiscount(): number {

  return this.cartItems.reduce((sum, item) =>sum + item.product.price * item.quantity,0);

}
  getTotalPriceAfterDiscount(): number {

  return this.cartItems.reduce((sum, item) => {

      const discountedPrice =item.product.price *(1 - item.product.discount / 100);

      return sum +discountedPrice * item.quantity;

    },0
  );

  }
}