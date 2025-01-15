import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';//IMPORTAMOS EL CUSTOM OARA QUE NOO NOS DE ERROR EL HTML

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]// ANADIMOS EL CUSTOM-ELEMT-SCHEMA
})
export class HomePageModule {}
