import { Injectable } from '@angular/core';
import * as Datastore from 'nedb';
import {Pet} from './pet';

import {remote,ipcRenderer} from 'electron';

 

@Injectable()
export class PetService {

  public db:any;
  
  constructor() { 
    // init Pet DataBase
    this.db=new Datastore({filename: remote.app.getPath('userData') +'/pet_1.dat', autoload: true });
  } 

 

  addPet(pet:Pet){

     return new Promise((resolve,reject)=>{
      this.db.insert(pet, (err,insertedPet)=>{
       // this.router.navigate(['/info-customer',insertedPet.customerID]); 
        // console.log(insertedPet);
        resolve(insertedPet);
      });

     });

   

  }

  getPets(customerID:string){
    return new Promise((resolve, reject) => {
      this.db.find({customerID:customerID},(err,pets)=>{
          resolve(pets);
      });
      });
  }

  getPet(petID:string){
    return new Promise((resolve,reject)=>{
      this.db.findOne({_id:petID},(err,pet)=>{
        resolve(pet);
      });
    });
  }

  removePet(petID){
    return new Promise((resolve,reject)=>{
      this.db.remove({ _id: petID }, {}, function (err, numRemoved) {
        resolve(numRemoved);
      });
    });
  }

  editPet(pet:Pet){
    return new Promise((resolve,reject)=>{
      this.db.update({ _id: pet._id }, pet, {}, function (err, numReplaced) {
        resolve(numReplaced);
      });
    });

  }

}
