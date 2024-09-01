import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  products: Product[];
  imageURL: string;
  errorMessage: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe({
        next: products => this.products = products,
        error: error => this.errorMessage = error,
      });
  }
}
