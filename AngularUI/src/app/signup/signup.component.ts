import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../app/service/api.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignupForm: FormGroup;

  constructor( public fb: FormBuilder,
    private apiService: ApiService,private http: HttpClient,private route:Router) {  this.mainForm();}

  ngOnInit() {
  }

  submitForm() {
   
    console.log(this.SignupForm.value)
    this.apiService.signup(this.SignupForm.value).subscribe(
      
      (res) => {
        console.log('Signup successfully');
        console.log(res);
        this.route.navigateByUrl('/login');
      
        //this.ngZone.run(() => this.router.navigateByUrl('/product'))
      }, (error) => {
        console.log(error);
      });
      
    
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
    this.SignupForm = this.fb.group({
      email: [''],
      password: [''],
    
    })
  }

}
