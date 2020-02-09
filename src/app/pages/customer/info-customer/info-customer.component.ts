import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Customer} from '../../../services/customer/customer';
import {CustomerService} from '../../../services/customer/customer.service';
import {Pet} from '../../../services/pet/pet';
import {PetService} from '../../../services/pet/pet.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import {DialogYesNoComponent} from '../../layout/dialog-yes-no/dialog-yes-no.component';

@Component({
  selector: 'app-info-customer',
  templateUrl: './info-customer.component.html',
  styleUrls: ['./info-customer.component.css'] 
})
export class InfoCustomerComponent implements OnInit {

  public pets:Pet[];

  constructor(
    public router:Router,
    public dialog: MatDialog,
    public route:ActivatedRoute,
    public customerservice:CustomerService,
    public customer:Customer,
    public pet:Pet,
    public petService:PetService
  ) { }

  ngOnInit() {
        //get parameter
        this.route.params.subscribe(params => {
          this.customer._id = params['customer_id']; 
 
          // Get Customer 
          this.customerservice.getCustomer(this.customer._id).then((customer)=>{
       
              this.customer=<Customer>customer;
          });
          // Get pets
          
          this.petService.getPets(this.customer._id).then((pets:Pet[])=>{
              this.pets=pets;
          });
         
       });
  }

  openDialog(){
    let message='Êtes-vous sûr de vouloir supprimer '+this.customer.lastName + ' '+ this.customer.firstName;
    
  let dialogRef = this.dialog.open(DialogYesNoComponent, {
    width: '250px',
    data:{message:message}
  });

  
    dialogRef.afterClosed().subscribe(result => { 
    if(result){
      this.removeCustomer(this.customer._id);
    }
  });
 
}
  removeCustomer(customerID){

    this.customerservice.removeCustomer(customerID).then((numOfRowsDeleted)=>{
        console.log("num of rows deleted" + numOfRowsDeleted);
        this.router.navigate(['/list-customers']);
    });
  }

}
