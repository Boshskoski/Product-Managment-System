import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from '../../models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesApiUrl = "https://localhost:44364/api/categories";

  constructor(private http: HttpClient) { }

  GetGategories() : Observable<ICategory[]>
  {
    return this.http.get<ICategory[]>(this.categoriesApiUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  GetCategoryNameByTheCategoryId(categoryId:number)
  {
    const url = `${this.categoriesApiUrl}/${categoryId}`;
    return this.http.get(url , {responseType: 'text'})
    .pipe(
      catchError(this.handleError)
    );
  }

  GetCategoryIdByTheCategoryName(categoryName:string)
  {
    const url = `${this.categoriesApiUrl}/take-id/${categoryName}`;
    return this.http.get(url , {responseType: 'text'})
    .pipe(
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
  
}
