import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../features/services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-addedit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addedit.html',
  styleUrl: './addedit.scss',
})
export class AddEditPage implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);

  isEditMode = false;
  productId: number | null = null;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isEditMode = true;
      this.productService.getProductById(this.productId).subscribe((product) => {
        this.productForm.patchValue(product);
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const productData = this.productForm.value as Product;

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.productService.addProduct(productData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
