import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule}from '@angular/common/http';
import { ApiService } from './service/api.service';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './service/product.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutcompleteComponent } from './checkoutcomplete/checkoutcomplete.component';
import { FooterComponent } from './footer/footer.component';
import { SocialLoginModule, AuthServiceConfig, LoginOpt } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
 
const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1032586259107-kpb0pnceeuvhilrgpjg3efjn0f8rhbgu.apps.googleusercontent.com",googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1279360852243022",fbLoginOptions)
  }
]);
 
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    CheckoutComponent,
    CheckoutcompleteComponent,
    FooterComponent,
    
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    SocialLoginModule

  ],
  providers: [
    ApiService,ProductService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
