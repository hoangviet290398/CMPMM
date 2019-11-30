import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { SignupComponent } from './signup/signup.component';
import {AdminheaderComponent} from './adminpage/adminheader/adminheader.component';
import {ProducthomeComponent} from './adminpage/productmanagement/producthome/producthome.component'
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutcompleteComponent } from './checkoutcomplete/checkoutcomplete.component';
const routes: Routes = [
  {path:'',component:BodyComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'product-detail/:id',component:ProductDetailComponent},
  {path:'cart',component:CartComponent},
  {path:'cart/checkout',component:CheckoutComponent},
  {path:'admin',component:AdminheaderComponent},
  {path:'admin/products',component:ProducthomeComponent},
  {path:'checkoutcomplete',component:CheckoutcompleteComponent},
  {path:'**',component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,BodyComponent,PageNotFoundComponent,ProductDetailComponent,CartComponent,SignupComponent
,AdminheaderComponent,ProducthomeComponent,CheckoutComponent,CheckoutcompleteComponent]