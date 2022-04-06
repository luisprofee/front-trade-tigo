import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBudgetRegionalsPageRoutingModule } from './view-budget-regionals-routing.module';

import { ViewBudgetRegionalsPage } from './view-budget-regionals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBudgetRegionalsPageRoutingModule
  ],
  declarations: [ViewBudgetRegionalsPage]
})
export class ViewBudgetRegionalsPageModule {}
