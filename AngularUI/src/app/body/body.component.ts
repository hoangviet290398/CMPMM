import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  products = [];
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  };
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get("http://localhost:3000/product", this.httpOption)
      .toPromise()
      .then(res => {
        console.log(res);
        this.products = Object.values(res);
      }).
      catch(err => {
        console.log(err)
      });
  }

  // getProducts() {
  //   return
  // }

}


