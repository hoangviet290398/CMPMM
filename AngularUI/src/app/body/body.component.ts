import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { ProductService } from '../service/product.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  products:any = [];
  
  constructor(private apiService: ApiService, private productService:ProductService, private router:Router) { }

  ngOnInit() {
    this.readProducts();
    this.startProductServices();
  }
  
  //Get products
  readProducts(){
    this.apiService.getProducts().subscribe((data) => {
     this.products = data;
    })    
  } 
  startProductServices()
  {
    console.log('product service')
    this.productService.readProducts();
  }
  AddtoCart(id)
  {
    this.productService.productId=id;
    
    console.log('body product id: ',this.productService.productId);
    this.router.navigate(['/cart']);
    
  }
}


