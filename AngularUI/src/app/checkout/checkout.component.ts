import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems:any;
  subTotal:number;
    tax:number;
    total:number;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    
      this.getCartItems();
  }

  getCartItems()
  { 
    this.cartItems=this.productService.cartItems;
    this.subTotal=this.productService.subTotal;
    this.tax=this.productService.tax;
    this.total=this.productService.total;
    console.log('checkout cart item',this.cartItems);
  }
}
