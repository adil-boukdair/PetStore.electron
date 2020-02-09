import {Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CustomerService} from '../../../services/customer/customer.service';
import * as Datastore from 'nedb'

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  displayedColumns = ['_id','customerCode', 'firstName', 'lastName','phone'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public customerService:CustomerService) {

    
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {

     this.customerService.testElectronPath();
    
    this.customerService.getCustomers().then(
      (customers)=>{
        this.dataSource.data=<[{}]> customers; 
        this.dataSource.sort =this.sort;
      }
    );
  }
  

}

 
 

  