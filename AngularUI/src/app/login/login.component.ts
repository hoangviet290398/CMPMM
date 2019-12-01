import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../app/service/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;
 
  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private http: HttpClient,private route:Router) {
      
      this.mainForm();
     }

  submitForm() {
   
    console.log(this.form.value)
    this.apiService.login(this.form.value).subscribe(
      (res) => {
        console.log('Login successfully');
        console.log(res);
        //this.route.navigateByUrl('/');
      
        //this.ngZone.run(() => this.router.navigateByUrl('/product'))
      }, (error) => {
        console.log(error);
      });
      
    
  }

  ngOnInit() {
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
  mainForm() {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    
    })
  }

}
