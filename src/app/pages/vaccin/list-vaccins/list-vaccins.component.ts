import { Component, OnInit } from '@angular/core';
import {VaccinService} from '../../../services/vaccin/vaccin.service';
import { Vaccin } from '../../../services/vaccin/vaccin';
import { PetService } from '../../../services/pet/pet.service';
import { Pet } from '../../../services/pet/pet';
import { CustomerService } from '../../../services/customer/customer.service';
import { Customer } from '../../../services/customer/customer';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {DialogYesNoComponent} from '../../layout/dialog-yes-no/dialog-yes-no.component';


@Component({
  selector: 'app-list-vaccins',
  templateUrl: './list-vaccins.component.html',
  styleUrls: ['./list-vaccins.component.css']
})
export class ListVaccinsComponent implements OnInit {

  public vaccins:any[]=[];

  constructor(
    public dialog: MatDialog,
    public vaccinService:VaccinService,
    public petService:PetService,
    public pet:Pet,
    public customerService:CustomerService,
    public customer:Customer,
  ) { }

  ngOnInit() {
    this.getOverDueVaccins();
  }

  getOverDueVaccins(){
    this.vaccins=[];
    // Get overdue vaccins
    this.vaccinService.listVaccinsLessOnMonth().then((vaccins:Vaccin[])=>{

      vaccins.forEach(vaccin => {
          //get Pet
          let Onepet:Pet;
          this.petService.getPet(vaccin.petID).then((pet:Pet)=>{
            Onepet=pet;
          //get Customer
          let OneCustomer:Customer;
          this.customerService.getCustomer(Onepet.customerID).then((customer:Customer)=>{
            OneCustomer= customer;

            this.vaccins.push({vaccin,pet,customer});
            console.log(this.vaccins);
          });
          });

          
      });

  });
  }

  openDialog(message:string){
  let dialogRef = this.dialog.open(DialogYesNoComponent, {
    width: '250px',
    data:{message:message}
  });
  return dialogRef;
}

  makeInvisible(vaccin:Vaccin){
    let dialogRef=this.openDialog("étes vous sure de vouloir rendre le vaccin invisible sur cette list ?");
    dialogRef.afterClosed().subscribe(result => { 
      if(result){
        vaccin.show=false;
        this.vaccinService.editVaccin(vaccin).then((numReplaced)=>{
          this.getOverDueVaccins();
        });
      }
    });

  }







}
