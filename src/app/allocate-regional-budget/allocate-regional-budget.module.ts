import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocateRegionalBudgetPageRoutingModule } from './allocate-regional-budget-routing.module';

import { AllocateRegionalBudgetPage } from './allocate-regional-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocateRegionalBudgetPageRoutingModule,
    
  ],
  declarations: [AllocateRegionalBudgetPage]
})
export class AllocateRegionalBudgetPageModule {}
