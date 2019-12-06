import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from '../entities/item.entity';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router'
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	private items: Item[] = [];
	private subTotal: number = 0;
	private total: number = 0;
	private tax: number = 1;
	//
	private changedQuantity: number = 0;
	private changedQuantityID: any;
	private isQuantityChanged = false;
	private id: string;
	private signInId: any;
	private objectUserCart: any;
	private UserCart: any;
	private index:number;
	private isIdExisted:boolean;
	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
		private router: Router
	) {

	}

	ngOnInit() {
		//this.productService.readProducts();
		//this.startProductServices();
		this.isQuantityChanged = false;
		this.id = this.productService.productId;
		this.signInId = this.productService.signInId;

		console.log('you login id: ', this.signInId);


		console.log('this is id: ', this.id);
		if (this.id) {
			var item: Item = {
				product: this.productService.find(this.id),
				quantity: 1,

			};
			console.log('item', item.product._id);
			if (localStorage.getItem('cart') == null) {
				let cart: any = [];
				cart.push(JSON.stringify(item));
				localStorage.setItem('cart', JSON.stringify(cart));

			} else {
				let cart: any = JSON.parse(localStorage.getItem('cart'));
				let index: number = -1;


				for (var i = 0; i < cart.length; i++) {
					let item: Item = JSON.parse(cart[i]);
					if (item.product._id == this.id) {
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
			this.loadCart();
			this.loadCart();


		} else {
			this.loadCart();
			this.loadCart();


		}

	}
	startProductServices() {
		console.log('product service started')
		this.productService.readProducts();
	}
	loadCart(): void {
		this.total = 0;
		this.subTotal = 0;
		this.tax = 0;
		this.items = [];
		let usersStuffs=JSON.parse(localStorage.getItem('userCart'));
		console.log('beginning cart stuffs', usersStuffs)
		/*------------------------------------------------------------------------------- */
							// 
		//User cart
		if (this.signInId == undefined) {
			this.router.navigate(['/']);
		}
		else {
			this.objectUserCart = JSON.stringify({
				id: this.signInId,
				cart: JSON.parse(localStorage.getItem('cart'))			//get all item from carts
			})
			console.log('cart item now', JSON.parse(localStorage.getItem('cart')))
			this.UserCart = JSON.parse(this.objectUserCart);			//parse json object
			usersStuffs = JSON.parse(localStorage.getItem('userCart'));
			console.log('beginning cart stuffs', usersStuffs)

			if (usersStuffs == null) {
				let tempCart: any = [];
				tempCart.push(this.UserCart);
				localStorage.setItem('userCart', JSON.stringify(tempCart));
				console.log('temp cart', usersStuffs);


			}
			else {
				console.log('temp cart else', usersStuffs);

				console.log('sign in id', this.signInId)
				//
				/*------------------------------------------------------------------------------- */
				if (usersStuffs.length == 1) {
					console.log('user stuff id length1', usersStuffs.id);

					if (usersStuffs.id == this.signInId) {
						let tempCart: any = []
						tempCart.push(this.UserCart);
						console.log('1 update',tempCart);
						localStorage.setItem('userCart', JSON.stringify(tempCart));
						let itemLength = usersStuffs.cart.length;
						console.log('cart ey ey', itemLength);
						for (var j = 0; j < itemLength; j++) {
							let item = JSON.parse(usersStuffs.cart[j]);
							console.log('item', item);
							this.items.push({
								product: item.product,
								quantity: item.quantity
							})
							if (this.isQuantityChanged && item.product._id == this.changedQuantityID) {
								console.log('changed quantity call')
								item.quantity = this.changedQuantity;

								usersStuffs.cart[j] = JSON.stringify(item);
								//console.log('update', usersStuffs.cart);
								localStorage.setItem('cart', JSON.stringify(usersStuffs.cart));
								//console.log('load cart again', usersStuffs.cart);
							}
							this.subTotal += item.product.price * item.quantity;

							this.tax = this.subTotal * 10 / 100;
							this.total = this.subTotal + this.tax;
						}
					}
					else {
						let tempCart: any = JSON.parse(localStorage.getItem('userCart'))

						tempCart.push(this.UserCart);
						console.log('1 item push', tempCart)
						console.log('2 update',tempCart);

						localStorage.setItem('userCart', JSON.stringify(tempCart));
						console.log('initlogin id: ', tempCart);
					}
				}
				else if (usersStuffs.length > 1) {
					console.log('i need u now');
					console.log('BIG LENGTH',usersStuffs.length);
					for (var i = 0; i < usersStuffs.length; i++) {
						console.log('id array 2', usersStuffs[i].id)	
						if(usersStuffs[i].id==this.signInId){
							this.index=i;
							this.isIdExisted=true;
						}
						else
						{
							this.isIdExisted=false;
						}
					}
					//
							// let tempCart: any = []
							// tempCart.push(this.UserCart.cart);
							// console.log('temp cart exist id:', tempCart)

							// usersStuffs[this.index].cart[j] = JSON.parse(tempCart);
							// console.log('3 update', usersStuffs[this.index].cart);

							// localStorage.setItem('userCart', JSON.stringify(usersStuffs[this.index]));
							// //
					if (this.isIdExisted) {
						let tempCart: any = []
						console.log('temp cart exist id:', tempCart)
						tempCart.push(this.UserCart);
						console.log('3 update',tempCart);

						localStorage.setItem('userCart', JSON.stringify(tempCart));
						let itemLength = JSON.parse(usersStuffs[this.index].cart.length);
						console.log('cart ey ey', itemLength);
						for (var j = 0; j < itemLength; j++) {
							let item = JSON.parse(usersStuffs[this.index].cart[j]);
							console.log('item', item);
							this.items.push({
								product: item.product,
								quantity: item.quantity
							})
							if (this.isQuantityChanged && item.product._id == this.changedQuantityID) {
								console.log('changed quantity call')
								item.quantity = this.changedQuantity;

								usersStuffs[this.index].cart[j] = JSON.stringify(item);
								console.log('update', usersStuffs[this.index].cart);
								localStorage.setItem('cart', JSON.stringify(usersStuffs[this.index].cart));
								console.log('load cart again', usersStuffs[this.index].cart);
							}
							this.subTotal += item.product.price * item.quantity;

							this.tax = this.subTotal * 10 / 100;
							this.total = this.subTotal + this.tax;
						}
					}
					else{
						let tempCart: any = JSON.parse(localStorage.getItem('userCart'))

						tempCart.push(this.UserCart);
						console.log('4 update',tempCart);

						localStorage.setItem('userCart', JSON.stringify(tempCart));
						console.log('initlogin id: ', tempCart);
					}
				}
				console.log('final cart stuffs', usersStuffs)
			}

			//console.log('temp cart local storage not parse', JSON.parse(temp[0].cart[0]).product);


		}

	}

	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		console.log('remove id: ', id);
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product._id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
		this.loadCart();

	}

	changedNumber(quantity, changedQuantityId) {
		console.log('event: ', quantity);
		console.log('change id: ', changedQuantityId);
		this.isQuantityChanged = true;
		this.changedQuantity = parseInt(quantity.target.value);
		console.log('quantity: ', this.changedQuantity);

		this.changedQuantityID = changedQuantityId;
		this.loadCart();
		this.loadCart();
		this.loadCart();
				this.loadCart();

	}
	toCheckout() {


		this.router.navigate(['/cart/checkout']);

	}

}