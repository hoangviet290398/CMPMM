import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule}from '@angular/common/http';
import { ApiService } from './service/api.service';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './service/product.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule

  ],
  providers: [ApiService,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
