import { Injectable } from '@angular/core';
import * as Datastore from 'nedb'
import {Customer} from './customer';
import {Router} from '@angular/router';

import {remote, ipcRenderer} from 'electron';

 
 
 
 
@Injectable()
export class CustomerService {
  
  public db:any;
 

  constructor(public router:Router) {
    
    // init Customer DataBase
    this.db=new Datastore({filename: remote.app.getPath('userData') +'/customer_1.dat', autoload: true });
   }

   testElectronPath (){
    
    console.log(remote.app.getPath('userData'));
   }
   
   checkIfcustomerCodeExist(customer){

    return new Promise((resolve, reject) => {

      this.db.find({customerCode:customer.customerCode.toLowerCase()},(err,customer)=>{
          resolve(customer);
      });
      });

   }
 
   // Add customer to DB
      addCustomer(customer:Customer){

    
      return new Promise((resolve,reject)=>{
        this.db.insert(customer, (err,insertedCustomer)=>{
          resolve(insertedCustomer);
        });
      });

  }

  // Get list of All customers
    getCustomers(){

    return new Promise((resolve, reject) => {

      this.db.find({},(err,customers)=>{
          resolve(customers);
      });
      });
   
  }
  // Get customer Info
  getCustomer(customerID){
    return new Promise((resolve,reject)=>{
      this.db.findOne({_id:customerID},(err,customer)=>{
          resolve(customer);
      });

    });
  }

  // Remove Customer
  removeCustomer(customerID){
    return new Promise((resolve,reject)=>{
      this.db.remove({ _id: customerID }, {}, function (err, numRemoved) {
        resolve(numRemoved);
      });
    });
  }
  
  // Edit Customer
  editCustomer(customer:Customer){
    return new Promise((resolve,reject)=>{
      this.db.update({ _id: customer._id }, customer, {}, function (err, numReplaced) {
        resolve(numReplaced);
      });
    });
    
   

  }


}
