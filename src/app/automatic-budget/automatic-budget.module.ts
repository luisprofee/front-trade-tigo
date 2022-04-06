import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutomaticBudgetPageRoutingModule } from './automatic-budget-routing.module';

import { AutomaticBudgetPage } from './automatic-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutomaticBudgetPageRoutingModule
  ],
  declarations: [AutomaticBudgetPage]
})
export class AutomaticBudgetPageModule {}
