import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-detail',
  
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetailId="";
  product:object;
  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private productService:ProductService,
    private router:Router
    ) { }

  ngOnInit() {
    this.productDetailId = this.route.snapshot.paramMap.get('id');
    console.log('my product detail id',this.productDetailId);

    this.getProductDetail(this.productDetailId);
    this.startProductServices();
    //console.log('My product',this.products)

  }

  getProductDetail(productDetailId){
    console.log('get product detail called')
    this.apiService.getProduct(this.productDetailId).subscribe((data) => {
     this.product=data;
     console.log('My product',this.product)

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
    
    console.log('body product detail id: ',this.productService.productId);
    this.router.navigate(['/cart']);
    
  }
}
