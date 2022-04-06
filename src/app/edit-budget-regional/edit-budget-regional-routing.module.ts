import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBudgetRegionalPage } from './edit-budget-regional.page';

const routes: Routes = [
  {
    path: '',
    component: EditBudgetRegionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBudgetRegionalPageRoutingModule {}
