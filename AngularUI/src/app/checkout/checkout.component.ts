import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: any;
  cartItems: any = [];
  singleItemTotal: any = [];
  singleItemPrice: any;
  subTotal: number;
  tax: number;
  total: number;
  InfoForm: FormGroup;
  submitted: any;
  createdDay: any;
  sending: any;
  constructor(private productService: ProductService, public fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.infoForm();

  }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {

    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
    this.cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < this.cart.length; i++) {
      this.cartItems[i] = JSON.parse(this.cart[i]);
      this.singleItemPrice = (this.cartItems[i].product.price * this.cartItems[i].quantity);
      console.log('cart item', this.cartItems[i].product.price)
      this.singleItemTotal[i] = this.singleItemPrice.toFixed(2);
      console.log('single item total', this.singleItemTotal[i]);
      this.subTotal += this.cartItems[i].product.price * this.cartItems[i].quantity;
      console.log('sub total', this.subTotal)
      this.tax = this.subTotal * 10 / 100;
      this.total = this.subTotal + this.tax;
    }
    if(this.productService.userEmail)
    {
      this.InfoForm.setValue({
        name:this.productService.userName,
        address:'',
        phoneNumber:'',
        emailAddress:this.productService.userEmail
      });
    }
  }
  //
  infoForm() {
    this.InfoForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      emailAddress: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    })
  }
  get myForm() {
    return this.InfoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.createdDay = formatDate(new Date(), 'dd/MM/yyyy', 'en');

    if (!this.InfoForm.valid) {
      return false;
    }
    else {
      let invoice = {
        info: this.InfoForm.value,

        subTotal: this.subTotal.toFixed(2),
        tax: this.tax.toFixed(2),
        total: this.total.toFixed(2),
        singleItemPrice: this.singleItemTotal,
        cartItems: this.cartItems,
        createdDay: this.createdDay

      }

      this.apiService.sendEmail(invoice).subscribe(
        (res) => {
          console.log('Email sent!')

        }, (error) => {
          console.log(error);
        })
    }
    this.router.navigate(['/checkoutcomplete']);


  }
}