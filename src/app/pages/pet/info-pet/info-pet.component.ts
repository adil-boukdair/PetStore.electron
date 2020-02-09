import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Pet} from '../../../services/pet/pet';
import {PetService} from '../../../services/pet/pet.service';
import {VaccinService} from '../../../services/vaccin/vaccin.service';
import {Vaccin} from '../../../services/vaccin/vaccin';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import {DialogYesNoComponent} from '../../layout/dialog-yes-no/dialog-yes-no.component';
 
@Component({
  selector: 'app-info-pet',
  templateUrl: './info-pet.component.html',
  styleUrls: ['./info-pet.component.css']
})
export class InfoPetComponent implements OnInit {

  vaccins:Vaccin[];

  constructor(
    public dialog: MatDialog,
    public vaccinService:VaccinService,
    public vaccin:Vaccin,
    public route:ActivatedRoute,
    public router:Router,
    public pet:Pet,
    public petService:PetService
  ) { }

  ngOnInit() {
            //get parameter
            this.route.params.subscribe(params => {
              this.pet._id = params['pet_id']; 
              // Get pet info
               this.petService.getPet(this.pet._id).then((pet:Pet)=>{
                 this.pet=pet;
               });

               this.getVaccins();
           });
  }
  getVaccins(){
               // Get Vaccins list
               this.vaccinService.listVaccins(this.pet._id).then((vaccins:Vaccin[])=>{
                this.vaccins=vaccins;
                console.log(this.vaccins);
              });
  }
    openDialog(){
      let message='Êtes-vous sûr de vouloir supprimer '+this.pet.name;
      
    let dialogRef = this.dialog.open(DialogYesNoComponent, {
      width: '250px',
      data:{message:message}
    });

    
     return  dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        this.removePet(this.pet._id);
      }
       
    });
   
  }

  removePet(petID){
  
    this.petService.removePet(petID).then((numberOfRowDeleted)=>{
       this.router.navigate(['/info-customer',this.pet.customerID]);
    });
      
  }

  visibleInvisible(vaccin:Vaccin){
    vaccin.show=!vaccin.show;
    this.vaccinService.editVaccin(vaccin).then((numReplaced)=>{
      this.getVaccins();
    });
  }


}
