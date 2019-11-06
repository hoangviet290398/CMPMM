import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path:'',component:BodyComponent},
  {path:'login',component:LoginComponent},
  {path:'product-detail',component:ProductDetailComponent},
  {path:'cart',component:CartComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,BodyComponent,PageNotFoundComponent,ProductDetailComponent,CartComponent]