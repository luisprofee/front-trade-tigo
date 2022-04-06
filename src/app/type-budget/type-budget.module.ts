import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeBudgetPageRoutingModule } from './type-budget-routing.module';

import { TypeBudgetPage } from './type-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeBudgetPageRoutingModule
  ],
  declarations: [TypeBudgetPage]
})
export class TypeBudgetPageModule {}
