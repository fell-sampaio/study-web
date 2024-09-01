import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Product } from '../models/Product';
import { ProductForm } from '../models/ProductForm';
import { Supplier } from '../models/Supplier';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  productForm: FormGroup<ProductForm>;
  product: Product;
  errors: any[] = [];
  suppliers: Supplier[];
  imageForm: any;
  imageName: string;
  imageBase64: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
  ) {
    this.imageForm = new FormData();
  }

  ngOnInit(): void {
    this.productForm = this.buildForm();
  }

  buildForm(): FormGroup<ProductForm> {
    return this.fb.group({
      supplierId: '',
      name: '',
      description: '',
      imageUpload: '',
      image: '',
      value: 0,
      active: false as boolean,
      supplierName: ''
    })
  }

  registerProduct() {
    if (this.productForm.valid && this.productForm.dirty) {
      let productForm = Object.assign({}, this.product, this.productForm.value);
      productForm.active = this.productForm.controls.active.value

      this.handleProduct(productForm).subscribe(
        result => { this.onSaveComplete(result) },
        fail => { this.onError(fail) }
      );
    }
  }

  onSaveComplete(response: any) {
    this.router.navigate(['/products-list']);
  }

  onError(fail: any) {
    this.errors = fail.error.errors;
  }

  handleAlternativeProduct(product: Product): Observable<Product> {
    let formdata = new FormData();
    product.image = this.imageName;
    product.imageUpload = null;

    formdata.append('product', JSON.stringify(product));
    formdata.append('ImageUpload', this.imageForm, this.imageName);

    return this.productService.registerAlternativeProduct(formdata);
  }

  handleProduct(product: Product): Observable<Product> {
    product.imageUpload = this.imageBase64;
    product.image = this.imageName;

    return this.productService.registerProduct(product);
  }

  upload(file: any) {
    // for upload via IformFile
    this.imageForm = file[0];
    this.imageName = file[0].name;

    // for upload via base64
    var reader = new FileReader();
    reader.onload = this.handleReader.bind(this);
    reader.readAsDataURL(file[0]);
  }

  handleReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
  } 
}
