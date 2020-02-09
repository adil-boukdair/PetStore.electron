import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {PetService} from '../../../services/pet/pet.service';
import {Pet} from '../../../services/pet/pet';
import {CustomerService} from '../../../services/customer/customer.service';
import {Customer} from '../../../services/customer/customer';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../../layout/dialog/dialog.component';


@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {

  constructor(
    public router:Router,
    public customerService:CustomerService,
    public customer:Customer,
    public dialog: MatDialog,
    public route:ActivatedRoute,
    public petService:PetService,
    public pet:Pet
  ) { }

  ngOnInit() {
     //get parameter
     this.route.params.subscribe(params => {
      this.pet._id = params['pet_id']; 
      // get Pet
      this.petService.getPet(this.pet._id).then((pet:Pet)=>{
        this.pet=pet;
      // Get customer
      this.customerService.getCustomer(this.pet.customerID).then((customer:Customer)=>{
        this.customer=customer;
       
      });
      });


   });
  }

  openDialog(message){
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data:{message:message}
    });
  }

  editPet(){ 

    if(this.pet.name.trim()==""){
      this.openDialog("Nom est obligatoire");
    }
    else if(this.pet.type.trim()==""){
      this.openDialog("Type est obligatoire");
    }
    else{
      this.pet.modified=new Date();
      this.petService.editPet(this.pet).then((numReplaced)=>{
          this.router.navigate(['/info-pet',this.pet._id]);
      });
    } 
  }

}
