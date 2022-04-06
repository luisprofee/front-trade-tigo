import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBudgetRegionalPageRoutingModule } from './edit-budget-regional-routing.module';

import { EditBudgetRegionalPage } from './edit-budget-regional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBudgetRegionalPageRoutingModule
  ],
  declarations: [EditBudgetRegionalPage]
})
export class EditBudgetRegionalPageModule {}
