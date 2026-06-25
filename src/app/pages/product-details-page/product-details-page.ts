import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../features/services/shopping-cart.service';
import { DiscountedPricePipe } from '../../shared/pipes/discounted-price.pipe';
import { DelayDirective } from '../../shared/directives/delay.directive';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    RouterLink,
    DiscountedPricePipe,
    DelayDirective
  ],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.scss'
})
export class ProductDetailsPage implements OnInit {
  route = inject(ActivatedRoute);
  cartService = inject(CartService);

  product: Product | null = null;

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
  }

  onAddToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}
