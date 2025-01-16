import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { IntroPage } from './intro.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';//IMPORTAMOS EL CUSTOM OARA QUE NOO NOS DE ERROR EL HTML

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule
  ],
  declarations: [IntroPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]// ANADIMOS EL CUSTOM-ELEMT-SCHEMA
})
export class IntroPageModule {}
