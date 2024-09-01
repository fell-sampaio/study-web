import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '../models/Product';
import { BaseService } from '../../base/base.service';
import { Supplier } from '../models/Supplier';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.UrlServiceV1 + 'products', super.getAuthHeaderJson())
      .pipe(catchError(this.serviceError));
  }

  registerAlternativeProduct(product: FormData): Observable<Product> {
    return this.http
      .post(this.UrlServiceV1 + 'products/add', product, super.getHeaderFormData())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  registerProduct(product: Product): Observable<Product> {
    return this.http
      .post(this.UrlServiceV1 + 'products', product, super.getAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http
      .get<Supplier[]>(this.UrlServiceV1 + 'suppliers', super.getAuthHeaderJson())
      .pipe(
        catchError(super.serviceError)
      );
  }
}
