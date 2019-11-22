import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-product-detail',
  
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetailId="";
  product:object;
  constructor(private route: ActivatedRoute,
    private apiService: ApiService
    ) { }

  ngOnInit() {
    this.productDetailId = this.route.snapshot.paramMap.get('id');
    console.log('my product detail id',this.productDetailId);

    this.getProductDetail(this.productDetailId);
    //console.log('My product',this.products)

  }

  getProductDetail(productDetailId){
    console.log('get product detail called')
    this.apiService.getProduct(this.productDetailId).subscribe((data) => {
     this.product=data;
     console.log('My product',this.product)

    })    
  }
}
