import { Component, OnInit ,Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Router} from '@angular/router';
import * as Datastore from 'nedb'

import {CustomerService} from '../../../services/customer/customer.service';
import {Customer} from '../../../services/customer/customer';

import {DialogComponent} from '../../layout/dialog/dialog.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
 
  constructor(public dialog: MatDialog,public router:Router,public customerService:CustomerService,public customer:Customer) {
 
    this.customer=new Customer();
   }
 
  ngOnInit() {
    
   
  }

 

  openDialog(message){
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data:{message:message}
    });
  }
  addCustomer(){



    if(this.customer.customerCode.trim()==""){
      this.openDialog("Code Client est obligatoire");
    }
    else if(this.customer.firstName.trim()==""){
      this.openDialog("Nom est obligatoire");
    }
    else if(this.customer.lastName.trim()==""){
      this.openDialog("Prénom est obligatoire");
    }
    else if(this.customer.phone==null){
      this.openDialog("Numéro de téléphone est obligatoire");
    }
    else{
    // add now date
    this.customer.created=new Date();
    this.customer.modified=new Date();

      // check if CustomerCode already exist 

      this.customerService.checkIfcustomerCodeExist(this.customer).then((customer:any[])=>{
          console.log(customer);
        if(customer.length==0){ // if not exist add it
                 
        this.customerService.addCustomer(this.customer).then((customer:any)=>{
            console.log(customer);
          this.router.navigate(['/add-pet',customer._id]);
        });

        }
        else{
          this.openDialog("Le Code Client exist deja.");
        }
      });

    
    }//else


  }


   
}


 