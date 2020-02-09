import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routing Module
import {RoutingModule} from './modules/routing.module';
// form
import { FormsModule } from '@angular/forms';

//Material Design module
import {MaterialModule} from './modules/material.module';
//pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ListCustomersComponent } from './pages/customer/list-customers/list-customers.component';
import { AddCustomerComponent } from './pages/customer/add-customer/add-customer.component';
import { AddPetComponent } from './pages/pet/add-pet/add-pet.component';

 

// Customer Service
import {CustomerService} from './services/customer/customer.service';
import {Customer} from './services/customer/customer'; 
// Pet Service
import {PetService} from './services/pet/pet.service';
import {Pet} from './services/pet/pet';
import { DialogComponent } from './pages/layout/dialog/dialog.component';
import { InfoCustomerComponent } from './pages/customer/info-customer/info-customer.component';
import { InfoPetComponent } from './pages/pet/info-pet/info-pet.component';
import { AddVaccinComponent } from './pages/vaccin/add-vaccin/add-vaccin.component';

// Vaccin Service
import {Vaccin} from './services/vaccin/vaccin';
import {VaccinService} from './services/vaccin/vaccin.service';
import { DialogYesNoComponent } from './pages/layout/dialog-yes-no/dialog-yes-no.component';
import { EditCustomerComponent } from './pages/customer/edit-customer/edit-customer.component';
import { EditPetComponent } from './pages/pet/edit-pet/edit-pet.component';
import { ListVaccinsComponent } from './pages/vaccin/list-vaccins/list-vaccins.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { EditVaccinComponent } from './pages/vaccin/edit-vaccin/edit-vaccin.component';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    LayoutComponent,
    MenuComponent, 
    ListCustomersComponent,
    AddCustomerComponent,
    AddPetComponent,
    DialogComponent,
    InfoCustomerComponent,
    InfoPetComponent,
    AddVaccinComponent,
    DialogYesNoComponent,
    EditCustomerComponent,
    EditPetComponent,
    ListVaccinsComponent,
    SortByPipe,
    EditVaccinComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    MaterialModule
  ],
  providers: [
    CustomerService,
     Customer,
     PetService,
     Pet,
     Vaccin,
     VaccinService 
  ],
  entryComponents: [DialogComponent,DialogYesNoComponent],// dynamiclly created
  bootstrap: [LayoutComponent]
})
export class AppModule { }
