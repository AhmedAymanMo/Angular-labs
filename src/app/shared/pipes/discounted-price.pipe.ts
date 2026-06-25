import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountedPrice',
  standalone: true
})
export class DiscountedPricePipe implements PipeTransform {
  transform(price: number, discount: number = 0): number {
    if (!price) return 0;
    const disc = discount || 0;
    return price - (price * (disc / 100));
  }
}
