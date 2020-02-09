import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';


//Pages
import {DashboardComponent} from '../pages/dashboard/dashboard.component';
import {ListCustomersComponent} from '../pages/customer/list-customers/list-customers.component';
import {AddCustomerComponent} from '../pages/customer/add-customer/add-customer.component';
import {AddPetComponent} from '../pages/pet/add-pet/add-pet.component';
import {InfoCustomerComponent} from '../pages/customer/info-customer/info-customer.component';
import {InfoPetComponent} from '../pages/pet/info-pet/info-pet.component';
import {AddVaccinComponent} from '../pages/vaccin/add-vaccin/add-vaccin.component';
import {EditCustomerComponent} from '../pages/customer/edit-customer/edit-customer.component';
import {EditPetComponent} from '../pages/pet/edit-pet/edit-pet.component';
import {ListVaccinsComponent} from '../pages/vaccin/list-vaccins/list-vaccins.component';
import {EditVaccinComponent} from '../pages/vaccin/edit-vaccin/edit-vaccin.component';

const routes:Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'list-customers',
    component: ListCustomersComponent,
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
  },
  {
    path: 'add-pet/:customer_id',
    component: AddPetComponent,
  },
  {
    path: 'info-customer/:customer_id',
    component: InfoCustomerComponent,
  },
  {
    path: 'info-pet/:pet_id',
    component: InfoPetComponent,
  },
  {
    path: 'add-vaccin/:pet_id',
    component: AddVaccinComponent,
  },
  {
    path: 'edit-customer/:customer_id',
    component: EditCustomerComponent,
  },
  {
    path: 'edit-pet/:pet_id',
    component: EditPetComponent,
  },
  {
    path: 'list-vaccins',
    component: ListVaccinsComponent,
  },
  {
    path: 'edit-vaccin/:vaccin_id',
    component: EditVaccinComponent,
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
