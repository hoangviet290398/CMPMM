import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from '../entities/item.entity';
import { ProductService } from '../service/product.service';
import {Router} from '@angular/router'

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	private items: Item[] = [];
	private subTotal:number=0;
	private total: number = 0;
	private tax:number=1;
	//
	private changedQuantity:number=0;
	private changedQuantityID:any;
	private isQuantityChanged=false;
	private id:string;
	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
		private router:Router
	) {

	}

	ngOnInit() {
		//this.productService.readProducts();
		//this.startProductServices();

		this.isQuantityChanged=false;
		this.id = this.productService.productId;
			console.log('this is id: ',this.id);
			if (this.id) {
				var item: Item = {
					product: this.productService.find(this.id),
					quantity: 1,

				};
				console.log('item',item.product._id);
				if (localStorage.getItem('cart') == null) {
					let cart: any = [];
					cart.push(JSON.stringify(item));
					localStorage.setItem('cart', JSON.stringify(cart));
					
				} else {
					let cart: any = JSON.parse(localStorage.getItem('cart'));
					let index: number = -1;
					

					for (var i = 0; i < cart.length; i++) {
						let item: Item = JSON.parse(cart[i]);
						if (item.product._id== this.id) {
							index = i;
							break;
						}
					}
					if (index == -1) {
						cart.push(JSON.stringify(item));
						localStorage.setItem('cart', JSON.stringify(cart));
					} else {
						let item: Item = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
						localStorage.setItem("cart", JSON.stringify(cart));
					}
				}
				this.loadCart()
			} else {
				this.loadCart()
			}
	}
	startProductServices() {
		console.log('product service started')
		this.productService.readProducts();
	}
	loadCart(): void {
		this.total = 0;
		this.subTotal=0;
		this.tax=0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		console.log('cart loadcart: ',cart);
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity,
				
			});
			if(this.isQuantityChanged && item.product._id ==this.changedQuantityID)
			{
				 console.log('changed quantity call')
				 item.quantity=this.changedQuantity;
				 
				 cart[i]=JSON.stringify(item);

				 localStorage.setItem('cart',JSON.stringify(cart));
				 console.log('load cart again',cart);
			}
			console.log(item.product._id);
			console.log('sub total quantity: ',item.quantity);
			this.subTotal += item.product.price * item.quantity;

			this.tax=this.subTotal*10/100;
			this.total=this.subTotal+this.tax;
		}
	}
	
	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		console.log('remove id: ',id);
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product._id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}

	changedNumber(quantity, changedQuantityId)
	{
		console.log('event: ',quantity);
		console.log('change id: ',changedQuantityId);
		this.isQuantityChanged=true;
		this.changedQuantity=parseInt(quantity.target.value);
		console.log('quantity: ',this.changedQuantity);

		this.changedQuantityID=changedQuantityId;
		this.loadCart();
		this.loadCart();
	}
	toCheckout()
  {
	
    
    this.router.navigate(['/cart/checkout']);
    
  }
  	
}