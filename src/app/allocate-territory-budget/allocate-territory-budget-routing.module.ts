import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocateTerritoryBudgetPage } from './allocate-territory-budget.page';

const routes: Routes = [
  {
    path: '',
    component: AllocateTerritoryBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocateTerritoryBudgetPageRoutingModule {}
