import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {PetService} from '../../../services/pet/pet.service';
import {Pet} from '../../../services/pet/pet';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../../layout/dialog/dialog.component';
import {CustomerService} from '../../../services/customer/customer.service';
import {Customer} from '../../../services/customer/customer';



@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html', 
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
 
 
  constructor(
    public customerService:CustomerService,
    public customer:Customer,
    public dialog: MatDialog,
    public route:ActivatedRoute,
    public petService:PetService,
    public pet:Pet,
    public router:Router) {

    this.pet=new Pet();
    this.customer=new Customer();
   }

  ngOnInit() {
    //get parameter
    this.route.params.subscribe(params => {
      this.pet.customerID = params['customer_id']; 
      
      this.customerService.getCustomer(this.pet.customerID).then((customer:Customer)=>{
        console.log(customer);
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

  addPet(){ 

    if(this.pet.name.trim()==""){
      this.openDialog("Nom est obligatoire");
    }
    else if(this.pet.type.trim()==""){
      this.openDialog("Type est obligatoire");
    }
    else{
      this.pet.created=new Date();
      this.petService.addPet(this.pet).then((pet:Pet)=>{
          this.router.navigate(['/info-customer',pet.customerID]);
      });



    } 
  }

}
