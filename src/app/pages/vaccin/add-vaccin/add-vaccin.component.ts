import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../../layout/dialog/dialog.component';

import {Vaccin} from '../../../services/vaccin/vaccin';
import {VaccinService} from '../../../services/vaccin/vaccin.service';
import {Pet} from '../../../services/pet/pet';
import {PetService} from '../../../services/pet/pet.service';

@Component({
  selector: 'app-add-vaccin',
  templateUrl: './add-vaccin.component.html',
  styleUrls: ['./add-vaccin.component.css']
})
export class AddVaccinComponent implements OnInit {
  startDate = new Date();
 
  constructor(
    public dialog: MatDialog,
    public route:ActivatedRoute,
    public router:Router,
    public vaccin:Vaccin,
    public vaccinService:VaccinService,
    public pet:Pet,
    public petService:PetService
  ) {
    

   }

  ngOnInit() {
                //get parameter
                this.route.params.subscribe(params => {
                  this.pet._id = params['pet_id']; 
                   this.petService.getPet(this.pet._id).then((pet:Pet)=>{
                     this.pet=pet;
                     console.log(pet);
                   });
               });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    //this.events.push(`${type}: ${event.value}`);
    console.log(event.value);
    this.vaccin.nextVaccinDate=event.value;
  }

  openDialog(message){
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data:{message:message}
    });
  }

  addVaccin(){

    this.vaccin.date=new Date();
    this.vaccin.petID=this.pet._id;

    if(this.vaccin.nextVaccinDate==null){
      this.openDialog("Date Du prochain vaccin est obligatoire");
    }
    else{
      this.vaccinService.addVaccin(this.vaccin).then((vaccin)=>{
        this.router.navigate(['/info-pet',this.pet._id]); 
      });
    }

    

  }

}
