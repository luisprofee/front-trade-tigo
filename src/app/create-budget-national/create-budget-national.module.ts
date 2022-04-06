import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBudgetNationalPageRoutingModule } from './create-budget-national-routing.module';

import { CreateBudgetNationalPage } from './create-budget-national.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBudgetNationalPageRoutingModule
  ],
  declarations: [CreateBudgetNationalPage]
})
export class CreateBudgetNationalPageModule {}
