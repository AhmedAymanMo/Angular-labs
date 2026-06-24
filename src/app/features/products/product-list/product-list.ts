import { Component, inject, OnInit, output } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);

  products = this.productService.products;
  addToCart = output<Product>();

  ngOnInit() {
    this.productService.loadProducts();
  }
}
