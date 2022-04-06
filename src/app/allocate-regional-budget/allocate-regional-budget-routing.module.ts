import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocateRegionalBudgetPage } from './allocate-regional-budget.page';

const routes: Routes = [
  {
    path: '',
    component: AllocateRegionalBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocateRegionalBudgetPageRoutingModule {}
