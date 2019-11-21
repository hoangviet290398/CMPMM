import { Router ,ActivatedRoute} from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-producthome',
  templateUrl: './producthome.component.html',
  styleUrls: ['./producthome.component.css']
})
export class ProducthomeComponent implements OnInit {

  submitted = false;  //add submit
  isAdded=false;
  editSubmitted=false;  //edit submit
  isEdited=false;
  editId='';
  ProductForm: FormGroup;
  EditForm:FormGroup;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
    this.editProductForm();
  }
  
  products:any=[];

  ngOnInit() { 
    this.readProducts();
   // this.editProductForm();
   let id = this.actRoute.snapshot.paramMap.get('id');
 
  }
  //Get products
  readProducts(){
    this.apiService.getProducts().subscribe((data) => {
     this.products = data;
    })    
  }
  //Edit product
  getProductDetail(id) {
    this.editId=id;
    this.apiService.getProduct(id).subscribe(data => {
      this.EditForm.setValue({
        name: data['name'],
        img: data['img'],
        cateId:data['cateId'],
        des:data['des'],
        price:data['price']
      });
    });
  }
  editProductForm() {
    this.EditForm = this.fb.group({
      name: ['', [Validators.required]],
      img: ['', [Validators.required]],
      cateId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      des: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(?:\.[0-9]+)?$')]]
    })
  }
  //Delete product
  deleteProduct(product, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteProduct(product._id).subscribe((data) => {
          this.products.splice(index, 1);
        }
      )    
    }
  }
  //
  mainForm() {
    this.ProductForm = this.fb.group({
      name: ['', [Validators.required]],
      img: ['', [Validators.required]],
      cateId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      des: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(?:\.[0-9]+)?$')]]
    })
  }

  

  // Getter to access form control
  get myForm(){
    return this.ProductForm.controls;
  }
 get editForm(){
   return this.EditForm.controls;
 }
  onSubmit() {
    this.isAdded=false;
    this.submitted = true;
    if (!this.ProductForm.valid) {
      return false;
    } else {
      this.apiService.createProduct(this.ProductForm.value).subscribe(
        (res) => {
          console.log('Product successfully created!')
          this.isAdded=true;
          //this.ngZone.run(() => this.router.navigateByUrl('/product'))
        }, (error) => {
          console.log(error);
        });
    }
    
  }
  onEditSubmit() {
    this.editSubmitted = true;
    if (!this.EditForm.valid) {
      return false;
    } else {
      let id=this.editId;
      console.log('Hello',id);
        this.apiService.updateProduct(id, this.EditForm.value)
          .subscribe(res => {
            
            console.log('Content updated successfully!')
            this.isEdited=true;

          }, (error) => {
            console.log(error)
          })
      
    }
  }
}
