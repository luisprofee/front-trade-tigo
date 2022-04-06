import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTypeBudgetPageRoutingModule } from './create-type-budget-routing.module';

import { CreateTypeBudgetPage } from './create-type-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTypeBudgetPageRoutingModule
  ],
  declarations: [CreateTypeBudgetPage]
})
export class CreateTypeBudgetPageModule {}
