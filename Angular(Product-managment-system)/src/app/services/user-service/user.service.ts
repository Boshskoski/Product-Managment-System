import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../models/IUser';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private categoriesApiUrl = "https://localhost:44364/api/users";

  constructor(private http: HttpClient) { }

  getAllUsers() : Observable<IUser[]>
  {
    return this.http.get<IUser[]>(this.categoriesApiUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id:number) : Observable<IUser>
  {
    return this.http.get<IUser>(`${this.categoriesApiUrl}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  registerUser(user: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.categoriesApiUrl, user , {headers})
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

  currentLoggedInUser:IUser;
  isLoggedIn:boolean = false;
}
