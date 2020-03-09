import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from '../../models/product';
import { CategoryService } from '../category-service/category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private productsApiUrl = "https://localhost:44364/api/products";

  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsApiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }  
    const url = `${this.productsApiUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  createProduct(product: any){
    product.categoryId = 1;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.productsApiUrl, product , {headers})
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsApiUrl}/${id}`;
    return this.http.delete<Product>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(product: any) : Observable<Product> {
    product.category = "";
    const url = `${this.productsApiUrl}/${product.id}`;
    return this.http.put<Product>(url, product)
      .pipe(
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    return throwError(errorMessage);
  }

  private initializeProduct(): Product {
    return {
      id: 0,
      productName: null,
      productCode: null,
      category: null,
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null,
      categoryId:null,
    };
  }

  isTheImageNotUploaded:boolean = true;
  imageUrl:string = "";
}
