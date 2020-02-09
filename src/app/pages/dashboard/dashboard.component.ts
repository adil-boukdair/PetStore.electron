import { Component, OnInit } from '@angular/core';
import * as Datastore from 'nedb'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public db:any;

  constructor() {
    // Init Table customers
    this.db = new Datastore({filename: './customer.dat', autoload: true });
   }

  ngOnInit() {
  }

}
