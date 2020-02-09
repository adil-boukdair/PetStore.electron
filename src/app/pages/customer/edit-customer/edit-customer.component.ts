import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../services/customer/customer.service';
import {Customer} from '../../../services/customer/customer';
import {Router,ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../../layout/dialog/dialog.component';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  constructor(
    public dialog:MatDialog,
    public customer:Customer,
    public customerService:CustomerService,
    public route:ActivatedRoute,
    public router:Router,

  ) { }

  ngOnInit() {
        //get parameter
        this.route.params.subscribe(params => {
          this.customer._id = params['customer_id']; 
          // Get Customer 
          this.customerService.getCustomer(this.customer._id).then((customer)=>{
              this.customer=<Customer>customer;
          }); 
       });
  }

  openDialog(message){
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data:{message:message}
    });
  }


  editCustomer(){
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
    this.customer.modified=new Date();

      // Edit Customer
      this.customerService.editCustomer(this.customer).then((numReplaced)=>{
        this.router.navigate(['/info-customer',this.customer._id]);
      });

    
    }//else


  }


}
