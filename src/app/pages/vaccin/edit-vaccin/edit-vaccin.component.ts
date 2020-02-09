import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../../layout/dialog/dialog.component';
import {Router,ActivatedRoute} from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Vaccin} from '../../../services/vaccin/vaccin';
import {VaccinService} from '../../../services/vaccin/vaccin.service';


@Component({
  selector: 'app-edit-vaccin',
  templateUrl: './edit-vaccin.component.html',
  styleUrls: ['./edit-vaccin.component.css']
})
export class EditVaccinComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public route:ActivatedRoute,
    public router:Router,
    public vaccin:Vaccin,
    public vaccinService:VaccinService,
 
  ) { }

  ngOnInit() {
                //get parameter
                this.route.params.subscribe(params => {
                  this.vaccin._id = params['vaccin_id']; 
                  this.vaccinService.getVaccin(this.vaccin._id).then((vaccin:Vaccin)=>{
                    this.vaccin=vaccin;
                  });
               });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.vaccin.nextVaccinDate=event.value;
  }

  openDialog(message){
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data:{message:message}
    });
  }

  editVaccin(){
    
    this.vaccin.modified=new Date();


    if(this.vaccin.nextVaccinDate==null){
      this.openDialog("Date Du prochain vaccin est obligatoire");
    }
    else{
      this.vaccinService.editVaccin(this.vaccin).then((vaccin)=>{
        this.router.navigate(['/info-pet',this.vaccin.petID]); 
      });
    }

    

  }

}
