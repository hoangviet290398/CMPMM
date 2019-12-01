import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  baseUri:string = 'http://localhost:3000/product';
  loginUri:string = 'http://localhost:3000/auth/login';
  signupUri:string = 'http://localhost:3000/auth/signup'
  
  headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');
  
 
  constructor(private http: HttpClient) { }

  // Create
  createProduct(data): Observable<any> {
    let url = `${this.baseUri}`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Products
  getProducts() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get Product
  getProduct(id): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update Product
  updateProduct(id, data): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete Product
  deleteProduct(id): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Login
  login(data): Observable<any> {
    let url = `${this.loginUri}`;
    return this.http.post(url, data,{responseType:"text"})
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  signup(data): Observable<any> {
    let url = `${this.signupUri}`;
    return this.http.post(url, data,{responseType:"text", headers:this.headers})
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}