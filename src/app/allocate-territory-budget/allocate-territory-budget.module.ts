import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocateTerritoryBudgetPageRoutingModule } from './allocate-territory-budget-routing.module';

import { AllocateTerritoryBudgetPage } from './allocate-territory-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocateTerritoryBudgetPageRoutingModule
  ],
  declarations: [AllocateTerritoryBudgetPage]
})
export class AllocateTerritoryBudgetPageModule {}
