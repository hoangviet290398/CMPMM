import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: any;
  cartItems: any = [];
  singleItemTotal:any=[];
  subTotal: number;
  tax: number;
  total: number;
  InfoForm:FormGroup;
  constructor(private productService: ProductService,public fb: FormBuilder,private apiService:ApiService)
   { 
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
    for (var i = 0; i < this.cart.length; i++) 
    {
      this.cartItems[i] = JSON.parse(this.cart[i]);
      console.log('cart item', this.cartItems[i].product.price)
      this.singleItemTotal[i]=this.cartItems[i].product.price * this.cartItems[i].quantity;
      this.subTotal += this.cartItems[i].product.price * this.cartItems[i].quantity;
      console.log('sub total', this.subTotal)
      this.tax = this.subTotal * 10 / 100;
      this.total = this.subTotal + this.tax;
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
  get myForm(){
    return this.InfoForm.controls;
  }

  onSubmit() {
    let invoice={
      info:this.InfoForm.value,
      subTotal:this.subTotal,
      tax:this.tax,
      total:this.total,
      cartItems:this.cartItems

    }
    //this.submitted = true;
    
      this.apiService.sendEmail(invoice).subscribe(
        (res) => {
          console.log('Product successfully created!')
       
        }, (error) => {
          console.log(error);
        });
    
    
  }
}