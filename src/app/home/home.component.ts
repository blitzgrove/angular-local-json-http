import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any;
  products: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    forkJoin(
      this.dataService.getCategories(),
      this.dataService.getProducts()
    )
    .subscribe(
      response => {
        console.info(JSON.stringify(response));
        this.categories = response[0][0]['categories'];
        this.products = response[1][0]['products'];
      },
      error => { 
        // handle error 
      }
    );
  }

}