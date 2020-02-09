import { Injectable } from '@angular/core';
import * as Datastore from 'nedb'
import {Vaccin} from './vaccin';

import {remote, ipcRenderer} from 'electron';

@Injectable()
export class VaccinService {

  public db:any;
  constructor(public vaccin:Vaccin) {
    // init Vaccin DataBase
    this.db=new Datastore({filename: remote.app.getPath('userData') +'/vaccin_1.dat', autoload: true });
   }


   addVaccin(vaccin:Vaccin){
    return new Promise((resolve,reject)=>{
      this.db.insert(vaccin, (err,insertedVaccin)=>{
        resolve(Vaccin);
        console.log(insertedVaccin);
      });
    });

   }

   listVaccins(petID){

    return new Promise((resolve,reject)=>{
      this.db.find({ petID: petID }, function (err, vaccins) {
        resolve(vaccins)
      });
    });
   }

   listVaccinsLessOnMonth(){
     return new Promise((resolve,reject)=>{
      let nextMonthDate:Date=new Date();
      let nowDate:Date = new Date();
      nextMonthDate.setDate(nextMonthDate.getDate()+30);
      console.log("last month date: ",nextMonthDate);
    
      this.db.find(  {$and:[{ nextVaccinDate:{$gte:nowDate}  },{ nextVaccinDate:{$lte:nextMonthDate}  },{show:true}]} , function (err, vaccins) {
          console.log("list of vaccins: ",vaccins);
        resolve(vaccins);
         
      });
     });
   }

   editVaccin(vaccin:Vaccin){
    return new Promise((resolve,reject)=>{
      this.db.update({ _id: vaccin._id }, vaccin, {}, function (err, numReplaced) {
        resolve(numReplaced);
      });
    });
   }
   
   getVaccin(vaccin_id:string){
    return new Promise((resolve,reject)=>{
      this.db.findOne({ _id: vaccin_id }, function (err, vaccin) {
        console.log(vaccin_id);
        resolve(vaccin);
      });
    });
   }

}
