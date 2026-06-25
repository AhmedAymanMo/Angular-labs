import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet } from '@angular/router';
import { UpperHeader } from './core/upper-header/upper-header';
import { LowerHeader } from "./core/lower-header/lower-header";
import { MyFooter } from "./core/my-footer/my-footer";
import { CartService } from './features/services/shopping-cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UpperHeader, LowerHeader, MyFooter, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  cartService = inject(CartService);
  router = inject(Router);

  isLoading = signal(false);

  ngOnInit() {
    this.cartService.loadCart();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading.set(false);
      }
    });
  }
}
