import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Product } from '../entities/product.entity';


@Injectable()
export class ProductService  {
    //data for checkout page
    cartItems:any;
    subTotal:number;
    tax:number;
    total:number;
    //
    productId;// use for cart
   products: any=[];

    constructor(private apiService: ApiService,private http: HttpClient)
    {
        //this.readProducts();
        
    }
    

    //Get products
    readProducts(){
    console.log('read product called')
    this.apiService.getProducts().subscribe((data) => {
        this.products = data;
        console.log('product service',this.products)   

    }) 
     }
    
    returnProducts()
    {
        console.log('return service',this.products)   

        return this.products;
    }
    find(id: string) {
        console.log('what chu got',this.products[this.getSelectedIndex(id)])

        return this.products[this.getSelectedIndex(id)];
    }

    private getSelectedIndex(id:string) {
        
        console.log('get index') 
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i]._id == id) {
                return i;
            }
        }
        return -1;
    }

}