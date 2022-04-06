import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateWeightPageRoutingModule } from './create-weight-routing.module';

import { CreateWeightPage } from './create-weight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateWeightPageRoutingModule
  ],
  declarations: [CreateWeightPage]
})
export class CreateWeightPageModule {}
