import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login"
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ProductService } from '../service/product.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  private isIdExisted:boolean;
  constructor(private authService: AuthService,private productService:ProductService) {
    
   }

  ngOnInit() {

    this.logIn();
  }

  logIn() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log('log state', this.user);
      if (this.loggedIn) {
        this.productService.signInId=this.user.id;
        this.productService.userEmail=this.user.email;
        this.productService.userName=this.user.name;
        console.log('current id:',this.productService.signInId);
        console.log('current email:',this.productService.userEmail);

        if(JSON.parse(localStorage.getItem('signInId'))==null)
        {
          let signInId:any=[];
          signInId.push(this.user.id);
          localStorage.setItem('signInId',JSON.stringify(signInId));
          console.log('initlogin id: ', signInId);

        }
        else{
          let signInId:any=JSON.parse(localStorage.getItem('signInId'));
          console.log('already init: ',signInId);
          for(var i=0;i<signInId.length;i++)
          {
            if(signInId[i]==this.user.id)
            {
              this.isIdExisted=true;
              break;
            }
            
          }
          if(!this.isIdExisted)
          {
            signInId.push(this.user.id)

              localStorage.setItem('signInId',JSON.stringify(signInId));
              console.log('added id', signInId)
          }
        }
        
      }
      console.log('final id: ',JSON.parse(localStorage.getItem('signInId')))

    });

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
